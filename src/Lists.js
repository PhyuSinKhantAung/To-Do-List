import { FaEdit, FaTrash } from "react-icons/fa";

const Lists = ({ items, editItemHandler, removeItemHandler }) => {
  return (
    <article className="bg-gray-100 shadow-md">
      {items.map((item) => {
        return (
          <div className="py-2 flex justify-between border" key={item.id}>
            <h1 className="p-2">{item.title}</h1>
            <div className="p-2">
              <button
                onClick={() => editItemHandler(item.id)}
                className="mr-2 text-green-500"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => removeItemHandler(item.id)}
                className="text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </article>
  );
};

export default Lists;
