import React, { useState } from 'react';

const INIT_STATE = {
  id: 1,
  title: 'Task 1',
  status: false,
};

const Todo = () => {
  const [todo, setTodo] = useState([INIT_STATE]);

  //temp state
  const [newVal, setNewVal] = useState('');
  const [dataUpdate, setDataUpdate] = useState('');

  //add task
  const addTask = () => {
    let newId = todo.length + 1;
    setTodo([...todo, { id: newId, title: newVal, status: false }]);
    setNewVal('');
    // console.log(todo);
  };

  //delete task
  const deleteTask = (id) => {
    // if (todo.id === id) {
    //   todo.filter((task) => task.id !== id);
    // }
    // let newEntry = todo.filter((task) => task.id !== id);
    setTodo(todo.filter((task) => task.id !== id));
  };

  //mark done
  const markDone = (id) => {
    setTodo(
      todo.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  //cancel update
  const cancelUpdate = () => {
    setDataUpdate('');
  };

  //data holder
  const dataHolder = (e) => {
    setDataUpdate({
      ...dataUpdate,
      title: e.target.value,
    });
  };

  //update data
  const editedData = () => {
    let removeItem = [...todo].filter((task) => task.id !== dataUpdate.id);
    setTodo([...removeItem, dataUpdate]);
    setDataUpdate('');
  };

  return (
    <div>
      <div className="container my-3">
        <input
          className="form-control-lg"
          value={dataUpdate && dataUpdate.title}
          onChange={(e) => dataHolder(e)}
        />
        <button className="btn btn-success ms-3" onClick={editedData}>
          Update
        </button>
        <button className="btn btn-warning ms-3" onClick={cancelUpdate}>
          Cancel
        </button>
      </div>
      <div className="container">
        <input
          className="form-control-lg"
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
        />
        <button className="btn btn-primary ms-3" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div className="container">
        {todo && todo.length ? '' : 'No Tasks...'}

        {todo &&
          todo
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((task, index) => {
              return (
                <div
                  className="d-flex align-items-center justify-content-center p-2"
                  key={task.id}
                >
                  <span
                    className={`text-light ${
                      task.status
                        ? 'text-decoration-line-through'
                        : 'text-decoration-none'
                    }`}
                  >
                    {index + 1}. {task.title}{' '}
                  </span>
                  <button
                    className="btn bg-success p-1 m-1"
                    onClick={() => markDone(task.id)}
                  >
                    done
                  </button>
                  <button
                    className="btn bg-primary p-1 m-1"
                    onClick={() => setDataUpdate(task)}
                  >
                    edit
                  </button>
                  <button
                    className="btn bg-danger p-1 m-1"
                    onClick={() => deleteTask(task.id)}
                  >
                    delete
                  </button>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Todo;
