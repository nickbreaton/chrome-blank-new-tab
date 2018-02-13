function render() {
  chrome.storage.sync.get('title', ({ title = 'New Tab' }) => {
    document.querySelector('title').innerHTML = title
  })
}