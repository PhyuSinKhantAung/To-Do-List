import React, { useEffect, useState } from "react";

import Lists from "./Lists";
import Alert from "./Alert";

const getLocalStorageList = () => {
  const list = localStorage.getItem("list");
  if (list) {
    const localStorageList = JSON.parse(list);
    return localStorageList;
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorageList());
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  // form submitHandler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "Please enter a value!");
    } else if (isEdit) {
      showAlert(true, "success", "You edited this item successfully!");
      setList(
        list.map((item) => {
          if (item.id === editId) return { ...item, title: name };
          return item;
        })
      );
      setName("");
      setIsEdit(false);
      setEditId(null);
    } else {
      showAlert(true, "success", "You added new task!");
      setList((prevList) => {
        return [
          ...prevList,
          { id: new Date().getTime().toString(), title: name },
        ];
      });
      setName("");
    }
  };
  // showAlert
  const showAlert = (show, type = "", message = "") => {
    setAlert({ show, type, message });
  };

  // remove item
  const removeItem = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
    showAlert(true, "danger", "One task was removed!");
  };

  // edit item
  const editItem = (id) => {
    const editItem = list.filter((item) => item.id === id);
    setName(editItem[0].title);
    setIsEdit(true);
    setEditId(id);
  };

  // clear all
  const clearAll = () => {
    setList([]);
    showAlert(true, "danger", "You deleted all items!");
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50">
      <section className="max-w-3xl w-4/5 text-center">
        <h1 className="text-4xl font-bold ">TO-DO-LIST</h1>
        {alert.show && (
          <Alert {...alert} list={list} removeAlert={showAlert}></Alert>
        )}

        <form className="my-6" onSubmit={handleSubmit}>
          <input
            onChange={(event) => setName(event.target.value)}
            type="text"
            value={name}
            placeholder="e.g, Learn React"
            className="bg-gray-100 py-2 px-4 rounded w-1/2"
          />
          <button className="bg-slate-700 py-2 px-4 text-white rounded-r">
            Submit
          </button>
        </form>
        <div className="md:w-3/4 md:mx-auto">
          <Lists
            items={list}
            editItemHandler={editItem}
            removeItemHandler={removeItem}
          ></Lists>
        </div>
        {list.length > 0 && (
          <div className="md:w-3/4 md:mx-auto">
            <button
              onClick={clearAll}
              className="bg-gray-200 text-red-600 shadow shadow-inner w-full px-4 py-1"
            >
              Delete all
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
