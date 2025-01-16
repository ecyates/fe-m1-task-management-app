import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Free Edit Icon
import { useNavigate } from 'react-router-dom';

const EditTask = ({ id }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-task/${id}`);
    };

    return(
        <Button className='btn btn-primary mx-3' onClick={handleEdit}>
            Edit <FontAwesomeIcon icon={faEdit}/>
        </Button>
    );
};

export default EditTask;