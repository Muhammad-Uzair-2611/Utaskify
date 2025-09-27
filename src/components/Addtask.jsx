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
import { CiSearch } from "react-icons/ci";

const Addtask = () => {
  //*States & Refs
  const [todo, setTodo] = useState("");
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [show, setIsShow] = useState(false);
  const [penTasks, setPentasks] = useState([]);
  const [comTasks, setComtasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedTodos, setSearchedTodos] = useState([]);
  const [ismobileScreen, setIsmobilescreen] = useState(
    window.innerWidth <= 639
  );
  const [taskpanel, setTaskpanel] = useState(false);
  const [filter, setFilter] = useState("A");
  const taskRef = useRef(null);
  const [currentTasks, setCurrenttasks] = useState({});

  //*Date Variables
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
    const current = searchQuery === "" ? filtered_tasks() : searchedTodos;
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
    if (todo != "" && title.length <= 25) {
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
  const Search_By_Title = (e) => {
    let query = e.target.value;

    setSearchQuery(query);
    let matchedTodos = [];
    todos.forEach((todo, index) => {
      if (todo.title.toLowerCase().startsWith(query.toLowerCase())) {
        matchedTodos[index] = todo;
        setSearchedTodos(matchedTodos);
      } else {
        setSearchedTodos(matchedTodos);
      }
    });
  };
  const handleDelete = (e, id) => {
    const confrim = confirm("Are You Sure You Wanna Delete this Task.?");
    const filterTodos = todos.filter((item) => item.id !== id);
    confrim && setTodos(filterTodos);
    setSearchQuery("");
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
           heading p-2 px-4 sm:px-2 mt-3 sm:mt-5 flex flex-col sm:flex-row sm:justify-center sm:items-center items-start font-bold text-black`}
        >
          <span className="w-full text-center">
            <SplitText
              text={`Hello, ${userName},`}
              className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-0"
            />
            <ShinyText
              text="Start planning today!"
              disabled={false}
              speed={3}
              className="shiny-text-white_Black text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            />
          </span>
        </div>
      )}
      <div className="h-auto w-full flex justify-center items-start">
        <div
          className={`${
            isVisible ? "" : "blur-xs"
          } w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-auto sm:mt-5 overflow-y-hidden relative overflow-visible transition-all`}
        >
          <form onSubmit={handleSubmit(() => handleAdd)}>
            <div className="flex sm:justify-center sm:gap-x-2 justify-between items-center p-2 sm:p-4 mt-2 sm:mt-0">
              <div className="sm:flex flex-col relative hidden">
                <input
                  {...register("title", {
                    maxLength: { value: 25, message: "Title is too long" },
                  })}
                  value={title}
                  onFocus={() => setSearchQuery("")}
                  onChange={handleTitle}
                  type="text"
                  className="bg-[#DBE2EF] h-10 sm:h-12 p-2 outline-0 rounded-[5px] text-sm sm:text-base"
                  placeholder="Title (optional)"
                />
                {errors.title && (
                  <span className="text-red-500 font-semibold text-xs sm:text-sm absolute -bottom-5 sm:-bottom-6">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="flex-col relative w-2/3 hidden sm:flex">
                <input
                  value={todo}
                  onFocus={() => setSearchQuery("")}
                  onChange={handleDesc}
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="bg-[#DBE2EF] p-2 h-10 sm:h-12 outline-0 rounded-[5px] text-sm sm:text-base"
                  placeholder="Detail of the Task"
                />
              </div>
              <ShinyText
                text={dayName}
                disabled={false}
                speed={3}
                className="shiny-text-white_Red text-lg sm:text-xl md:text-2xl font-semibold italic block sm:hidden"
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
                className="flex justify-center items-center bg-[#5C9967] h-10 sm:h-12 text-center text-white rounded-[5px] w-12 sm:w-15 cursor-pointer transform hover:scale-103 transition-all hover:bg-[#4A7D54] text-lg sm:text-xl"
              >
                <FaPlus />
              </button>
            </div>
          </form>
          <div className="flex justify-between px-2 sm:px-4 my-3 sm:my-5 flex-col-reverse sm:flex-row gap-y-3">
            <div className="bg-[#F0D1A8] filter rounded-sm cursor-pointer h-8 sm:h-10 sm:w-auto w-full items-center justify-center font-semibold flex p-2 sm:p-3">
              <span title="Filter" className="text-sm sm:text-base">
                <FaFilter />
              </span>
              <select
                className="cursor-pointer outline-0 w-32 sm:w-38 text-xs sm:text-sm bg-transparent"
                onChange={handleFilter}
              >
                <option value="A">All tasks</option>
                <option value="C">Completed tasks</option>
                <option value="P">Pending tasks</option>
              </select>
            </div>
            <div className="SearchBar rounded-sm sm:w-52 w-full px-2 bg-[#F0D1A8] flex justify-between items-center h-8 sm:h-10">
              <input
                className="outline-0 text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-[13px] w-[80%] placeholder:text-neutral-700 placeholder:font-semibold bg-transparent"
                type="text"
                value={searchQuery}
                onChange={Search_By_Title}
                placeholder="Search By Title"
              />
              <span className="text-sm sm:text-base">
                <CiSearch />
              </span>
            </div>
          </div>
          <div
            className={`sm:hidden transition-all ease-in-out ${
              taskpanel ? "opacity-100 scale-100 " : "opacity-0 scale-0 "
            } z-40 bg-white shadow-[-10px_-10px_90px_rgba(0,0,0,0.5)] h-[85%] w-screen fixed top-[10%] left-0 py-3 text-black flex flex-col justify-between`}
          >
            <span
              onClick={() => setTaskpanel(false)}
              className="text-2xl sm:text-3xl ml-3 cursor-pointer"
            >
              <IoCloseSharp />
            </span>
            <form onSubmit={handleSubmit(() => handleAdd)}>
              <div className="py-6 sm:py-10 w-full items-center my-1 p-2 sm:p-4 rounded-[5px]">
                <div className="mb-4 sm:mb-6">
                  <label className="flex flex-col px-1" htmlFor="">
                    <span className="font-semibold text-sm sm:text-base mb-1">
                      Enter Title(optional):
                    </span>
                    <input
                      {...register("phoneTitle", {
                        maxLength: { value: 25, message: "Task is to Long" },
                      })}
                      className="outline-0 p-2 rounded-[5px] bg-[#DBE2EF] h-10 sm:h-12 text-sm sm:text-base w-full"
                      placeholder="Your Title"
                      type="text"
                      value={title}
                      onChange={handleTitle}
                    />
                  </label>
                  {errors.phoneTitle && (
                    <span className="text-red-500 px-2 font-semibold text-xs sm:text-sm">
                      {errors.phoneTitle.message}
                    </span>
                  )}
                </div>

                <div className="my-6 sm:my-8">
                  <label className="flex flex-col px-1" htmlFor="">
                    <span className="font-semibold text-sm sm:text-base mb-1">
                      Enter Task(Required):
                    </span>
                    <input
                      {...register("phoneTask", {
                        maxLength: { value: 78, message: "Task is to Long" },
                      })}
                      className="outline-0 p-2 rounded-[5px] bg-[#DBE2EF] h-10 sm:h-12 text-sm sm:text-base w-full"
                      placeholder="Your Task"
                      type="text"
                      value={todo}
                      onChange={handleDesc}
                    />
                  </label>

                  {errors.phoneTask && (
                    <span className="text-red-500 px-2 font-semibold text-xs sm:text-sm">
                      {errors.phoneTask.message}
                    </span>
                  )}
                </div>
                <div className="w-full flex justify-center items-center">
                  <button
                    onClick={handleAdd}
                    className="bg-[#5C9967] h-10 sm:h-12 text-center text-white rounded-[5px] w-20 sm:w-24 cursor-pointer transform hover:scale-103 transition-all hover:bg-[#4A7D54] text-sm sm:text-base font-semibold"
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
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-4 h-auto custom-scrollbar transition-[max-height] ease-out duration-1000`}
          >
            {currentTasks.length > 0 ? (
              currentTasks.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="transition-all bg-[#F0D1A8] min-h-32 sm:min-h-40 h-fit rounded-xl sm:rounded-[5px] w-full flex justify-between items-start py-2 sm:py-3 px-2 sm:px-3 sm:shadow-lg text-[#2D2D2D] relative"
                  >
                    <>
                      <div className="h-full w-[85%] sm:w-[90%] flex flex-col justify-between">
                        <div className="flex flex-col gap-y-1 sm:gap-y-2 h-full">
                          <span className="title text-lg sm:text-xl md:text-2xl font-bold text-[#3A3A36] break-words">
                            {item.title}
                          </span>

                          {item.IsEditable ? (
                            <input
                              name={item.id}
                              autoFocus
                              value={item.task}
                              onChange={handleEditedTask}
                              className="text-[#3A3A36] outline-0 w-full text-wrap text-sm sm:text-base bg-transparent"
                            />
                          ) : (
                            <span className="text-[#3A3A36] max-w-[95%] break-words whitespace-normal text-sm sm:text-base">
                              {item.task}
                            </span>
                          )}
                        </div>
                        <div className="mt-2">
                          <span className="text-xs sm:text-sm font-semibold text-[#3A3A36]">
                            {item.Iscompleted
                              ? "Completed"
                              : `Start Data: ${item.date}`}
                          </span>
                        </div>
                      </div>
                      <div
                        className="buttons flex flex-col h-full justify-between items-center gap-y-2 sm:gap-y-4 text-lg sm:text-2xl text-[#3A3A36] [&>span]:cursor-pointer
                     [&>span]:transition-all
                   [&>span]:hover:text-[#494940] p-1 sm:p-2"
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
              <div className="bg-[#F0D1A8] min-h-32 sm:min-h-40 rounded-xl sm:rounded-[5px] w-full flex justify-center items-center p-2 sm:shadow-lg text-[#2D2D2D] col-span-full">
                <span className="px-2 sm:px-5 text-lg sm:text-2xl md:text-3xl font-semibold text-center">
                  No Task to Display...
                </span>
              </div>
            )}
          </div>
          {currentTasks.length >= 5 && (
            <div className="flex justify-center items-center p-2 w-full gap-x-10">
              <button
                className=" text-[#3A3A36] text-lg px-2 py-3 font-bold cursor-pointer transform hover:scale-102  transition-all"
                onClick={deleteAll}
              >
                Clear all
              </button>
            </div>
          )}
          <div className="px-2 sm:px-4 my-3 sm:my-5 flex flex-col sm:flex-row sm:h-auto gap-3 sm:gap-x-3 justify-between bg-white w-full">
            <div className="flex gap-x-3 sm:gap-x-4 justify-between sm:justify-normal items-center">
              <div className="comTask w-32 sm:w-30 flex-col rounded-2xl bg-[#F0D1A8] shadow-md shadow-neutral-500 p-2 flex justify-between items-center text-[#3A3A36]">
                <span className="text-center font-bold text-xs sm:text-sm">
                  Completed Tasks
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  {comTasks.length}
                </span>
              </div>
              <div className="comTask w-32 sm:w-30 flex-col rounded-2xl bg-[#F0D1A8] shadow-md shadow-neutral-500 p-2 flex justify-between items-center text-[#3A3A36]">
                <span className="text-center font-bold text-xs sm:text-sm tracking-wide">
                  Pending Tasks
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  {penTasks.length}
                </span>
              </div>
            </div>
            <div className="totTask flex sm:static fixed left-0 bottom-0 justify-between sm:w-[80%] w-full bg-white sm:rounded-2xl rounded-none sm:pl-5 md:pr-2 sm:shadow-md shadow-neutral-500 items-center sm:h-30 h-auto py-2 sm:py-0 px-4 sm:px-0">
              <div className="flex h-full sm:h-fit w-auto items-start justify-center flex-col">
                <span className="w-32 sm:w-40 font-semibold text-[#30a1c4] text-xs sm:text-sm md:text-base">
                  Tasks created
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
                  {todos.length}
                </span>
              </div>
              <div className="sm:max-w-90 w-48 sm:w-60 max-h-25 overflow-ellipsis">
                <ShinyText
                  text="Your future is created by what you do today, not tomorrow."
                  disabled={false}
                  speed={3}
                  className="shiny-text-white_Black text-sm sm:text-base md:text-lg lg:text-[22px] font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addtask;
