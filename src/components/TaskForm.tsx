import { useState, useEffect, useContext } from "react";
import { Button, Form, Container, Row, Col, Modal, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TasksContext from "../context/TasksContext";

const TaskForm:React.FC = () => {
    const [task, setTask] = useState({ name: "", completed: false, due: null });
    const { id } = useParams();
    const { state, dispatch } = useContext(TasksContext);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        try {
            console.log(state.tasks);
            if (id) {
                const task = state.tasks.find((t) => t.id === parseInt(id));
                if (task) {
                    setTask({ name: task.name, completed: task.completed, due: task.due });
                } else {
                    setError("Task not found.");
                }
            }
        } catch (error) {
            console.error("Error fetching task:", error);
            setError("Error fetching task.");
        }
    }, [id, state.tasks]);

    // Handle changes to the form
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        setTask((prevTask) => ({
            ...prevTask,
            [name]: type === "checkbox" ? checked : name === "due" ? new Date(`${value}T00:00:00`) : value,
        }));
    };

    // Function to handle submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // If this is a new session, create ID
            let taskId = id ? parseInt(id) : Date.now();

            // Add/update the task
            const thisTask = { id: taskId, ...task };
            dispatch({ type: "UPDATE_TASK", payload: thisTask });
            // Show Success Modal
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error submitting task:", error);
            setError("Error submitting task.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Function to close the success modal and reset the task
    const closeModal = () => {
        setShowSuccessModal(false);
        setTask({ name: "", completed: false, due: null });
        setError(null);
        navigate("/tasks/");
    };

    return (
        <Container className="mt-5 p-5 bg-light rounded text-center">
            {isSubmitting && <Alert variant="info">Submitting task session...</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>{id ? "Edit" : "Add New"} Task</h2>
                    <Form onSubmit={handleSubmit} className='text-start'>
                        <Form.Group className="mb-3">
                            <Form.Label>Task</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter task"
                                value={task.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="due"
                                value={task.due ? (new Date(task.due).toISOString().split("T")[0]) : ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                name="completed"
                                id="completed"
                                label="Task Complete"
                                checked={task.completed}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='text-center'>
                        <Button type="submit">
                            {id ? "Update Task" : "Add Task"}
                        </Button>
                        <Button  onClick={()=>navigate('/tasks/')} className="btn btn-danger mx-3">
                            Cancel
                        </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your task was successfully {id ? "updated" : "added"}.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TaskForm;
