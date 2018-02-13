'use strict'
const blank = '&rlm;'
const defaultTitle = 'New Tab'

/* Title */

async function getTitle() {
  const storage = await getStorageFunction()
  return await new Promise(resolve => {
    storage.get('title', ({ title = defaultTitle }) => {
      resolve(title)
    })
  })
}

async function setTitle(title) {
  const storage = await getStorageFunction()
  await new Promise(resolve => {
    storage.set({ title }, resolve)
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

/* Sync */

function isSyncing() {
  return new Promise(resolve => {
    chrome.storage.local.get('isSyncing', ({ isSyncing = true }) => {
      resolve(isSyncing)
    })
  })
}

async function getStorageFunction() {
  return (await isSyncing()) ? chrome.storage.sync : chrome.storage.local
}

async function setSyncing(isSyncing) {
  const local = await getTitle()
  chrome.storage.local.set({ isSyncing })
  setTitle(local)
}