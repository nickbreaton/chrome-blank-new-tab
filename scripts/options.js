'use strict'
const form = document.querySelector('#tab-text')
const text = document.querySelector('#text-content')
const textLabel = document.querySelector('#text-label')
const content = document.querySelector('#content')

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

getTitle().then(title => {
  if (title === blank) {
    form.radio.value = 'none'
  }
})

async function render() {
  renderTitle()
  const title = await getTitle()
  if (form.radio.value === 'none') {
    text.value = title
  } else {
    text.value = title === blank ? '' : title
  }
  content.style.display = 'block'
  textLabel.style.display = form.radio.value === 'none' ? 'none' : 'flex'
}

onTitleChange(render)
