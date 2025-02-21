import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Column from "../components/Column";

const Home = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
    dueDate: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosSecure.get(`/task?email=${user.email}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();

    const interval = setInterval(fetchTasks, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const moveTask = async (taskId, newCategory) => {
    await axiosPublic.put(`/task/${taskId}`, {
      category: newCategory,
    });
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    moveTask(active.id, over.id);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Error!", "You must be logged in to add a task.", "error");
      return;
    }

    try {
      const response = await axiosPublic.post("/task", {
        ...newTask,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      });

      if (response.status === 200 || response.status === 201) {
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          category: "To-Do",
        });
        Swal.fire("Success!", "Task added successfully", "success");
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to add task. Please try again.", "error");
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="px-[120px] my-[90px]">
      <div>
        <div className="flex flex-col gap-3 items-center md:flex-row">
          <img
            className="w-[120px] h-[120px] object-cover rounded-full"
            src={user.photoURL}
            alt=""
          />
          <h1 className="font-medium text-xl md:text-6xl">
            Welcome, {user.displayName}
          </h1>
        </div>
        <div className="divider"></div>
        <div className="flex gap-4 items-center">
          <h2 className="font-medium text-xl">Create New task</h2>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Add New task
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Creat New task!</h3>
                <form onSubmit={onSubmit}>
                  <div className="form-control mt-6 flex flex-col gap-4">
                    <label className="label">
                      <span className="label-text">Task Title</span>
                    </label>
                    <input
                      className="input w-full"
                      type="text"
                      placeholder="Title"
                      required
                      value={newTask.title}
                      maxLength="50"
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
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
                      value={newTask.description}
                      maxLength="200"
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-control mt-6 flex flex-col gap-4">
                    <label className="label">
                      <span className="label-text">Task Title</span>
                    </label>
                    <select
                      className="select w-full"
                      value={newTask.category}
                      onChange={(e) =>
                        setNewTask({ ...newTask, category: e.target.value })
                      }
                    >
                      <option value="To-Do">To-Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                  <div className="form-control mt-6 flex flex-col gap-4">
                    <label className="label">
                      <span className="label-text">Task Title</span>
                    </label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-control mt-6 flex flex-col gap-4">
                    <button type="submit" className="btn bg-black text-white">
                      Submit
                    </button>
                  </div>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <DndContext onDragEnd={onDragEnd}>
            <div className="task-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["To-Do", "In Progress", "Done"].map((category) => (
                <Column
                key={category}
                category={category}
                tasks={tasks.filter((task) => task.category === category)}
              />
              ))}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default Home;
