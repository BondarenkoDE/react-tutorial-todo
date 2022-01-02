import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return [...state, action.payload];
  }

  if (action.type === "DELETE_TASK") {
    const filteredState = state.filter(({ id }) => id !== action.payload);

    return filteredState;
  }

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

  const deleteTaskDispatch = (id) => {
    const question = window.confirm("Вы точно хотите удалить данную задачу?");

    if (question) {
      dispatch({
        type: "DELETE_TASK",
        payload: id,
      });
    }
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
            <Item
              key={obj.id}
              id={obj.id}
              text={obj.text}
              completed={obj.completed}
              deleteTask={deleteTaskDispatch}
            />
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
