import React from 'react'
import { mount } from 'enzyme'
import TodoListItem from './TodoListItem'

/* 
  Note: The updating and deletion functionality of TodoListItem.js are handled 
  in TodoList.test.js since it is better tested by seeing how it integrates with 
  the list.
*/

describe('TodoListItem', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = mount(
      <TodoListItem
        name={'todo'}
        description='desc'
        id='id'
        rerender={() => {}}
        events={null}
      />
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('displays a field for the name', () => {
    expect(wrapper.find('div').at(1).props().children).toEqual([
      'Name: ',
      'todo',
    ])
  })

  it('displays a field for the description', () => {
    expect(wrapper.find('div').at(2).props().children).toEqual([
      'Desc: ',
      'desc',
    ])
  })

  it('can open the editor when clicked when not disabled', () => {
    expect(wrapper.props().disabled).toBeFalsy()
    expect(wrapper.find('input').length).toEqual(0)

    wrapper.find('div').at(0).simulate('click')

    expect(wrapper.find('input').length).toEqual(2)
  })

  it("can't enter edit mode when disabled", () => {
    const disabledWrapper = mount(
      <TodoListItem
        name={'todo'}
        description='desc'
        id='id'
        rerender={() => {}}
        events={null}
        disabled
      />
    )

    expect(disabledWrapper.props().disabled).toBeTruthy()
    expect(disabledWrapper.find('input').length).toEqual(0)

    disabledWrapper.find('div').at(0).simulate('click')

    expect(disabledWrapper.find('input').length).toEqual(0)

    disabledWrapper.unmount()
  })

  it('displays a update button when the editor is open', () => {
    wrapper.find('div').at(0).simulate('click')
    expect(wrapper.find('button').at(0).props().children).toEqual('Update')
  })

  it('displays a delete button when the editor is open', () => {
    wrapper.find('div').at(0).simulate('click')
    expect(wrapper.find('button').at(2).props().children).toEqual('Delete')
  })

  it('displays a cancel button when the editor is open', () => {
    wrapper.find('div').at(0).simulate('click')
    expect(wrapper.find('button').at(1).props().children).toEqual('Cancel')
  })

  it('can exit edit mode when the cancel button is pressed', () => {
    expect(wrapper.find('input').length).toEqual(0)

    // Enter edit mode
    wrapper.find('div').at(0).simulate('click')
    expect(wrapper.find('input').length).toEqual(2)

    // Click cancel button
    wrapper.find('button').at(1).simulate('click')
    expect(wrapper.find('input').length).toEqual(0)
  })

  it('can enter text into the name field', () => {
    wrapper.find('div').at(0).simulate('click')
    expect(wrapper.find('input').at(0).props().value).toEqual('todo')

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'some text' } })

    expect(wrapper.find('input').at(0).props().value).toEqual('some text')
  })

  it('can enter text into the description field', () => {
    wrapper.find('div').at(0).simulate('click')
    expect(wrapper.find('input').at(1).props().value).toEqual('desc')

    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'some text' } })

    expect(wrapper.find('input').at(1).props().value).toEqual('some text')
  })
})
