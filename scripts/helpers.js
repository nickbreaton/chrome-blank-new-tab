'use strict'
const blank = '&rlm;'
const defaultTitle = 'New Tab'

function getTitle() {
  return new Promise(resolve => {
    chrome.storage.sync.get('title', ({ title = defaultTitle }) => {
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
  callback()
  chrome.storage.onChanged.addListener(() => {
    callbacks.forEach(() => callback())
  })
}

async function renderTitle() {
  const title = await getTitle()
  document.querySelector('title').innerHTML = title
}