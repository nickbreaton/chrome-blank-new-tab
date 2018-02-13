function getTitle() {
  return new Promise(resolve => {
    chrome.storage.sync.get('title', ({ title = 'New Tab' }) => {
      resolve(title)
    })
  })
}

async function setTitle(title) {
  await new Promise(resolve => {
    chrome.storage.sync.set({ title }, resolve)
  })
}

const callbacks = []
async function onTitleChange(callback) {
  callbacks.push(callback)
  chrome.storage.onChanged.addListener(() => {
    callbacks.forEach(() => callback())
  })
}

async function renderTitle() {
  const title = await getTitle()
  document.querySelector('title').innerHTML = title
}