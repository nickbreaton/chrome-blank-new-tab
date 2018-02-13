'use strict'
const form = document.querySelector('#tab-text')
const text = document.querySelector('#text-content')
const textLabel = document.querySelector('#text-label')
const content = document.querySelector('#content')
const sync = document.querySelector('#sync')

form.addEventListener('submit', event => event.preventDefault())

form.addEventListener('change', async () => {
  if (form.radio.value === 'none') {
    await setTitle(blank)
  } else {
    await setTitle(text.value === blank ? defaultTitle : text.value);
  }
  render()
})

text.addEventListener('input', async () => {
  await setTitle(text.value || blank)
})

text.addEventListener('blur', async () => {
  text.value = text.value || defaultTitle
  setTitle(text.value)
})

sync.addEventListener('change', () => {
  sync.checked = !sync.checked
  setSyncing(!sync.checked)
})

getTitle().then(title => {
  if (title === blank) {
    form.radio.value = 'none'
  }
})

async function render() {
  renderTitle()
  const [ title, isSync ] = await Promise.all([ getTitle(), isSyncing() ])
  if (form.radio.value === 'none') {
    text.value = title
  } else {
    text.value = title === blank ? '' : title
  }
  sync.checked = isSync
  textLabel.style.display = form.radio.value === 'none' ? 'none' : 'flex'
  content.style.display = 'block'
}

onTitleChange(render)
