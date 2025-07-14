//importing dependencies
import React,{ useState,useEffect } from 'react' //Manages component state and side effects.
import axios from 'axios'; //Handles API requests fron frontend to backend API
import TodoList from'./components/TodoList.tsx';//A child component to display and manage tasks.
import './App.css';

/* important points to remember:
1. "render": means the translation of your component's jsx (js representation of ui) by React into actual DOM elements that the browser can display.

2. "Initial Render": When a React application first loads, React performs an initial render, 
   creating the initial UI based on the application's components and their initial state and props.

3. "Re-rendering": React components re-render whenever there's a change to their state or props. 
   This ensures that the UI always reflects the latest data. Re-rendering is a core feature that enables dynamic updates without requiring a full page reload. 

4. In class components, the render() method is a required lifecycle method that returns the JSX or null representing the component's UI. 
   This method is automatically called by React when the component needs to be rendered or re-rendered.

5. In functional components, the function itself acts as the render function, returning the JSX directly

6. "Virtual DOM": React uses a Virtual DOM to optimize the rendering process. 
   Instead of directly manipulating the real DOM (which is slow), React first updates a lightweight, in-memory representation called the Virtual DOM. 
   It then compares the updated Virtual DOM with the previous version and calculates the minimal changes needed to update the real DOM efficiently. 
   This process, known as "reconciliation," makes React applications fast and responsive. 

7. The state of a component is not preserved between renders.

8. "Async/Await":	Handles asynchronous operations like HTTP requests.

9. "Props	Values": passed to child components (TodoList)
*/

/*
to define the structure of a task (_id, title, completed)
In TypeScript, interface is used to define the structure of an object.

Why define an interface? It helps TypeScript give you better IntelliSense (auto-suggestions), 
and catches errors early — for example, if you try to treat a string like a boolean.
*/
interface Task{
  _id:string;
  title:string;
  completed:boolean;
}

// setting up state variables:

//React.FC = React Functional Component
//  — tells TypeScript that this is a functional component.
const App: React.FC=()=>{
  //state for tasks, new task text, editing controls
  const [tasks,setTasks]=useState<Task[]>([]);
  const [task,setTask]=useState<string>("");
  const [editingTaskId,setEditingTaskId]=useState<string | null>(null);
  const [editingTitle,setEditingTitle]=useState<string>("");

  /*NOTE: 
  - tasks: stores list of tasks.
  - task: holds input for new tasks
  - editingTaskId: holds id of task being edited
  - editingTitle: holds title of task being edited

  - React "remembers" values between re-renders using useState.
  - useState<Type>() sets the type for that piece of data.
  */

   
  //Fetch tasks from the backend on component mount
  useEffect(()=>{
    const fetchTasks=async()=>{
      try{
        const response=await axios.get<Task[]>('http://localhost:5000/api/tasks');
        console.log("Fetched tasks:",response.data)//debugging log
        setTasks(response.data);
      }catch(error){
        console.error("Error fetching tasks: ",error);
      }
    };
    fetchTasks();
   },[]);

   /*NOTE:
  - useEffect is a hook that allows you to run some side effect (like API calls) after rendering.
  - It's like componentDidMount and componentDidUpdate combined.
  - It's called after every render, so you can use it to fetch data from an API
Why use useEffect?
  - React components re-render often. But you only want to fetch tasks once when the page loads.

  - The empty array [] tells React: "run this once after the component mounts"
  */

  //ADDING A TASK:
  const addTask=async()=>{
    if(!task)return;
    try{
      console.log("Adding new task:",task)//debugging log
      const response=await axios.post<Task>//tells TypeScript we expect one Task object in the response.
      (
        'http://localhost:5000/api/tasks',
        {title: task},
        {headers: { 'Content-Type': 'application/json' }}
      );
      console.log("Task added response:",response.data);
      setTasks([...tasks,response.data]);
      setTask("");
    }catch(error){
      console.error("Error adding task: ",error);
    }
  };
  /*NOTE:
   - Sends a POST request to add a new task.
   - If successful, updates the tasks state with the new task.
  */

  // DELETEING A TASK:
  const deleteTask=async (id: string)=>{
    try{
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((t)=>t._id!==id));

    }catch(error){
      console.error("Error deleting task: ",error);
    }
  };
  /*NOTE:
   - Sends a DELETE request to remove a task.
    - Updates tasks by filtering out the deleted task.
  */
 
  //UPDATE A TASK:
  const updateTask=async(id: string,updatedTask:Partial<Task>)=>{
    try{
      const response=await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updatedTask,
        {headers:{"Content-Type":"application/json"}}
      );
      setTasks(
        tasks.map((t)=>t._id===id?{...t,...response.data}:t)
      );
      setEditingTaskId(null);
      setEditingTitle("");

    }catch(error){
      console.error("Error updating task: ",error);
    }
  };
  /*NOTE:
  - Sends a PUT request to update a task’s title.
  - Updates tasks with the new title.

  - Partial<Task>: means updatedTask can contain some or all properties of a Task. Helpful because we're only updating title, not the whole task.
  - map() is used to create a new updated tasks array
  */

  //handling edits
  const startEditing=(id:string)=>{
    setEditingTaskId(id);
  };//startEditing(id): Sets a task into edit mode.

  //handle title change during editing
  const handleEditChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setEditingTitle(e.target.value);
  }//handleEditChange(e): Updates the editing input.


  return (
    
//Displays an input field and button to add tasks.
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
        type="text"
        value={task} //<input> is a controlled component — its value is tied to the task state.
        onChange={(e)=>setTask(e.target.value)} //onChange updates state as the user types.
        />
        <button onClick={addTask}>Add Task</button>
      </div>


      <TodoList 
//Passes task data and functions (deleteTask, updateTask, etc.) to TodoList.tsx.
      tasks={tasks}
      deleteTask={deleteTask}
      updateTask={updateTask}
      editingTitle={editingTitle}
      setEditingTitle={setEditingTitle}
      editingTaskId={editingTaskId}
      setEditingTaskId={setEditingTaskId}
      startEditing={startEditing}
      handleEditChange={handleEditChange}     
      />
    </div>
  );
  

};


export default App;
