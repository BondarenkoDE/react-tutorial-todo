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

  if (action.type === "TOGGLE_COMPLETED") {
    return state.map((obj) => {
      if (obj.id === action.payload) {
        return {
          ...obj,
          completed: !obj.completed,
        };
      } else {
        return obj;
      }
    });
  }

  if (action.type === "DELETE_ALL_TASKS") {
    return [];
  }

  if (action.type === "SELECT_ALL_TASKS") {
    return state.map((obj) => {
      if (action.payload === false) {
        return {
          ...obj,
          completed: true,
        };
      } else {
        return {
          ...obj,
          completed: false,
        };
      }
    });
  }

  return state;
}

function App() {
  const [taskText, setTaskText] = React.useState("");
  const [completedTask, setCompletedTask] = React.useState(false);
  const [isSelectedAll, setIsSelectedAll] = React.useState(false);
  const [filterTasks, setFilterTasks] = React.useState(0);

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
    setIsSelectedAll(false);
  };

  const deleteTaskDispatch = (id) => {
    if (window.confirm("Вы точно хотите удалить данную задачу?")) {
      dispatch({
        type: "DELETE_TASK",
        payload: id,
      });
    }
  };

  const toggleCompleteDispatch = (id) => {
    dispatch({
      type: "TOGGLE_COMPLETED",
      payload: id,
    });
  };

  const deleteAllTasksDispatch = () => {
    if (window.confirm("Вы точно хотите удалить ВСЕ задачи?")) {
      dispatch({
        type: "DELETE_ALL_TASKS",
      });
    }
  };

  const selectAllTasksDispatch = () => {
    if (state.length !== 0) {
      dispatch({
        type: "SELECT_ALL_TASKS",
        payload: isSelectedAll,
      });

      setIsSelectedAll(!isSelectedAll);
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
        <Tabs value={filterTasks}>
          <Tab label="Все" onClick={() => setFilterTasks(0)} />
          <Tab label="Активные" onClick={() => setFilterTasks(1)} />
          <Tab label="Завершённые" onClick={() => setFilterTasks(2)} />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => {
            if (
              filterTasks === 0 ||
              (obj.completed === false && filterTasks === 1) ||
              (obj.completed === true && filterTasks === 2)
            ) {
              return (
                <Item
                  key={obj.id}
                  text={obj.text}
                  completed={obj.completed}
                  deleteTask={() => deleteTaskDispatch(obj.id)}
                  onClickCheckbox={() => toggleCompleteDispatch(obj.id)}
                />
              );
            }
          })}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={selectAllTasksDispatch}>
            {isSelectedAll ? "Снять отметки" : "Отметить всё"}
          </Button>
          <Button onClick={deleteAllTasksDispatch}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
