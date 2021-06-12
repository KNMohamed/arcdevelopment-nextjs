import React from "react";
import { makeStyles, Grid, Hidden } from "@material-ui/core";

import Link from "../Link";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "relative",
    width: "100%",
    backgroundColor: theme.palette.common.blue,
    zIndex: 1302,
  },
  adornment: {
    verticalAlign: "bottom",
    width: "25em",
    [theme.breakpoints.down("md")]: {
      width: "21em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em",
    },
  },
  mainContainer: {
    position: "absolute",
    justifyContent: "center",
  },
  link: {
    color: theme.palette.common.white,
    fontFamily: "arial",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  gridItem: {
    margin: "3em",
  },
  socialContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    justifyContent: "flex-end",
    margin: "0 1em 1em 0",
  },
  icon: {
    height: "3em",
    width: "3em",
    [theme.breakpoints.down("xs")]: {
      height: "2.5em",
      width: "2.5em",
    },
    color: theme.palette.common.white,
  },
}));
export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid container className={classes.mainContainer}>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(0)}
                href="/"
                className={classes.link}
              >
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(1)}
                href="/services"
                className={classes.link}
              >
                Services
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(0);
                }}
                href="/customsoftware"
                className={classes.link}
              >
                Custom Software Development
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(1);
                }}
                href="/mobileapps"
                className={classes.link}
              >
                IOS/Android app development
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => {
                  props.setValue(1);
                  props.setSelectedIndex(2);
                }}
                href="/websites"
                className={classes.link}
              >
                Website Development
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                href="/revolution"
                className={classes.link}
              >
                The Revolution
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                href="/revolution"
                className={classes.link}
              >
                Vision
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                href="/revolution"
                className={classes.link}
              >
                Technology
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(2)}
                href="/revolution"
                className={classes.link}
              >
                Process
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(3)}
                href="/about"
                className={classes.link}
              >
                About us
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(3)}
                href="/about"
                className={classes.link}
              >
                History
              </Grid>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(3)}
                href="/about"
                className={classes.link}
              >
                Team
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                component={Link}
                onClick={() => props.setValue(4)}
                href="/contact"
                className={classes.link}
              >
                Contact Us
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <img
        src="/assets/footerAdornment.svg"
        alt="footer adornment"
        className={classes.adornment}
      />
      <Grid container className={classes.socialContainer} spacing={3}>
        <Grid
          item
          component={"a"}
          href="https://www.facebook.com"
          rel="noopener noreffer"
          target="_blank"
        >
          <img src="/assets/facebook.svg" alt="facebook icon" className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.twitter.com"
          rel="noopennr  noreffer"
          target="_blank"
        >
          <img src="/assets/twitter.svg" alt="twitter icon" className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.instagram.com"
          rel="noopenernoreffer"
          target="_blank"
        >
          <img src="/assets/instagram.svg" alt="instagram icon" className={classes.icon} />
        </Grid>
      </Grid>
    </footer>
  );
}
