export default class Events {
  constructor(isRecordingRef) {
    this.events = []
    this.isRecordingRef = isRecordingRef
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
}
