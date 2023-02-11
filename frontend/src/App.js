import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import { AddForm } from "./components/AddForm";
import { ListArea } from "./components/ListArea";
import { useState, useEffect } from "react";
import {
  deleteServerTask,
  fetchTask,
  postTask,
  switchServerTask,
} from "./helpers/axiosHelper";
const wklyHr = 7 * 24;
function App() {
  const [taskList, setTaskList] = useState([]);
  const [ids, setIds] = useState([]);
  const getTaskFromServer = async () => {
    const data = await fetchTask();
    data.status === "success" && setTaskList(data.result);
  };
  useEffect(() => {
    getTaskFromServer();
  }, []);

  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);
  const addTask = async (task) => {
    if (total + +task.hr > wklyHr) {
      return alert("Sorry mate, you don't have enough time to fit this task");
    }
    const result = await postTask(task);
    result.status === "success" && getTaskFromServer();
  };
  const switchTask = async (_id, type) => {
    const data = await switchServerTask({ _id, type });

    data.status === "success" && getTaskFromServer();
  };
  const handleOnCheck = (e) => {
    const { checked, value } = e.target;

    if (value === "entry" || value === "bad") {
      // if ticked add all ids in ids  otherwise take them out.
      // add all entry list ids
      let toDeleteIds = [];
      taskList.forEach((item) => {
        if (item.type === value) {
          toDeleteIds.push(item._id);
        }
      });
      if (checked) {
        setIds([...ids, ...toDeleteIds]);
      } else {
        // remove all list ids
        const tempArgs = ids.filter((id) => !toDeleteIds.includes(id));
        setIds([...tempArgs]);
      }
      return;
    }
    if (checked) {
      // add individual id
      setIds([...ids, value]);
    } else {
      // remove individual id
      const filteredArg = ids.filter((id) => id !== value);
      setIds(filteredArg);
    }
  };
  console.log(ids);
  const handleOnDelete = async () => {
    if (!window.confirm("Are you sure, you want to delete the selected item")) {
      return;
    }
    const data = await deleteServerTask(ids);
    if (data.status === "success") {
      getTaskFromServer();
      setIds([]);
    }
  };
  return (
    <div className="wrapper">
      <Container>
        <div className="text-center">
          <h1 className="mb-3 pt-3">My Not to do list</h1>
          <AddForm addTask={addTask}></AddForm>
        </div>
        <hr className="formHr" />

        <ListArea
          ids={ids}
          taskList={taskList}
          switchTask={switchTask}
          handleOnCheck={handleOnCheck}
        ></ListArea>
        {ids.length > 0 && (
          <Button variant="danger" className="mt-2" onClick={handleOnDelete}>
            Delete selected tasks
          </Button>
        )}
      </Container>
    </div>
  );
}

export default App;
