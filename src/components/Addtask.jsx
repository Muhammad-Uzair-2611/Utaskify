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
import { form } from "framer-motion/client";

const Addtask = () => {
  //*States & Refs
  const [todo, setTodo] = useState("");
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [show, setIsShow] = useState(false);
  const [showFinished, setShowfinished] = useState(true);
  const taskRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //*Variables

  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = `${month}/${day}/${year}`;

  //*Effects
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos ? setTodos(todos) : [];
  }, []);
  useEffect(() => {
    savetoLS();
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

  const handleKeyPress = (e) => {
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
    console.log(id);
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
  const isVisible = localStorage.getItem("isVisible");
  const userName = localStorage.getItem("name") || "Anonymous";

  return (
    <>
      {!isVisible ? <UserInfo /> : ""}
      {!isVisible ? (
        ""
      ) : (
        <div
          className={`${isVisible ? "" : "blur-xs"}
           heading p-2 mt-5 flex sm:justify-center items-center font-bold text-4xl text-black`}
        >
          <SplitText
            text={`Hello, ${userName},`}
            className="font-bold text-[25px] sm:text-4xl"
          />
          <ShinyText
            text="Start planning today!"
            disabled={false}
            speed={3}
            className="custom-class text-[25px] sm:text-4xl"
          />
        </div>
      )}
      <div className="h-screen w-full flex justify-center items-start">
        <div
          className={`${
            isVisible ? "" : "blur-xs"
          }  container sm:w-[96vw] w-full  sm:rounded-[5px]  h-screen sm:mt-5 overflow-y-auto relative  overflow-visible transition-all`}
        >
          {/* <section className="sticky z-10 top-11 line w-full h-0.5 bg-[#E6A157] "></section> */}
          <form onSubmit={handleSubmit(() => handleAdd)}>
            <div className="w-full flex my-5 gap-x-2 justify-center items-center">
              <div className="flex flex-col relative">
                <input
                  {...register("title", {
                    maxLength: { value: 25, message: "Title is too long" },
                  })}
                  value={title}
                  onChange={handleTitle}
                  type="text"
                  className="bg-[#DBE2EF] h-12 p-2 outline-0 rounded-[5px] hidden sm:block"
                  placeholder="Title (optional)"
                />
                {errors.title && (
                  <span className="text-red-500 font-semibold text-sm absolute -bottom-6">
                    Title is too Long
                  </span>
                )}
              </div>
              <div className="flex flex-col relative w-2/3">
                <input
                  {...register("task", {
                    maxLength: { value: 78, message: "Task is to Long" },
                  })}
                  value={todo}
                  onChange={handleDesc}
                  type="text"
                  className="bg-[#DBE2EF] p-2 h-12 outline-0  rounded-[5px] hidden sm:block "
                  placeholder="Detail of the Task"
                />
                {errors.task && (
                  <span className="text-red-500 font-semibold text-sm absolute -bottom-6">
                    Task is too Long
                  </span>
                )}
              </div>
              {/* <span className="text-5xl playwrite-it-moderna text-red-500">
              {dayName}
            </span> */}
              <button
                onClick={handleAdd}
                className="flex justify-center items-center bg-[#5C9967] h-12 p-2 text-white rounded-[5px] w-15 cursor-pointer transform hover:scale-103 transition-all hover:bg-[#4A7D54] text-xl"
              >
                <FaPlus />
              </button>
            </div>
          </form>
          {/* <span className="text-[#2D2D2D] mx-8 ">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleCheckbox}
            className="accent-[#ff931f]"
          />{" "}
          Show Finished Tasks
        </span> */}

          <div
            ref={taskRef}
            className="grid grid-cols-2 gap-3 p-4 overflow-hidden h-90 custom-scrollbar"
          >
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-[#F0D1A8] h-40 rounded-[5px] w-full flex justify-between items-center py-2 px-3 border-b-2 border-[#E6A157] text-[#2D2D2D] relative "
                >
                  {item.Iscompleted ? (
                    
                    <div className="w-full h-full absolute left-0 flex justify-center items-center flex-col gap-y-1 font-bold text-3xl text-[#3A3A36]">
                      Completed
                      <button
                        className="px-2 py-1 text-white cursor-pointer
                       bg-[#5C9967] rounded-lg text-lg hover:bg-[#4A7D54]"
                      >
                        Undo
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="h-full w-4/4 flex flex-col justify-between  ">
                        <div className=" flex flex-col  h-full">
                          <span className="title text-3xl font-bold text-[#3A3A36]">
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
            })}
          </div>

          {todos.length >= 5 && (
            <div className="flex justify-center sticky bottom-0 p-2 w-full">
              <button
                className="bg-[#5C9967] text-[white] rounded-[10px] px-2 py-3 font-bold cursor-pointer transform hover:scale-102 hover:bg-[#4A7D54] transition-all"
                onClick={showAll}
              >
                {show ? "Show Less" : "Show All"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Addtask;
