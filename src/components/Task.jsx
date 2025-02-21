import { useDraggable } from "@dnd-kit/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Task = ({ task }) => {
  const axiosPublic = useAxiosPublic();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : "none",
  };
  const [currentTask, setCurrentTask] = useState(task);
  useEffect(() => {
    setCurrentTask(task);
  }, [task]);
  const isOverdue = moment().isAfter(task.dueDate);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/task/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
            }
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire("Error", "Failed to delete task", "error");
          });
      }
    });
  };

  const [isEditModal, setIsEditModal] = useState(false);
  const [editTask, setEditTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
  });

  useEffect(() => {
    setEditTask({
      title: currentTask.title,
      description: currentTask.description,
      dueDate: currentTask.dueDate,
    });
  }, [currentTask]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPublic.put(`/task/${task._id}`, editTask);
      if (response.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Your task has been updated.", "success");
        setIsEditModal(false);
      }
    } catch (error) {
      console.error("Edit error:", error);
      Swal.fire("Error", "Failed to update task", "error");
    }
  };

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
          <p>
            <span className="font-medium">Description: </span>
            {task.description}
          </p>
          <p>Due: {task.dueDate}</p>
          <p>Created task: {task.createdAt}</p>
          <p>Category: {task.category}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            className="btn btn-outline"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setIsEditModal(true)}
          >
            Edit
          </button>
          <button
            className="btn bg-red-500 "
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => handleDelete(task._id)}
          >
            Delete
          </button>
        </div>
      </div>
      {/* modal */}
      <div className={`modal ${isEditModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Task</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="form-control mt-6 flex flex-col gap-4">
              <label className="label">
                <span className="label-text">Task Title</span>
              </label>
              <input
                className="input w-full"
                type="text"
                placeholder="Title"
                required
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
              />
            </div>
            <div className="form-control mt-6 flex flex-col gap-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea w-full"
                placeholder="Description"
                value={editTask.description}
                onChange={(e) =>
                  setEditTask({ ...editTask, description: e.target.value })
                }
              />
            </div>
            <div className="form-control mt-6 flex flex-col gap-4">
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                type="date"
                className="input"
                value={editTask.dueDate}
                onChange={(e) =>
                  setEditTask({ ...editTask, dueDate: e.target.value })
                }
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setIsEditModal(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Task;
