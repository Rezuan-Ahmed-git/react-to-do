import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';

import Todo from './components/practice/Todo';

function App() {
  //Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);

  //Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //Add Task
  //////////////////////
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;

      // let newEntry = { id: num, title: newTask, status: false };
      // setToDo([...toDo, newEntry]);

      //refactored
      setToDo([...toDo, { id: num, title: newTask, status: false }]);

      setNewTask('');
    }
  };

  //Delete Task
  //////////////////////
  const deleteTask = (id) => {
    setToDo(toDo.filter((task) => task.id !== id));
  };

  //Mark task as done or completed
  ////////////////////////////////
  const markDone = (id) => {
    setToDo(
      toDo.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  //Cancel update
  ////////////////////////////////
  const cancelUpdate = () => {
    setUpdateData('');
  };

  //Change task for update
  ////////////////////////////////
  const changeTask = (e) => {
    setUpdateData({
      ...updateData,
      title: e.target.value,
    });
  };

  //Update Task
  ////////////////////////////////
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter((task) => task.id !== updateData.id);
    setToDo([...removeOldRecord, updateData]);

    setUpdateData('');
  };

  return (
    <div className="container App">
      <br />
      <br />
      <h2>To Do List App (ReactJS)</h2>
      <br />
      <br />
      {updateData && updateData ? (
        <UpdateForm
          cancelUpdate={cancelUpdate}
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
        />
      ) : (
        <AddTaskForm
          addTask={addTask}
          newTask={newTask}
          setNewTask={setNewTask}
        />
      )}

      {/* Display ToDos  */}

      {toDo && toDo.length ? '' : 'No Tasks...'}

      <ToDo
        deleteTask={deleteTask}
        markDone={markDone}
        setUpdateData={setUpdateData}
        toDo={toDo}
      />

      {/* <p>======================</p>
      <Todo /> */}
    </div>
  );
}

export default App;
