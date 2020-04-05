import { getId } from './commonUtil'

const key = 'true_layer_recordings'

export const setItems = (items) => {
  localStorage.setItem(key, JSON.stringify(items))
}

export const getRecordings = () => {
  const items = localStorage.getItem(key)
  if (!items) {
    setItems({})
  }

  return JSON.parse(items || '{}')
}

export const createRecording = ({ startTime, endTime, name }) => {
  const items = getRecordings()
  const id = getId()
  items[id] = {
    id,
    name,
    endTime,
    startTime,
  }
  setItems(items)
}

export const clearRecording = () => {}

export const playRecording = () => {}
