import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Addtask = () => {
  //*States
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowfinished] = useState(true);

  //*Variables
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
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
  const handleDeleteAll = () => {
    const confrim = confirm("Are You Sure You Wanna Delete All Tasks.?");
    setTodos([]);
  };

  return (
    <div className="custom-scrollbar bg-[#FFF5E1] container sm:mx-auto  lg:max-w-2/4  sm:max-w-2/3 w-full sm:rounded-2xl sm:h-[85vh] h-screen sm:mt-5 overflow-y-auto relative shadow-md  shadow-neutral-500 overflow-auto">
      <div className="heading sticky top-0 p-2 flex justify-center items-center font-bold text-2xl text-center text-[#2D2D2D] bg-[#ffe0a1] z-5 ">
        <h3>UTask Your To-Do List Manager</h3>
      </div>
      <section className="sticky z-10 top-11 line w-full h-0.5 bg-[#E6A157] "></section>

      <div className="addTask w-full flex my-5 gap-x-2 justify-center items-center">
        <input
          value={todo}
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className=" outline-0 placeholder:text-[#2D2D2D] bg-[#ffe0a1] text-[#2D2D2D] rounded-[20px] h-8 px-2 w-3/4 text-wrap"
          placeholder="Type Here.."
        />
        <button
          onClick={handleAdd}
          className="bg-[#ffc655] text-[#2D2D2D] rounded-[10px] py-2 px-4 font-bold cursor-pointer transform hover:scale-102 hover:bg-[#ec9e00] transition-all"
        >
          Add
        </button>
      </div>
      <span className="text-[#2D2D2D] mx-8 ">
        <input
          type="checkbox"
          checked={showFinished}
          onChange={toggleCheckbox}
          className="accent-[#ff931f]"
        />{" "}
        Show Finished Tasks
      </span>

      <section className="line w-full h-0.5 bg-[#E6A157] mt-1"></section>
      {todos.map((item) => {
        return (
          (showFinished || !item.Iscompleted) && (
            <div
              key={item.id}
              className="p-4 flex gap-x-3 justify-between items-center mx-1 my-3  bg-[#ffe0a1] rounded-2xl text-[#2D2D2D] border-b-2 border-[#E6A157] "
            >
              <div className="flex gap-x-2  w-[85%]">
                <input
                  name={item.id}
                  type="checkbox"
                  onChange={handleCheckbox}
                  checked={item.Iscompleted}
                  className="accent-[#ff931f]"
                />
                <div className="w-full">
                  <span className="text-[14px]">{item.date}</span>
                  {item.IsEditable ? (
                    <input
                      name={item.id}
                      autoFocus
                      value={item.task}
                      onBlur={handleBlur}
                      onChange={handleEditedTask}
                      className={`text-[#2D2D2D] font-bold outline-0 w-full text-wrap `}
                    />
                  ) : (
                    <li
                      className={`${
                        item.Iscompleted ? "line-through" : ""
                      } decoration-[#ec9e00] decoration-3 text-[#2D2D2D] font-bold list-none max-w-[95%] break-words whitespace-normal`}
                    >
                      {item.task}
                    </li>
                  )}
                </div>
              </div>
              <div
                className="icons flex justify-evenly items-center text-[20px] text-[#ffad08] [&>span]:cursor-pointer gap-x-2 
                [&>span]:transition-all 
              [&>span]:hover:text-[#ec9e00]"
              >
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
            </div>
          )
        );
      })}
      {/* <section className="line w-full h-0.5 bg-white mt-1 sticky bottom-14"></section> */}
      {todos.length > 3 && (
        <div className="flex justify-center  sticky bottom-0 p-2 w-full">
          <button
            className="bg-[#ffc655] text-[#2D2D2D] rounded-[10px] px-2 py-3 font-bold cursor-pointer transform hover:scale-102 hover:bg-[#ec9e00] transition-all"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>
      )}
    </div>
  );
};

export default Addtask;
