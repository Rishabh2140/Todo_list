import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// 

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }


  }, [])



  const saveTols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")

    saveTols()
  }



  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveTols()
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id

    });
    settodos(newTodos)
    saveTols()
  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id

    });
    settodos(newTodos)
    saveTols()

  }



  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-50">
        <h3 className=' text-center text-xl font-bold'>iTask- Manage your todos at one place </h3>
        <div>
          <div className="addTodo my-5">
            <h2 className="text-lg font-bold">Add a todo</h2>
            <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
            <button onClick={handleAdd} disabled={todo.length <= 2} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Save</button>
          </div>
          <h2 className='text-xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          </div>
          <div className="todos">
            {todos.map(item => {
              return <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" value={todo.isCompleted} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete/></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>

    </>
  )
}

export default App
