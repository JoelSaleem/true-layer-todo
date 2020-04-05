export default class Events {
  constructor(isRecordingRef) {
    this.events = []
    this.isRecordingRef = isRecordingRef

    this.key = 'true_layer_recording'
  }

  getTypes() {
    return {
      INITIAL_LIST: 'INITIAL_LIST',
      CREATE: 'CREATE',
      DELETE: 'DELETE',
      UPDATE: 'UPDATE',
    }
  }

  addEvent(type, data) {
    if (!this.isRecordingRef.current) {
      return
    }

    this.events.push({ type, data })
  }

  clearEvents() {
    this.events = []
  }

  persist() {
    localStorage.setItem(this.key, JSON.stringify(this.events))
  }

  getEvents() {
    const items = localStorage.getItem(this.key) || '[]'

    return JSON.parse(items)
  }
}
