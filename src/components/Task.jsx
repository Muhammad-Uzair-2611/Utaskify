{todos.map((item) => {
  return (
    <div
      key={item.key}
      ref={taskContainer}
      className="p-4 border-b-2 border-white flex gap-x-3 justify-between items-center"
    >
      <div className="flex gap-x-2">
        <input name={item.id} type="checkbox" onChange={handleCheckbox} />
        <li
          className={`${
            item.taskcomplete ? "line-through" : ""
          } decoration-amber-100 text-steel-gray font-bold list-none`}
        >
          {item.task}
        </li>
      </div>
      <div className="icons flex justify-evenly items-center text-[20px] text-steel-gray [&>span]:cursor-pointer gap-x-2 ">
        <span>
          <FaEdit />
        </span>
        <span onClick={handleDelete}>
          <MdDelete />
        </span>
      </div>
    </div>
  );
})}