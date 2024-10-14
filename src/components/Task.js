import React from "react";
import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    //  add dynamic class if task reminder is true then add reminder class
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        {/* <h5
          style={{ color: "red", cursor: "pointer" }}
          onDoubleClick={() => onDelete(task.id)}
        >
          Delete
        </h5> */}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
