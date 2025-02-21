import { useDraggable } from "@dnd-kit/core";
import moment from "moment";
import React from "react";

const Task = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : "none",
  };
  const isOverdue = moment().isAfter(task.dueDate);
  return (
    <div>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`task ${isOverdue ? "bg-red-500" : "bg-slate-50"} my-2 p-2`}
        style={style}
      >
        <div>

        <h3 className="font-medium text-[24px]">Title: {task.title}</h3>
        <p><span className="font-medium">Description: </span>{task.description}</p>
        <p>Due: {task.dueDate}</p>
        <p>Created task: {task.createdAt}</p>
        <p>Category: {task.category}</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
