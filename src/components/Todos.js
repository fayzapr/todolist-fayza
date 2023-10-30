import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-icons-kit';
import {trash} from 'react-icons-kit/feather/trash'
import {edit2} from 'react-icons-kit/feather/edit2'
import { removeTodo, handleCheckbox } from '../redux/todoapp/actions';

export const Todos = ({handleEditClick, editFormVisibility}) => {
    const dispatch = useDispatch();

    const todos = useSelector((state) => state.operationsReducer);

    const [filter, setFilter] = useState('all');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true;
    }

    if (filter === 'active') {
      return todo.completed === false;
    }

    if (filter === 'completed') {
      return todo.completed === true;
    }

    return false;
  });

  return (
    <>
        <div className='d-flex gap-4 my-4'>
        
        <button value="all" className='tombol' onClick={handleFilterChange}>All</button>
        <button value="active" className='tombol'  onClick={handleFilterChange}>Active</button>
        <button value="completed" className='tombol'  onClick={handleFilterChange}>Completed</button>
    </div>
    
    {
        filteredTodos.map((todo) => (
            <div key={todo.id} className='todo-box my-2 border border-secondary p-2'>
              <div className='content'>
                {editFormVisibility===false&&(
                    <input type="checkbox" checked={todo.completed}
                    onChange={()=> dispatch(handleCheckbox(todo.id))}></input>
                )}
                    <p className="my-auto"
                    style={todo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>
                        {todo.todo}
                    </p>
                </div>
                <div className='actions-box'>
                    {editFormVisibility===false&&(
                        <>
                            <span onClick={()=>handleEditClick(todo)}><Icon icon={edit2}/></span>
                            <span onClick={()=>dispatch(removeTodo(todo.id))}><Icon icon={trash}/></span>
                        </>
                    )}
                  
                </div>
            </div>
        ))
    }
    </>
    
  )
};

export default Todos