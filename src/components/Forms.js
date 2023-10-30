import React,{useEffect, useState} from 'react'
import { addTodo, handleEditSubmit } from '../redux/todoapp/actions';
import { useDispatch } from 'react-redux';

export const Forms = ({editFormVisibility, editTodo, cancelUpdate}) => {

    const dispatch = useDispatch();

    const [todoValue, setTodoValue]=useState('');
    
    const [editValue, setEditValue]=useState('');
    useEffect(()=>{
        setEditValue(editTodo.todo)

    },[editTodo])

    const addTodoHandler = (e) =>{
        console.log(e);
        e.preventDefault();
        let date = new Date();
        let time = date.getTime();
        let todoObj={
            id: time,
            todo: todoValue,
            completed: false
        }
        dispatch(addTodo(todoObj))
        setTodoValue('');
    }
  
    const editTodoHandler = (e) =>{
        console.log(e);
        e.preventDefault();
        let editedObj={
            id: editTodo.id,
            todo: editValue,
            completed: false
        } 
        dispatch(handleEditSubmit(editedObj))
    };


    return (
        <>
            {editFormVisibility===false? (
                <form className='form-group custom-form' onSubmit={addTodoHandler}>
                    <div className='input-and-btn gap-4'>
                        <input type="text" className='form-control' required
                        value={todoValue} onChange={(e)=>setTodoValue(e.target.value)}/>
                        <button type="submit" className='btn btn-primary btn-md'>ADD</button>
                    </div>
                </form>
                
                
                
            ):(
                
                <form className='form-group custom-form' onSubmit={editTodoHandler}>
                    <div className='input-and-btn gap-4'>
                        <input type="text" className='form-control' required
                        value={editValue} onChange={(e)=>setEditValue(e.target.value)}/>
                    <button type="submit" className='btn btn-warning btn-md'>UPDATE</button>
                    </div>
                    <button type="button" className='btn btn-primary btn-md mt-4 mx-auto d-flex' onClick={cancelUpdate}>BACK</button>
                </form> 
            )}
        </>
        
     
    )
}
export default Forms