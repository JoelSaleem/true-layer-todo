import React from 'react'
import { mount } from 'enzyme'
import Replay from './Replay'
import Events from '../Events'

describe('Replay', () => {
  let wrapper = null
  const events = new Events({ current: true })
  const eventTypes = events.getTypes()
  events.addEvent(eventTypes.CREATE, { id: '123', name: 'todo 1' })
  events.addEvent(eventTypes.UPDATE, { id: '123', name: 'todo num 1' })
  events.persist()

  beforeEach(() => {
    wrapper = mount(
      <Replay
        events={events.getEvents()}
        eventTypes={eventTypes}
        toggleIsPlaying={() => {}}
      />
    )
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('plays events', () => {
    const wrapper = mount(
      <Replay
        events={events.getEvents()}
        eventTypes={events.getTypes()}
        toggleIsPlaying={() => {}}
      />
    )
    jest.useFakeTimers()
    console.log(wrapper.debug())
    jest.runOnlyPendingTimers()
    console.log(wrapper.debug())
    jest.runOnlyPendingTimers()
    wrapper.render()
    console.log(wrapper.debug())
    jest.runOnlyPendingTimers()
    wrapper.render()
    wrapper.update()
    console.log(wrapper.debug())
    jest.runOnlyPendingTimers()
    wrapper.render()
    wrapper.update()
    console.log(wrapper.debug())
    jest.runOnlyPendingTimers()
    wrapper.render()
    wrapper.update()
    console.log(wrapper.debug())
    jest.runOnlyPendingTimers()

    wrapper.unmount()
  })
})
