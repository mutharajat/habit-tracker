import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";
import { connect } from "react-redux";
import { addHabit } from "../state/actions";

type AddHabitProps = {
  open: boolean;
  handleClose: () => void;
  addHabit: (habit: string, repeat: number, time: Date) => void;
};

const AddHabit: React.FC<AddHabitProps> = (props) => {
  const { open, handleClose, addHabit } = props;
  const [repeat, setRepeat] = React.useState(1);
  const [time, setTime] = React.useState<Date | null>(new Date());
  const [habitTitle, setHabitTitle] = React.useState("");

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitTitle(event.target.value);
  };

  const handleRepeatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRepeat(event.target.value as number);
  };

  const handleTimeChange = (date: Date | null) => {
    setTime(date);
  };

  const isValid = () => {
    return repeat && time && habitTitle !== "";
  };

  const handleSubmit = () => {
    addHabit(habitTitle, repeat, time!);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Add Habit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please describe the habit you want to build, along with the time and
          weekly frequency.
        </DialogContentText>
        <Grid container direction="column">
          <Grid item>
            <TextField
              autoFocus
              required
              margin="dense"
              id="habit"
              label="Habit"
              type="text"
              fullWidth
              value={habitTitle}
              onChange={handleTitle}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="repeat-label">Repeat</InputLabel>
              <Select id="repeat" value={repeat} onChange={handleRepeatChange}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
              </Select>
              <FormHelperText>time(s) per week</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                fullWidth
                margin="normal"
                id="time-picker"
                label="Time"
                value={time}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!isValid()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(null, { addHabit })(AddHabit);
