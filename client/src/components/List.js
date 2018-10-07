import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";
import ThemeProvider from "./Theme";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    minHeight: 350,
    border: "solid 2px rgba(0,0,0,0.2)",
    borderRadius: "5px",
    overflow: "hidden",
    position: "relative"
  },
  list: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: "-17px",
    overflowY: "scroll"
  },
  subHeader: {
    background: "#fff",
    borderBottom: "solid 0.5px rgba(0,0,0,0.3)"
  }
});

const CheckboxList = props => {
  const { classes, handleToggle, checked, categories } = props;

  return (
    <ThemeProvider>
      <div className={classes.root}>
        <List
          className={classes.list}
          subheader={
            <ListSubheader className={classes.subHeader}>
              Categories
            </ListSubheader>
          }
        >
          {categories.map(value => (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={() => handleToggle(value)}
              disableRipple
              className={classes.listItem}
            >
              <Checkbox
                color="primary"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText
                primary={value}
                style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </ThemeProvider>
  );
};

export default withStyles(styles)(CheckboxList);
