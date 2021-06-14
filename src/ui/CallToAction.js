import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import ButtonArrow from "./ButtonArrow";
import Link from "../Link";

const useStyles = makeStyles((theme) => ({
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  background: {
    backgroundImage: `url("assets/background.jpg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url("assets/mobileBackground.jpg")`,
      backgroundAttachment: "inherit",
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 80,
    width: 205,
    backgroundColor: theme.palette.common.orange,
    marginRight: "5em",
    marginLeft: "2em",

    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: 0,
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export default function CallToAction(props) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      direction={matchesSM ? "column" : "row"}
      style={{ height: "60em" }}
      alignItems="center"
      className={classes.background}
      justify={matchesSM ? "center" : "space-between"}
    >
      <Grid
        item
        style={{
          marginLeft: matchesSM ? 0 : "5em",
          textAlign: matchesSM ? "center" : "inherit",
        }}
      >
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1">
              Simple Software.
              <br />
              Revolutionary Results.
            </Typography>
            <Typography variant="subtitle2" style={{ fontSize: "1.5rem" }}>
              Take advantage of the 21st Century.
            </Typography>
            <Grid container item justify={matchesSM ? "center" : undefined}>
              <Button
                variant="outlined"
                className={classes.learnButton}
                component={Link}
                href="/revolution"
                onClick={() => props.setValue(2)}
              >
                <span style={{ marginRight: 5 }}>Learn More</span>
                <ButtonArrow
                  width={10}
                  height={10}
                  fill={theme.palette.common.blue}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Button
              variant="contained"
              className={classes.estimateButton}
              component={Link}
              href="/estimate"
              onClick={() => props.setValue(false)}
            >
              Free Estimate
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
