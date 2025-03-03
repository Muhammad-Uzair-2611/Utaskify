import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import SplitText from "./SplitText";
import ShinyText from "./ShinyText";
import UserInfo from "./UserInfo";

const Addtask = () => {
  //*States & Refs
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [show, setIsShow] = useState(false);
  const [showFinished, setShowfinished] = useState(true);
  const taskRef = useRef(null);

  //*Variables
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  console.log(dayName);
  const fullDate = `${month}/${day}/${year}`;

  //*Effects
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos ? setTodos(todos) : [];
    console.log(`Month: ${month} Day: ${day} Year: ${year}`);
  }, []);
  useEffect(() => {
    savetoLS();
  }, [todos]);
  useEffect(() => {
    if (show) {
      taskRef.current.style.overflowY = "scroll";
      taskRef.current.style.padding = "16px 10px";
    } else {
      taskRef.current.style.overflowY = "hidden";
      taskRef.current.style.padding = "16px";
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
    todo != ""
      ? setTodos([
          {
            id: uuidv4(),
            task: todo,
            Iscompleted: false,
            IsEditable: false,
            date: fullDate,
          },
          ...todos,
        ])
      : "";
    setTodo("");
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    const id = e.target.name;
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
          } custom-scrollbar container sm:w-[96vw] w-full  sm:rounded-[5px] sm:h-[85vh] h-screen sm:mt-5 overflow-y-auto relative  overflow-auto transition-all`}
        >
          {/* <section className="sticky z-10 top-11 line w-full h-0.5 bg-[#E6A157] "></section> */}

          <div className="w-full flex my-5 gap-x-2 justify-center items-center">
            <input
              type="text"
              className="bg-[#DBE2EF] h-12 p-2 outline-0 rounded-[5px] hidden sm:block"
              placeholder="Title (optional)"
            />
            <input
              value={todo}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              type="text"
              className="bg-[#DBE2EF] p-2 h-12 outline-0 w-2/3 rounded-[5px] hidden sm:block "
              placeholder="Detail of the Task"
            />
            {/* <span className="text-5xl playwrite-it-moderna text-red-500">
              {dayName}
            </span> */}
            <button className="flex justify-center items-center bg-[#5C9967] h-12 p-2 text-white rounded-[5px] w-15 cursor-pointer transform hover:scale-103 transition-all hover:bg-[#4A7D54] text-xl">
              <FaPlus />
            </button>
          </div>
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
            className="grid grid-cols-2 gap-3 p-4 overflow-hidden h-90"
          >
            {todos.map((item) => {
              return (
                (showFinished || !item.Iscompleted) && (
                  <div
                    key={item.id}
                    className="bg-[#F0D1A8] h-40 rounded-[5px] w-full flex justify-between items-center p-4 border-b-2 border-[#E6A157] text-[#2D2D2D]"
                  ></div>
                )
              );
            })}
          </div>

          {todos.length > 3 && (
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
