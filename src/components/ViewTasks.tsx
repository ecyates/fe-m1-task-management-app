import React, { useContext } from 'react';
import { Container, Button, Row, Col, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TasksContext from '../context/TasksContext';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

const ViewTasks:React.FC = () => {
    const { state, dispatch } = useContext(TasksContext);
    const navigate = useNavigate();

    const toggleTaskComplete=(id:number)=>{
        let task = state.tasks.find((t) => t.id === id);
        if (task){
            task = {
                id: id,
                name: task.name, 
                completed: !task.completed,
                due: task.due,
            }
            dispatch({ type: "UPDATE_TASK", payload: task });
        }
    }

    const clearTasks = () => {
        state.tasks.forEach(task=>{
            dispatch({type:"DELETE_TASK", payload:task.id});
        })
    }
    return (
        <Container className='mt-5 p-5 rounded '>
            <h1 className='mb-3 text-center'>To-Do List</h1>
            <Row className='g-3'>
            {state.tasks.length === 0 ? (
                <p>Currently no tasks on your to-do list...</p>
            ) : (
                <>
                {state.tasks.map((task) => (
                    <Col key={task.id} className='mb-3'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Header>
                                    {task.due?`Due: ${new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        }).format(task.due)}`:'No Due Date'}
                                </Card.Header>
                                <Card.Body>
                                <Card.Title className='mb-4'>
                                <Form>
                                    {task.completed ? (
                                        <Form.Check type="checkbox" label={task.name} onChange={()=>toggleTaskComplete(task.id)} checked>
                                        </Form.Check>
                                    ) : (
                                        <Form.Check type="checkbox" label={task.name} onChange={()=>toggleTaskComplete(task.id)}/>
                                    )}
                                </Form></Card.Title>
                                <Row className='text-center'>
                                    <Col><EditTask id={task.id}/></Col>
                                    <Col><DeleteTask id={task.id}/></Col>
                                </Row>
                                </Card.Body>
                            </Card>
                    </Col>
                    ))}
                </>
                )}
            </Row>
            <Container className='w-50 border-0'>
            <Row className='text-center mt-3'>
                <Col><Button className='btn btn-primary' onClick={()=>navigate('/add-task/')}>Add New Task</Button></Col>
                <Col><Button className='btn btn-danger' onClick={clearTasks} >Clear Tasks</Button></Col>
            </Row>
            </Container>
        </Container>
        
    );
};

export default ViewTasks;
