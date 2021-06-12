import React from "react";
import Head from "next/head";
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import Link from "../src/Link";
import ButtonArrow from "../src/ui/ButtonArrow";

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
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "10em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
}));
export default function ServicePage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container direction="column">
      <Head>
        <title key="title">
          Top Custom Software Development Services | Arc Development
        </title>
        <meta
          name="description"
          key="description"
          content="Cutting-edge software, mobile app, and website development services with sleek custom designs - get a free online estimate instantly!"
        />
        <meta
          property="og:title"
          content="Bringing West Coast Technology to the Midwest | Services"
          key="og:title"
        />
        <meta
          property="og:url"
          content="https://arcsoftwaredevelopment.com/services"
          key="og:url"
        />
        <link
          href="https://arcsoftwaredevelopment.com/services"
          rel="canonical"
          key="canonical"
        />
      </Head>
      <Grid
        item
        style={{
          marginLeft: matchesSM ? 0 : "5em",
          marginTop: matchesSM ? "1em" : "2em",
        }}
      >
        <Typography
          variant="h2"
          align={matchesSM ? "center" : undefined}
          gutterBottom
        >
          Services
        </Typography>
      </Grid>
      <Grid item>
        {/*-----IOS/Android Block-----*/}
        <Grid
          container
          direction="row"
          className={classes.serviceContainer}
          justify={matchesSM ? "center" : "flex-end"}
          style={{ marginTop: matchesSM ? "1em" : "5em" }}
        >
          <Grid
            item
            style={{
              textAlign: matchesSM ? "center" : undefined,
              width: matchesSM ? undefined : "35em",
            }}
          >
            <Typography variant="h4" color="primary">
              IOS/Android Development
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Extend functionality. Extend access. Increase Engagement.
            </Typography>
            <Typography variant="subtitle1">
              Integrate your web experience or create a standalone app
              {matchesSM ? null : <br />}with either mobile platform.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              className={classes.learnButton}
              component={Link}
              href="/mobileapps"
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(2);
              }}
            >
              <span style={{ marginRight: 10 }}>Learn More</span>
              <ButtonArrow
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item style={{ marginRight: matchesSM ? "0" : "5em" }}>
            <img
              src="/assets/mobileIcon.svg"
              alt="mobile phone icons"
              className={classes.icon}
              width="250em"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {/*-----Services Block-----*/}
        <Grid
          container
          direction="row"
          className={classes.serviceContainer}
          justify={matchesSM ? "center" : undefined}
        >
          <Grid
            item
            style={{
              marginLeft: matchesSM ? "0" : "5em",
              textAlign: matchesSM ? "center" : undefined,
            }}
          >
            <Typography variant="h4" color="primary">
              Custom Software Development
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Save enery, Save time, Save Money.
            </Typography>
            <Typography variant="subtitle1">
              Complete digital solutions, from investigation to
              <span className={classes.specialText}>celebration</span>.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              className={classes.learnButton}
              component={Link}
              href="/customsoftware"
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(1);
              }}
            >
              <span style={{ marginRight: 10 }}>Learn More</span>
              <ButtonArrow
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item>
            <img
              src="/assets/customSoftware.svg"
              alt="custom software icon"
              className={classes.icon}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {/*-----Website Block-----*/}
        <Grid
          container
          direction="row"
          className={classes.serviceContainer}
          style={{ marginBottom: "10em" }}
          justify={matchesSM ? "center" : "flex-end"}
        >
          <Grid
            item
            style={{
              textAlign: matchesSM ? "center" : undefined,
              width: matchesSM ? undefined : "35em",
            }}
          >
            <Typography variant="h4" color="primary">
              Website Development
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Reach more. Discover more. Sell more.
            </Typography>
            <Typography variant="subtitle1">
              Optimized for Search Engines, built for speed
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              className={classes.learnButton}
              component={Link}
              href="/websites"
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(3);
              }}
            >
              <span style={{ marginRight: 10 }}>Learn More</span>
              <ButtonArrow
                width={10}
                height={10}
                fill={theme.palette.common.blue}
              />
            </Button>
          </Grid>
          <Grid item style={{ marginRight: matchesSM ? 0 : "5em" }}>
            <img
              src="/assets/websiteIcon.svg"
              alt="website icon"
              className={classes.icon}
              width="250em"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
