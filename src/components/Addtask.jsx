import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaCheck } from "react-icons/fa";
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
  const [showFinished, setShowfinished] = useState(true);
  const [penTasks, setPentasks] = useState(0);
  const [comTasks, setComtasks] = useState(0);
  const [ismobileScreen, setIsmobilescreen] = useState(
    window.innerWidth <= 639
  );
  const [taskpanel, setTaskpanel] = useState(false);
  const taskRef = useRef(null);

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
      setIsmobilescreen(window.innerWidth >= 530);
    };
    window.addEventListener("resize", handleScreensize);

    return () => window.removeEventListener("resize", handleScreensize);
  }, []);
  useEffect(() => {
    savetoLS();
    filter_Tasks();
  }, [todos]);
  useEffect(() => {
    if (show) {
      taskRef.current.style.overflowY = "scroll";
      taskRef.current.style.padding = "16px 10px";
      taskRef.current.style.height = "380px";
    } else {
      taskRef.current.style.overflowY = "hidden";
      taskRef.current.style.padding = "16px";
      taskRef.current.style.height = "360px";
      taskRef.current.scrollTop = 0;
    }
  }, [show]);

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
    } else console.log(todo.length);
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
    const confrim = confirm("Are You Sure You Wanna Delete this Task?");
    const filterTodos = todos.filter((item) => item.id !== id);
    confrim && setTodos(filterTodos);
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
  const handleBlur = (e) => {
    const index = todos.findIndex((item) => item.id === e.target.name);
    todos[index].IsEditable = !todos[index].IsEditable;
    const newtodos = [...todos];
    setTodos(newtodos);
  };
  const toggleCheckbox = () => {
    setShowfinished(!showFinished);
  };
  const showAll = () => {
    setIsShow(!show);
  };
  const filter_Tasks = () => {
    const penTasks = todos.filter((item) => item.Iscompleted != true);
    const comTasks = todos.filter((item) => item.Iscompleted == true);
    setPentasks(penTasks.length);
    setComtasks(comTasks.length);
  };
  const task_panel = () => {
    setTaskpanel(!taskpanel);
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
          <SplitText
            text={`Hello, ${userName},`}
            className="font-bold text-[30px] mb-2 sm:mb-0 sm:text-4xl"
          />
          <ShinyText
            text="Start planning today!"
            disabled={false}
            speed={3}
            className="shiny-text-white_Black text-[25px] sm:text-4xl"
          />
        </div>
      )}
      <div className="h-screen w-full flex justify-center items-start">
        <div
          className={`${
            isVisible ? "" : "blur-xs"
          }  xl:max-w-3/4 w-4/4 sm:w-[96vw] sm:rounded-[5px]  h-auto sm:mt-5 overflow-y-hidden relative  overflow-visible transition-all px-3 sm:px-0`}
        >
          <form onSubmit={handleSubmit(() => handleAdd)}>
            <div className=" flex sm:justify-center sm:gap-x-2 justify-between items-center p-4 mt-4 sm:mt-0 sm:px-0 ">
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
                    Title is too Long
                  </span>
                )}
              </div>
              <div className="flex-col relative w-2/3 hidden sm:flex">
                <input
                  {...register("task", {
                    maxLength: { value: 78, message: "Task is to Long" },
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
                    Task is too Long
                  </span>
                )}
              </div>
              <ShinyText
                text={dayName}
                disabled={false}
                speed={3}
                className="shiny-text-white_Red text-[40px] italic block sm:hidden"
              />
              <button
                onClick={ismobileScreen ? task_panel : handleAdd}
                className="flex justify-center items-center bg-[#5C9967] h-12 p-2 text-white rounded-[5px] w-15 cursor-pointer transform hover:scale-103 transition-all hover:bg-[#4A7D54] text-xl"
              >
                <FaPlus />
              </button>
            </div>
          </form>
          <div
            className={`transition-all ease-in-out ${
              taskpanel ? "opacity-100 scale-100 " : "opacity-0 scale-0 "
            }  z-40  bg-[white] shadow-[-10px_-10px_90px_rgba(0,0,0,0.5)] h-[85%] w-screen fixed top-[10%] left-0 px-4 py-3 text-black [&_label]:font-bold `}
          >
            <span onClick={task_panel} className="text-3xl">
              <IoCloseSharp />
            </span>
            <form onSubmit={handleSubmit(() => handleAdd)}>
              <div className="flex flex-col w-full h-90 justify-center border my-1 p-2 rounded-[5px]">
                <div className="">
                  <label className="flex flex-col px-1" htmlFor="">
                    Enter Title(optional):
                    <input
                      {...register("title", {
                        maxLength: { value: 25, message: "Task is to Long" },
                      })}
                      className="outline-0 p-2 rounded-[5px] bg-[#DBE2EF] h-10"
                      placeholder="Your Title"
                      type="text"
                      value={title}
                      onChange={handleTitle}
                    />
                  </label>
                  {errors.title && (
                    <span className="text-red-500 px-2 font-semibold text-sm ">
                      Title is too Long
                    </span>
                  )}
                </div>

                <div className="my-8">
                  <label className="flex flex-col px-1" htmlFor="">
                    Enter Task(Required):
                    <input
                      {...register("task", {
                        maxLength: { value: 78, message: "Task is to Long" },
                      })}
                      className="outline-0 p-2 rounded-[5px] bg-[#DBE2EF] h-10"
                      placeholder="Your Task"
                      type="text"
                      value={todo}
                      onChange={handleDesc}
                    />
                  </label>

                  {errors.task && (
                    <span className="text-red-500 px-2 font-semibold text-sm ">
                      Task is too Long
                    </span>
                  )}
                </div>
                <div className="w-full flex justify-center items-center">
                  <button
                    onClick={handleAdd}
                    className=" bg-[#5C9967] h-12 p-2 text-white rounded-[5px] w-15 cursor-pointer transform hover:scale-103 transition-all hover:bg-[#4A7D54] text-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            ref={taskRef}
            className={`grid sm:grid-cols-2 grid-cols-1 gap-3 p-4 overflow-hidden h-90 custom-scrollbar ${
              todos.length <= 4 ? "mb-17" : "mb-0"
            }`}
          >
            {todos.length > 0 ? (
              todos.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="bg-[#F0D1A8] h-40 sm:rounded-[5px] rounded-xl w-full flex justify-between items-center py-2 sm:px-3 pr-2 pl-5 sm:shadow-lg  text-[#2D2D2D] relative "
                  >
                    {item.Iscompleted ? (
                      <div className="w-full h-full absolute left-0 flex justify-center items-center flex-col gap-y-1 font-bold md:text-3xl text-2xl text-[#3A3A36]">
                        Completed
                        <button
                          onClick={handleCheckbox}
                          id={item.id}
                          className="px-2 md:font-semibold font-medium py-1 text-white cursor-pointer
                       bg-[#5C9967] rounded-lg md:text-lg text-[15px] hover:bg-[#4A7D54]"
                        >
                          Undo
                        </button>
                        <span className="md:text-2xl text-lg font-medium">
                          Complete Date:{item.date}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="h-full w-4/4 flex flex-col justify-between  ">
                          <div className=" flex flex-col  h-full">
                            <span className="title md:text-3xl text-2xl font-bold text-[#3A3A36]">
                              {item.title}
                            </span>

                            {item.IsEditable ? (
                              <input
                                name={item.id}
                                autoFocus
                                value={item.task}
                                // onBlur={handleBlur}
                                onChange={handleEditedTask}
                                className={`text-[#3A3A36] outline-0 w-full text-wrap `}
                              />
                            ) : (
                              <span
                                className={`${
                                  item.Iscompleted ? "line-through" : ""
                                } decoration-[#ec9e00] decoration-3 text-[#3A3A36] max-w-[95%] break-words whitespace-normal`}
                              >
                                {item.task}
                              </span>
                            )}
                          </div>
                          <div className="">
                            <span className="text-[22px] font-bold text-[#3A3A36]">
                              Start Data: {item.date}
                            </span>
                          </div>
                        </div>
                        <div
                          className="buttons flex flex-col h-full p-2 justify-between items-center gap-y-2 text-2xl text-[#3A3A36] [&>span]:cursor-pointer gap-x-2
                  //   [&>span]:transition-all
                  // [&>span]:hover:text-[#494940]"
                        >
                          <span id={item.id} onClick={handleCheckbox}>
                            <SiTicktick />
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
                    )}
                  </div>
                );
              })
            ) : (
              <span className="sm:px-5 px-1 sm:text-3xl text-2xl text-[#2D2D2D] sm:font-bold font-semibold">
                No Task to Display...
              </span>
            )}
          </div>
          {todos.length >= 5 && (
            <div className="flex justify-center items-center p-2 w-full">
              <button
                className=" text-[#3A3A36] text-lg px-2 py-3 font-bold cursor-pointer transform hover:scale-102  transition-all"
                onClick={showAll}
              >
                {show ? "Show Less" : "Show All"}
              </button>
            </div>
          )}
          <div className="px-4 flex sm:flex-row flex-col sm:h-auto h-60 sm:mb-10 mb-0 gap-x-3  justify-between">
            <div className="flex gap-x-4 sm:justify-normal justify-between items-center">
              <div className="comTask sm:w-30 w-40 flex-col rounded-2xl sm:bg-[#F0D1A8] p-2 flex  justify-between items-center text-[#3A3A36]">
                <span className=" text-center font-bold">Completed Tasks</span>
                <span className="sm:text-4xl text-3xl font-extrabold">
                  {comTasks <= 9 ? "0" + comTasks : comTasks}
                </span>
              </div>
              <div className="penTask sm:w-30 w-40 flex-col rounded-2xl sm:bg-[#C4A49F] p-2 flex  justify-between items-center text-[#291e1a]">
                <span className=" text-center font-bold">Pending Tasks</span>
                <span className="sm:text-4xl text-3xl font-extrabold">
                  {penTasks <= 9 ? "0" + penTasks : penTasks}
                </span>
              </div>
            </div>
            <div className="totTask flex sm:static fixed left-0 bottom-0 justify-between sm:w-[80%] w-full bg-white sm:rounded-2xl rounded-none sm:pl-5 pl-3 md:pr-2 sm:shadow-md shadow-neutral-500 items-center sm:h-30 h-auto py-2 sm:py-0">
              <div className="flex h-full sm:h-fit flex-col order">
                <span className="font-semibold text-[#30a1c4] lg:text-lg md:text-[15px] text-[13px] ">
                  Tasks created
                </span>
                <span className="sm:text-4xl text-3xl text-center font-bold">
                  {todos.length <= 9 ? "0" + todos.length : todos.length}
                </span>
              </div>
              <div className="sm:max-w-90 w-70  max-h-25 overflow-ellipsis pr-4 ">
                <ShinyText
                  text="Your future is created by what you do today, not tomorrow."
                  disabled={false}
                  speed={3}
                  className="shiny-text-white_Black lg:text-[22px] sm:text-left text-center sm:text-lg text-[16px] font-bold "
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
