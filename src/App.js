import './App.css';
import { useState } from 'react';
import Forms from './components/Forms';
import Todos from './components/Todos';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll } from './redux/todoapp/actions';

function App() {
  const dispatch = useDispatch();
  
  const todos = useSelector((state)=>state.operationsReducer);

  const [editFormVisibility, setEditFormVisibility]=useState(false);

  const [editTodo, setEditToDo]=useState("");

  const handleEditClick=(todo)=>{
    setEditFormVisibility(true);
    setEditToDo(todo);
  }


  const cancelUpdate=()=>{
    setEditFormVisibility(false);
  }
  
  return (
    <div className='wrapper'>
      <br></br>
      <h1 className='text-center'>What's your plan today?</h1>
      <Forms editFormVisibility={editFormVisibility} editTodo={editTodo} cancelUpdate={cancelUpdate} />
      <Todos handleEditClick={handleEditClick} editFormVisibility={editFormVisibility}/>
      {todos.length > 0 && (
          <button className='btn btn-danger btn-md delete-all'onClick={()=>dispatch(deleteAll())}>DELETE ALL</button>
      )}
    </div>
  );
}

export default App;
