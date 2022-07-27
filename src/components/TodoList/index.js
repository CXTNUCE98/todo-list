import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
// import { addTodo } from '../../redux/actions';
import {v4 as uuidv4} from 'uuid'
import { useState } from 'react';
import {  todosRemainingSelector } from '../../redux/selectors';
import todosSlice from './todosSlice';

export default function TodoList() {

const [todoName, setTodoName] = useState('')
const [priority, setPriority] = useState('Medium')

const todoList = useSelector(todosRemainingSelector)

  const dispatch = useDispatch()

  const handleAddButtonClick = () => {
    dispatch(todosSlice.actions.addTodo({
      id: uuidv4(),
      name: todoName,
      priority: priority,
      completed: false
    }))
    setTodoName('')
    setPriority("Medium")
  }

  const handleInputChange = (e) => {
    setTodoName(e.target.value)
    console.log(e.target.value);
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoList.map((list) => (
           <Todo key={list.id} id={list.id} name={list.name} prioriry={list.priority} completed={list.completed} />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select defaultValue="Medium" value={priority} onChange={(e) => setPriority(e)}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}