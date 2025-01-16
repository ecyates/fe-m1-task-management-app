import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Free Trash Icon
import TasksContext from '../context/TasksContext';
import { useContext } from 'react';

const DeleteTask = ({ id }) => {
    const { dispatch } = useContext(TasksContext);

    const handleDelete = () => {
        dispatch({ type: "DELETE_TASK", payload: id})
    };

    return(
        <Button className='btn btn-danger mx-3' onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash}/>
        </Button>
    );
};

export default DeleteTask;