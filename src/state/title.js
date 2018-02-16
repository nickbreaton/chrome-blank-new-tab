// Types

const SET = 'TITLE/SET'

// Constants

const EMPTY_TITLE = '&rlm;'
const DEFAULT_STATE = 'New Tab'

// Actions

export const setTitle = (title) => ({
  type: SET,
  payload: title
})

// Reducer

export default function(state = DEFAULT_STATE, { type, payload }) {
  switch (type) {
    case SET:
      return payload
    default:
      return state
  }
}