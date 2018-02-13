const form = document.querySelector('#tab-text')
const text = document.querySelector('#text-content')
const textLabel = document.querySelector('#text-label')
const content = document.querySelector('#content')

const blank = '&rlm;'

async function main() {
  const initialTitle = await getTitle()

  form.addEventListener('submit', event => event.preventDefault())

  form.addEventListener('change', async () => {
    if (form.radio.value === 'none') {
      await setTitle(blank)
    } else {
      await setTitle(text.value || blank);
    }
  })

  text.addEventListener('input', async () => {
    await setTitle(text.value || blank)
  })

  text.addEventListener('blur', () => {
    text.value = text.value || initialTitle
    setTitle(text.value)
  })

  text.value = initialTitle

  if (initialTitle === blank) {
    form.radio.value = 'none'
  }

  renderUI()
  onTitleChange(renderUI)
}

function renderUI() {
  renderTitle()
  content.style.display = 'block'
  textLabel.style.display = form.radio.value === 'none' ? 'none' : 'flex'
}

main()
