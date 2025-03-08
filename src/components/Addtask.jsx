import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaCheck, FaFilter, FaUndoAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import SplitText from "./SplitText";
import ShinyText from "./ShinyText";
import UserInfo from "./UserInfo";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";

const Addtask = () => {
  //*States & Refs
  const [todo, setTodo] = useState("");
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [show, setIsShow] = useState(false);
  const [penTasks, setPentasks] = useState([]);
  const [comTasks, setComtasks] = useState([]);
  const [ismobileScreen, setIsmobilescreen] = useState(
    window.innerWidth <= 639
  );
  const [taskpanel, setTaskpanel] = useState(false);
  const [filter, setFilter] = useState("A");
  const taskRef = useRef(null);
  const [currentTasks, setCurrenttasks] = useState({});

  //*Variables
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  //*Constants
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isVisible = localStorage.getItem("isVisible");
  const userName = localStorage.getItem("name") || "Anonymous";
  const fullDate = `${month}/${day}/${year}`;

  //*Effects
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos ? setTodos(todos) : [];

    const handleScreensize = () => {
      setIsmobilescreen(window.innerWidth <= 530);
    };
    window.addEventListener("resize", handleScreensize);

    return () => window.removeEventListener("resize", handleScreensize);
  }, []);

  useEffect(() => {
    savetoLS();
    filter_Tasks();
  }, [todos]);

  useEffect(() => {
    const current = filtered_tasks();
    setCurrenttasks(current);
  });
  useEffect(() => {
    taskpanel
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [taskpanel]);

  //*Functions
  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleKeyDown = (e) => {
    e.key == "Enter" && handleAdd();
  };

  const handleAdd = () => {
    if (todo != "" && todo.length <= 78 && title.length <= 25) {
      setTodos([
        {
          id: uuidv4(),
          title: title || "No Title",
          task: todo,
          Iscompleted: false,
          IsEditable: false,
          date: fullDate,
        },
        ...todos,
      ]);
      setTodo("");
      setTitle("");
      setTaskpanel(false);
    } else "";
  };
  const handleDesc = (e) => {
    setTodo(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleCheckbox = (e) => {
    const id = e.currentTarget.id;
    const index = todos.findIndex((item) => item.id === id);
    todos[index].Iscompleted = !todos[index].Iscompleted;
    const newtodos = [...todos];
    setTodos(newtodos);
  };
  const handleDelete = (e, id) => {
    const confrim = confirm("Are You Sure You Wanna Delete this Task.?");
    const filterTodos = todos.filter((item) => item.id !== id);
    confrim && setTodos(filterTodos);
  };
  const deleteAll = () => {
    const confrim = confirm("Are You Sure You Wanna Clear all Tasks.?");
    confrim && setTodos([]);
  };
  const handleEdit = (e, id) => {
    const index = todos.findIndex((item) => item.id === id);
    todos[index].IsEditable = !todos[index].IsEditable;
    todos[index].Iscompleted = false;
    if (todos[index].task === "") {
      todos[index].task = "Task is Empty...";
    }
    const newtodos = [...todos];
    setTodos(newtodos);
  };
  const handleEditedTask = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    todos[index].task = e.target.value;
    const newtodos = [...todos];
    setTodos(newtodos);
  };
  const showAll = () => {
    setIsShow(!show);
  };
  const filter_Tasks = () => {
    const penTasks = todos.filter((item) => item.Iscompleted != true);
    const comTasks = todos.filter((item) => item.Iscompleted == true);
    setPentasks(penTasks);
    setComtasks(comTasks);
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const filtered_tasks = () => {
    switch (filter) {
      case "A":
        return todos;
      case "C":
        return comTasks;
      case "P":
        return penTasks;
    }
  };

  return (
    <>
      {!isVisible ? <UserInfo /> : ""}
      {!isVisible ? (
        ""
      ) : (
        <div
          className={`${isVisible ? "" : "blur-xs"}
           heading p-2 px-4 sm:px-2 mt-5 flex flex-col sm:flex-row sm:justify-center sm:items-center items-start font-bold text-4xl text-black`}
        >
          <span className=" w-full text-center">
            <SplitText
              text={`Hello, ${userName},`}
              className="font-bold text-[24px] mb-2 sm:b-0 sm:text-3xl lg:text-4xl"
            />
            <ShinyText
              text="Start planning today!"
              disabled={false}
              speed={3}
              className="shiny-text-white_Black text-[24px] sm:text-3xl lg:text-4xl"
            />
          </span>
        </div>
      )}
      <div className="h-auto w-full flex justify-center items-start">
        <div
          className={`${
            isVisible ? "" : "blur-xs"
          }  xl:max-w-3/4 w-4/4 sm:w-[96vw] sm:rounded-[5px]  h-auto sm:mt-5 overflow-y-hidden relative  overflow-visible transition-all sm:px-0`}
        >
          <form onSubmit={handleSubmit(() => handleAdd)}>
            <div className=" flex sm:justify-center sm:gap-x-2 justify-between items-center p-4 t-4 sm:mt-0 sm:px-0 ">
              <div className="sm:flex flex-col relative hidden">
                <input
                  {...register("title", {
                    maxLength: { value: 25, message: "Title is too long" },
                  })}
                  value={title}
                  onChange={handleTitle}
                  type="text"
                  className="bg-[#DBE2EF] h-12 p-2 outline-0 rounded-[5px] "
                  placeholder="Title (optional)"
                />
                {errors.title && (
                  <span className="text-red-500 font-semibold text-sm absolute -bottom-6">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="flex-col relative w-2/3 hidden sm:flex">
                <input
                  {...register("task", {
                    maxLength: { value: 78, message: "Task is to Long." },
                  })}
                  value={todo}
                  onChange={handleDesc}
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="bg-[#DBE2EF] p-2 h-12 outline-0  rounded-[5px]  "
                  placeholder="Detail of the Task"
                />
                {errors.task && (
                  <span className="text-red-500  font-semibold text-sm absolute -bottom-6">
                    {errors.task.message}
                  </span>
                )}
              </div>
              <ShinyText
                text={dayName}
                disabled={false}
                speed={3}
                className="shiny-text-white_Red text-[28px] font-semibold italic block sm:hidden"
              />
              <button
                onClick={
                  ismobileScreen
                    ? () => {
                        setTaskpanel(true);
                        console.log("Clicked...");
                      }
                    : handleAdd
                }
                className="flex justify-center items-center bg-[#5C9967] sm:h-12 h-10 text-center text-white rounded-[5px] w-15 cursor-pointer transform hover:scale-103 transition-all hover:bg-[#4A7D54] text-xl"
              >
                <FaPlus />
              </button>
            </div>
          </form>
          <div className="bg-[#F0D1A8] filter my-5 sm:rounded-sm rounded-lg sm:mx-5 mx-4 cursor-pointer h-8 sm:w-auto items-center justify-center font-semibold sm:p-1 p-4 flex w-43">
            <span title="Filter">
              <FaFilter />
            </span>
            <select className="outline-0 w-38" onChange={handleFilter}>
              <option value="A">All tasks</option>
              <option value="C">Completed tasks</option>
              <option value="P">Pending tasks</option>
            </select>
          </div>
          <div
            className={`sm:hidden transition-all ease-in-out ${
              taskpanel ? "opacity-100 scale-100 " : "opacity-0 scale-0 "
            }  z-40  bg-[white] shadow-[-10px_-10px_90px_rgba(0,0,0,0.5)] h-[85%] w-screen fixed top-[10%] left-0  py-3 text-black flex flex-col justify-between `}
          >
            <span onClick={() => setTaskpanel(false)} className="text-3xl ml-3">
              <IoCloseSharp />
            </span>
            <form onSubmit={handleSubmit(() => handleAdd)}>
              <div className="py-10 w-full h-90 items-center my-1 p-2 rounded-[5px]">
                <div className="">
                  <label className="flex flex-col px-1" htmlFor="">
                    <span className="font-semibold">
                      Enter Title(optional):
                    </span>
                    <input
                      {...register("phoneTitle", {
                        maxLength: { value: 25, message: "Task is to Long" },
                      })}
                      className="outline-0 p-2 rounded-[5px] bg-[#DBE2EF] h-10"
                      placeholder="Your Title"
                      type="text"
                      value={title}
                      onChange={handleTitle}
                    />
                  </label>
                  {errors.phoneTitle && (
                    <span className="text-red-500 px-2 font-semibold text-sm ">
                      {errors.phoneTitle.message}
                    </span>
                  )}
                </div>

                <div className="my-8">
                  <label className="flex flex-col px-1" htmlFor="">
                    <span className="font-semibold">Enter Task(Required):</span>
                    <input
                      {...register("phoneTask", {
                        maxLength: { value: 78, message: "Task is to Long" },
                      })}
                      className="outline-0 p-2 rounded-[5px] bg-[#DBE2EF] h-10"
                      placeholder="Your Task"
                      type="text"
                      value={todo}
                      onChange={handleDesc}
                    />
                  </label>

                  {errors.phoneTask && (
                    <span className="text-red-500 px-2 font-semibold text-sm ">
                      {errors.phoneTask.message}
                    </span>
                  )}
                </div>
                <div className="w-full flex justify-center items-center">
                  <button
                    onClick={handleAdd}
                    className=" bg-[#5C9967] h-10 text-center text-white rounded-[5px] w-15 cursor-pointer transform hover:scale-103 transition-all hover:bg-[#4A7D54] text-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
            <div className="w-full text-center ">
              UTaskify | All Rigths Reserved By{" "}
              <b className="opacity-70">Muhammad Uzair</b>
            </div>
          </div>
          <div
            ref={taskRef}
            className={`grid sm:grid-cols-2 grid-cols-1 gap-3 p-4 h-auto custom-scrollbar overflow-hidden transition-[max-height] ease-out duration-1000 ${
              show ? "max-h-[1500px]" : "sm:max-h-[370px] max-h-[710px]"
            }`}
          >
            {currentTasks.length > 0 ? (
              currentTasks.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="transition-all bg-[#F0D1A8] sm:h-40 h-35 sm:rounded-[5px] rounded-xl w-full flex justify-between items-center py-2 sm:px-3 pr-2 pl-3 sm:shadow-lg  text-[#2D2D2D] relative "
                  >
                    <>
                      <div className="h-full w-4/4 flex flex-col justify-between  ">
                        <div className=" flex flex-col gap-y-2  h-full">
                          <span className="title md:text-3xl text-2xl font-bold text-[#3A3A36]">
                            {item.title}
                          </span>

                          {item.IsEditable ? (
                            <input
                              name={item.id}
                              autoFocus
                              value={item.task}
                              onChange={handleEditedTask}
                              className={`text-[#3A3A36] outline-0 w-full text-wrap `}
                            />
                          ) : (
                            <span
                              className={`
                                 text-[#3A3A36] max-w-[95%] break-words whitespace-normal`}
                            >
                              {item.task}
                            </span>
                          )}
                        </div>
                        <div className="">
                          <span className="text-xl font-semibold text-[#3A3A36]">
                            {item.Iscompleted
                              ? "Completed"
                              : `Start Data: ${item.date}`}
                          </span>
                        </div>
                      </div>
                      <div
                        className="buttons flex flex-col h-full justify-between items-center gap-y-2 text-2xl text-[#3A3A36] [&>span]:cursor-pointer gap-x-2
                     [&>span]:transition-all
                   [&>span]:hover:text-[#494940] p-2"
                      >
                        <span id={item.id} onClick={handleCheckbox}>
                          {item.Iscompleted ? <FaUndoAlt /> : <SiTicktick />}
                        </span>
                        <span onClick={(e) => handleEdit(e, item.id)}>
                          {!item.Iscompleted ? (
                            item.IsEditable ? (
                              <FaCheck />
                            ) : (
                              <FaEdit />
                            )
                          ) : (
                            " "
                          )}
                        </span>
                        <span onClick={(e) => handleDelete(e, item.id)}>
                          <MdDelete />
                        </span>
                      </div>
                    </>
                  </div>
                );
              })
            ) : (
              <div className="bg-[#F0D1A8] sm:h-40 h-35 sm:rounded-[5px] rounded-xl w-full flex justify-center items-center p-2 sm:shadow-lg  text-[#2D2D2D]">
                <span className="sm:px-5 px-1 sm:text-3xl text-2xl sm:font-bold font-semibold mb-5">
                  No Task to Display...
                </span>
              </div>
            )}
          </div>
          {currentTasks.length >= 5 && (
            <div className="flex justify-center items-center p-2 w-full gap-x-10">
              <button
                className=" text-[#3A3A36] text-lg px-2 py-3 font-bold cursor-pointer transform hover:scale-102  transition-all "
                onClick={showAll}
              >
                {show ? "Show Less" : "Show All"}
              </button>
              <button
                className=" text-[#3A3A36] text-lg px-2 py-3 font-bold cursor-pointer transform hover:scale-102  transition-all"
                onClick={deleteAll}
              >
                Clear all
              </button>
            </div>
          )}
          <div className="px-4 flex sm:flex-row flex-col sm:h-auto h-60 sm:mb-10 mb-0 gap-x-3  justify-between bg-white w-full">
            <div className="flex gap-x-4 sm:justify-normal justify-between items-center">
              <div className="comTask sm:w-30 w-40 flex-col rounded-2xl sm:bg-[#F0D1A8] p-2 flex  justify-between items-center text-[#3A3A36]">
                <span className=" text-center font-bold">Completed Tasks</span>
                <span className="sm:text-4xl text-3xl font-extrabold">
                  {comTasks.length}
                </span>
              </div>
              <div className="penTask sm:w-30 w-40 flex-col rounded-2xl sm:bg-[#C4A49F] p-2 flex  justify-between items-center text-[#291e1a]">
                <span className=" text-center font-bold">Pending Tasks</span>
                <span className="sm:text-4xl text-3xl font-extrabold">
                  {penTasks.length}
                </span>
              </div>
            </div>
            <div className="totTask flex sm:static fixed left-0 bottom-0 justify-between sm:w-[80%] w-full bg-white sm:rounded-2xl rounded-none sm:pl-5 md:pr-2 sm:shadow-md shadow-neutral-500 items-center sm:h-30 h-auto py-2 sm:py-0">
              <div className="flex h-full sm:h-fit w-30 items-center justify-center flex-col px-2">
                <span className="font-semibold text-[#30a1c4] lg:text-lg md:text-[15px] text-[13px] ">
                  Tasks created
                </span>
                <span className="sm:text-4xl text-3xl text-center font-bold">
                  {todos.length}
                </span>
              </div>
              <div className="sm:max-w-90 w-60 max-h-25 overflow-ellipsis">
                <ShinyText
                  text="Your future is created by what you do today, not tomorrow."
                  disabled={false}
                  speed={3}
                  className="shiny-text-white_Black lg:text-[22px] sm:text-lg text-[16px] text-center font-bold "
                />
                <span className="text-[22px] font-bold text-[#3A3A36]"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addtask;
