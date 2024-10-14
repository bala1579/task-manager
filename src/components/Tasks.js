// import React, { useState } from "react";
import Task from "./Task";

// this is static task

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

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        ></Task>
      ))}
    </>
  );
};

export default Tasks;
