// import logo from "./logo.svg";
// import "./App.css";
import { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

// import { useState } from "react";

function App() {
  const [showAddTask, setshowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  //  in json file  key always have in double codes ""

  // const tasks = [
  //   {
  //     id: 1,
  //     text: "Docter appoinment",
  //     day: "Feb 14",
  //     reminder: true,
  //   },
  //   {
  //     id: 2,
  //     text: "skin care",
  //     day: "Feb 15",
  //     reminder: true,
  //   },
  //   {
  //     id: 3,
  //     text: " Dental appoinment",
  //     day: "Feb 15",
  //     reminder: false,
  //   },
  // ];

  // Add Task

  //  useEffect deal with side effects  on the page load  its use for something heppen for page load
  //  useEffect takes arrow function

  useEffect(
    () => {
      const getTasks = async () => {
        const taskFromServer = await fetchTasks();
        setTasks(taskFromServer);
      };
      getTasks();
    },
    //  this is called deipendency array
    []
  );

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");

    const data = await res.json();
    // console.log(data);

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);

    const data = await res.json();
    // console.log(data);

    return data;
  };

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    //  new task is object    ...task means copy all data from the task
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  //  Delete the task

  const deleteTask = async (id) => {
    // there is we dont save data in variable because we want to delete it

    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

    console.log("delete", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //   Toggle reminder
  const toggleReminder = async (id) => {
    // console.log(id);

    const taskToToggle = await fetchTask(id);

    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      //  this line means json data change in string by stringify method
      // after the PU request
      body: JSON.stringify(updatedTask),
    });

    // after the put request change string data in json  and then set in  setTasks
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <BrowserRouter>
      <div className="container">
        {/* This is overwrite the default props */}
        {/* <Header title="welcome" />          */}

        {/*  this is set the opposite of the setshowAddTask */}
        <Header
          onAdd={() => setshowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            exact
            Component={() => (
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "There is no task to show"
                )}{" "}
              </>
            )}
          />
          <Route path="/about" Component={About} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
