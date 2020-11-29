import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Star as StarIcon,
} from "@material-ui/icons";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { fetchHabits, toggleHabitDay } from "../state/actions";
import AddHabit from "./AddHabit";

const HabitStatus: React.FC<{ done: boolean; toggleable: boolean }> = (
  props
) => {
  if (props.done) {
    return (
      <CheckIcon
        style={{
          color: green[500],
          cursor: props.toggleable ? "pointer" : "not-allowed",
        }}
      />
    );
  } else {
    return (
      <ClearIcon
        style={{
          color: props.toggleable ? grey[500] : grey[300],
          cursor: props.toggleable ? "pointer" : "not-allowed",
        }}
      />
    );
  }
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

type HabitListProps = {
  fetchHabits: () => void;
  toggleHabitDay: (id: string, day: HabitDay) => void;
  habits: HabitData[];
};

const HabitList: React.FC<HabitListProps> = (props) => {
  const { fetchHabits, toggleHabitDay } = props;
  React.useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const [openModal, setOpenModal] = React.useState(false);

  const classes = useStyles();

  const renderStatus = (
    row: HabitData,
    rowIndex: number,
    column: any,
    id: string | number
  ) => {
    const selector = column.selector as HabitDay;
    const completed = row[selector];
    const date = column.date as moment.Moment;
    const isToggleable = date.isSameOrBefore(moment());
    if (isToggleable) {
      return (
        <div
          onClick={() => {
            toggleHabitDay(row.id, selector);
          }}
        >
          <HabitStatus done={completed} toggleable={isToggleable} />
        </div>
      );
    }
    return <HabitStatus done={completed} toggleable={isToggleable} />;
  };

  const generateDayColumns = () => {
    const columns = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().startOf("week").add(i, "days");
      columns.push({
        name: date.format("ddd DD"),
        selector: `day_${i + 1}`,
        cell: renderStatus,
        date,
      });
    }
    return columns;
  };

  const columns = [
    {
      name: "Habit",
      selector: "habit",
      sortable: true,
      cell: (row: HabitData) => {
        if (row.reward) {
          return (
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item style={{ color: "gold" }}>
                <StarIcon />
              </Grid>
              <Grid item>{row.habit}</Grid>
            </Grid>
          );
        }
        return row.habit;
      },
    },
    ...generateDayColumns(),
  ];
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container justify="space-between" alignItems="center">
            <h1>Habit Tracker</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
            >
              Add New
            </Button>
            <AddHabit
              open={openModal}
              handleClose={() => setOpenModal(false)}
            />
          </Grid>
        </Grid>
        <Grid item>
          <DataTable noHeader columns={columns} data={props.habits} />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: ReduxStore) => {
  return {
    habits: Object.values(state.habits),
  };
};

export default connect(mapStateToProps, { fetchHabits, toggleHabitDay })(
  HabitList
);
