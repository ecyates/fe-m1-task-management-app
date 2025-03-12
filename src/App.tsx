import HomePage from './components/HomePage';
import TaskForm from './components/TaskForm';
import ViewTasks from './components/ViewTasks';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import { Route, Routes } from 'react-router-dom';
import { TasksProvider } from './context/TasksContext';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationGuard from './components/AuthenticationGuard';
import CallbackPage from './components/CallbackPage';
// import './App.css';

function App() {
  const {isLoading} = useAuth0();

  if(isLoading) return(<div>Loading...</div>);

  return (
    <TasksProvider>
      <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/add-task/' 
              element={<AuthenticationGuard component={TaskForm}/>} />
            <Route path='/edit-task/:id' 
              element={<AuthenticationGuard component={TaskForm}/>} />
            <Route path='/tasks/' 
              element={<AuthenticationGuard component={ViewTasks}/>}/>
            <Route path='/callback' element={<CallbackPage/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
    </TasksProvider>
  )
}

export default App
