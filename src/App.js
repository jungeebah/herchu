import React, { useState } from "react";
import Header from "./components/Header/Header";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Body from "./components/Body/Body";
import { movie } from "./data";

const useStyles = makeStyles(() => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
}));

const App = () => {
  const [data, setData] = React.useState(movie);
  const [individualMovie, setIndividual] = React.useState([]);
  const [title, setTitle] = React.useState("Home");
  const [displayBody, setDisplayBody] = React.useState(true);

  const changeBody = (event, data) => {
    const individual = movie.filter((x) => x.name === data);
    setIndividual(individual);
    setDisplayBody(false);
  };
  const searchFilter = (name, type) => {
    if (type !== "Movie") {
      const searchFiltered = movie.filter((item) =>
        item.actor.map((actor) => actor.name.includes(name)).includes(true)
      );
      setData(searchFiltered);
    } else {
      const searchFiltered = movie.filter((item) => item.name === name);
      setData(searchFiltered);
    }
    setDisplayBody(true);
    setTitle("Result");
  };
  const changeTitle = (title) => {
    if (title === "Home") {
      const movieFiltered = movie;
      setData(movieFiltered);
    } else {
      const movieFiltered = movie.filter((item) =>
        item.playing.includes(title.toLowerCase())
      );
      setData(movieFiltered);
    }
    setDisplayBody(true);
    setTitle(title);
  };
  const [mobileDrawer, setMobileDrawer] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileDrawer(open);
  };
  const dark = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const light = createMuiTheme({
    palette: {
      common: {
        black: "#000",
        white: "#fff",
      },
      background: {
        paper: "#fff",
        default: "#fafafa",
      },
      primary: {
        light: "#7986cb",
        main: "rgba(74, 144, 226, 1)",
        dark: "rgba(29, 29, 32, 1)",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff4081",
        main: "rgba(80, 227, 194, 1)",
        dark: "#c51162",
        contrastText: "#fff",
      },
      error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff",
      },
      text: {
        primary: "rgba(0, 0, 0, 1)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
    },
  });
  const [darkTheme, setDarkTheme] = useState(false);

  const classes = useStyles();
  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
  };
  return (
    <ThemeProvider theme={darkTheme ? dark : light}>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Header
            handleChangeTheme={handleChangeTheme}
            theme={darkTheme}
            toggleDrawer={toggleDrawer}
            searchFilter={searchFilter}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" square>
            <Body
              changeBody={changeBody}
              individualMovie={individualMovie}
              displayBody={displayBody}
              data={data}
              title={title}
              changeTitle={changeTitle}
              mobileDrawer={mobileDrawer}
              toggleDrawer={toggleDrawer}
              searchFilter={searchFilter}
            />
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
