import { createStore } from 'redux'
import title from '../state/title'

const store = createStore(title)

export { store }