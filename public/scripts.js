const form = document.getElementById('shorten-form')
const urlBox = form.elements[0]
const link = document.getElementById('link')
const shortUrlBox = document.getElementById('shortened')
const copyButton = document.getElementById('copy')

function displayShortenedUrl (response) {
  const baseUrl = location.protocol + '//'+location.hostname + (location.port ? ':'+location.port: '')
  link.textContent = `${baseUrl}/${response.data.shortUrl}`
  link.setAttribute(
    'href', response.data.shortUrl
  )
  copyButton.textContent = 'COPY'
  shortUrlBox.style.opacity = 1
}

function alertError (error) {
  alert('Are you sure the URL is correct? Make sure it has http:// at the beginning.')
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  axios.post('/new', { url: urlBox.value })
       .then(displayShortenedUrl)
       .catch(alertError)
})

const clipboard = new Clipboard('#copy');
clipboard.on('success', (e) => {
    copyButton.textContent = 'COPIED!'
    e.clearSelection()
});
