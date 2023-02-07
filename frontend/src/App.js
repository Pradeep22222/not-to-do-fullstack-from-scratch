import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import { AddForm } from "./components/AddForm";
import { ListArea } from "./components/ListArea";
import { useState } from "react";
const wklyHr = 7 * 24;
function App() {
  const [taskList, setTaskList] = useState([]);
  const [ids, setIds] = useState([]);
  const total=taskList.reduce((acc, item)=>acc + +item.hr, 0)
  const addTask = (task) => {
    if (total + +task.hr > wklyHr) {
  return alert("Sorry mate, you don't have enough time to fit this task")
}
    setTaskList([...taskList, task]);
  };
  const switchTask = (id, type) => {
    const switchedArg = taskList.map((item, index) => {
      if (item.id === id) {
        item.type = type;
      }
      return item;
    });
    setTaskList(switchedArg);
  };
  const handleOnCheck = (e) => {
    const { checked, value,} = e.target;

    if (value === "entry" || value==="bad") {
      // if ticked add all ids in ids  otherwise take them out.
      // add all entry list ids
      let toDeleteIds = [];
      taskList.forEach((item) => {
        if (item.type === value) {
          toDeleteIds.push(item.id);
        }
      });
      if (checked) {
        setIds([...ids, ...toDeleteIds]);
      } else {
        // remove all list ids
        const tempArgs = ids.filter(id => !toDeleteIds.includes(id))
        setIds([...tempArgs]);
      } 
      return
    }
    if (checked) {
      // add individual id 
      setIds([...ids, value])
    }
    else {
      // remove individual id
      const filteredArg = ids.filter((id) => id !== value)
      setIds(filteredArg)
    }
  }
  console.log(ids);
  const handleOnDelete = () => {
    if(window.confirm("Are you sure, you want to delete the selected item")){const tempArg = taskList.filter((item) => !ids.includes(item.id));
    setTaskList(tempArg);
    setIds([]);}
    return;
  }
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
        {ids.length>0 && (
          <Button variant="danger" className="mt-2" onClick={handleOnDelete}>
            Delete selected tasks
          </Button>
        )}
      </Container>
    </div>
  );
}

export default App;
