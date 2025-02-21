import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

const categoryColors = {
    "To-Do": "bg-blue-100",         
    "In Progress": "bg-yellow-100", 
    "Done": "bg-green-200",         
  };

const Column = ({ category, tasks }) => {
  const { setNodeRef } = useDroppable({ id: category });
  return (
    <div ref={setNodeRef} className="column ">
      <h2 className={`p-2 font-semibold rounded-sm ${categoryColors[category] || "text-gray-500"}`}>{category}</h2>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default Column;
