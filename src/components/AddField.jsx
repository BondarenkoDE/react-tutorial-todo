import {
  TextField,
  Button,
  Checkbox,
  getCircularProgressUtilityClass,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = ({
  onClickAdd,
  setCompletedTask,
  setTaskText,
  taskText,
  completedTask,
}) => {
  const handleChangeCompletedTask = (e) => {
    setCompletedTask(e.target.checked);
  };

  const handleChangeTextTask = (e) => {
    setTaskText(e.target.value);
  };

  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={completedTask}
        onChange={handleChangeCompletedTask}
      />
      <TextField
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
        value={taskText}
        onChange={handleChangeTextTask}
      />
      <Button onClick={onClickAdd}>
        <AddIcon />
      </Button>
    </div>
  );
};
