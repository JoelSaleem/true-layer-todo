import React from 'react'
import { mount } from 'enzyme'
import TodoList from './TodoList'
import Events from '../Events'
import { key } from '../utilities/todoCrud'

describe('TodoList Layout', () => {
  let wrapped = null
  beforeAll(() => {
    localStorage.setItem(key, '{}')
    wrapped = mount(<TodoList />)
  })

  afterAll(() => {
    wrapped.unmount()
  })

  it('renders a create button', () => {
    expect(wrapped.find('button').props().children).toBe('Create')
  })

  it('renders a name input', () => {
    expect(wrapped.find('input').at(0).exists()).toBe(true)
    expect(wrapped.find('div').at(2).props().children).toBe('Name')
  })

  it('renders a description input', () => {
    expect(wrapped.find('input').at(1).exists()).toBe(true)
    expect(wrapped.find('div').at(3).props().children).toBe('Description')
  })
})

describe('Todo Creation', () => {
  let wrapped = null
  beforeEach(() => {
    localStorage.setItem(key, '{}')
    wrapped = mount(<TodoList />)
  })

  afterEach(() => {
    wrapped.unmount()
    localStorage.setItem(key, '{}')
  })

  it('creates a Todo', () => {
    // Name
    wrapped
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'Todo 1' } })
    // Description
    wrapped
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'My Desc' } })

    wrapped.find('button').simulate('click')

    expect(wrapped.find('div').at(2).props().children).toEqual([
      'Name: ',
      'Todo 1',
    ])
    expect(wrapped.find('div').at(3).props().children).toEqual([
      'Desc: ',
      'My Desc',
    ])
  })
})

describe('Viewing, updating and deleting a todo', () => {
  let wrapped = null
  beforeEach(() => {
    const items = {
      id123: {
        id: 'id123',
        name: 'Todo 1',
        description: 'my todo',
        created: 1,
      },
    }
    localStorage.setItem(key, JSON.stringify(items))
    wrapped = mount(<TodoList />)
  })

  afterEach(() => {
    wrapped.unmount()
    localStorage.setItem(key, '{}')
  })

  it('displays a todo', () => {
    expect(wrapped.find('div').at(2).props().children).toEqual([
        'Name: ',
        'Todo 1',
      ])
      expect(wrapped.find('div').at(3).props().children).toEqual([
        'Desc: ',
        'my todo',
      ])
  })

  it('can update a todo', () => {
    // Open todo list
    wrapped.find('div').at(1).simulate('click')

    // Update name
    wrapped
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'New Name' } })
    // Update description
    wrapped
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'New Desc' } })

    // Click update button
    wrapped.find('button').at(0).simulate('click')

    expect(wrapped.find('div').at(2).props().children).toEqual([
      'Name: ',
      'New Name',
    ])
    expect(wrapped.find('div').at(3).props().children).toEqual([
      'Desc: ',
      'New Desc',
    ])
  })

  it('can delete a todo', () => {
    expect(wrapped.find('#list-item').length).not.toBe(0)

    // Open todo list
    wrapped.find('div').at(1).simulate('click')
    // Click delete button
    wrapped.find('button').at(2).simulate('click')
  
    expect(wrapped.find('#list-item').length).toBe(0)
  })


})
