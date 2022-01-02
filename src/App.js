import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    console.log("action.payload: ", action.payload);
    return [...state, action.payload];
  }

  console.log("action.payload: ", action.payload);

  return state;
}

function App() {
  const [taskText, setTaskText] = React.useState("");
  const [completedTask, setCompletedTask] = React.useState(false);

  const [state, dispatch] = React.useReducer(reducer, [
    {
      id: 1,
      text: "Задача1",
      completed: true,
    },
    {
      id: 2,
      text: "Задача2",
      completed: false,
    },
  ]);

  const addTaskDispatch = (taskText, completedTask) => {
    if (!taskText) return;

    const id = state.length + 1;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id,
        text: taskText,
        completed: completedTask,
      },
    });

    setTaskText("");
    setCompletedTask(false);
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onClickAdd={() => addTaskDispatch(taskText, completedTask)}
          setCompletedTask={setCompletedTask}
          setTaskText={setTaskText}
          taskText={taskText}
          completedTask={completedTask}
        />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item key={obj.id} text={obj.text} completed={obj.completed} />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
