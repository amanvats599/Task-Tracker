// In case of class method
// import React from 'react';

// import Footer from './components/Footer'
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState,useEffect } from "react"
import AddTask from './components/AddTask'
// import About from './components/About'


function App() {
  const[showAddTask,setShowAddTask]=new useState(true)

  const[tasks,setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  },[])

  // fetch Task
const fetchTask = async(id) =>{
  const res=await fetch(`http://localhost:5000/tasks/${id}`)
  const data=await res.json()
  return data
}

// fetch Tasks
const fetchTasks = async () => {
  const res= await fetch('http://localhost:5000/tasks')
  const data=await res.json()
  return data
}


// Add Task
const addTask = async (task) => {
    const res= await fetch('http://localhost:5000/tasks' ,{
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(task)
    })

    const data=await res.json()

    setTasks([...tasks,data])

    // const id=Math.floor(Math.random()*10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks,newTask])
}

// Delete Tasks
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'DELETE',
  }
  )

   setTasks(tasks.filter((task) => task.id !=id))
}

// Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask= {...taskToToggle,reminder: !taskToToggle.reminder}

  const res =await fetch(`http://localhost:5000/tasks/${id}`, 
  {
  method : 'PUT',
   headers : {
     'content-type' : 'application/json'
   } ,
   body : JSON.stringify(updTask)
  })

  const data = await res.json()

   setTasks(tasks.map(
    (task) => task.id==id ?{
      ...task,reminder: data.reminder} : task
       )
    )
}

  return (
    <div className='container'>
       <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd ={showAddTask}/>
       {showAddTask && <AddTask onAdd={addTask}/>}
        { tasks.length>0 ? (<Tasks tasks={tasks} 
          onDelete={deleteTask} 
          onToggle={toggleReminder}/>) :
           ('No task to delete')
        } 
    </div>
  );
}

// In case of class method
// class App extends React.Component{
//    render(){
//       return <h1>Hello from a class</h1>
//     }
// }

export default App;
