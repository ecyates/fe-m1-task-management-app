import React, { createContext, useReducer, ReactNode } from "react";

// Define the structure of a Task
export interface Task {
    id: number;
    name: string;
    completed: boolean;
    due: Date | null;
}

// Structure of the Tasks State
interface TasksState {
    tasks: Task[];
}

// Structure of Actions
type TasksAction =
    | { type: "UPDATE_TASK"; payload: Task }
    | { type: "DELETE_TASK"; payload: number };

// Initial state
const initialState: TasksState = {
    tasks: [],
};

// Reducer 
const tasksReducer = (state: TasksState, action: TasksAction): TasksState => {
    switch (action.type) {
        case "UPDATE_TASK":
            const updatedTask = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === updatedTask.id);
            if (taskIndex > -1) {
                const updatedTasks = [...state.tasks];
                updatedTasks[taskIndex] = updatedTask;
                return { tasks: updatedTasks };
            }
            return { tasks: [...state.tasks, updatedTask] };
        case "DELETE_TASK":
            return { tasks: state.tasks.filter((task) => task.id !== action.payload) };
        default:
            return state;
    }
};

// Tasks Context 
const TasksContext = createContext<{
        state: TasksState;
        dispatch: React.Dispatch<TasksAction>;
    }>({
    state: initialState,
    dispatch: () => undefined,
});

// Provider component
export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, initialState);

    return (
        <TasksContext.Provider value={{ state, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksContext;