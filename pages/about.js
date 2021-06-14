import React from "react";
import Head from "next/head";
import {
  Grid,
  Typography,
  Avatar,
  useMediaQuery,
  Hidden,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";

import CallToAction from "../src/ui/CallToAction";

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    paddingLeft: "5em",
    paddingRight: "5em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1.5em",
      paddingRight: "1.5em",
    },
  },
  missionStatement: {
    fontStyle: "italic",
    fontWeight: 300,
    fontSize: "1.5rem",
    maxWidth: "50em",
    lineHeight: 1.4,
  },
  avatar: {
    height: "25em",
    width: "25em",
    [theme.breakpoints.down("sm")]: {
      height: "20em",
      width: "20em",
      maxHeight: 300,
      maxWidth: 300,
    },
  },
}));

export default function AboutUsPage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container direction="column">
      <Head>
        <title key="title">About Us - History & Team | Arc Development</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          key="description"
          content="We provide the fastest, most modern, affordable, and aesthetic software design and development services in the Midwest. Get a free online estimate now!"
        />
        <meta
          property="og:title"
          content="Bringing West Coast Technology to the Midwest | About Us"
          key="og:title"
        />
        <meta
          property="og:url"
          content="https://arcsoftwaredevelopment.com/about"
          key="og:url"
        />
        <link
          href="https://arcsoftwaredevelopment.com/about"
          rel="canonical"
          key="canonical"
        />
      </Head>
      <Grid
        item
        className={classes.rowContainer}
        style={{ marginTop: matchesMD ? "1em" : "2em" }}
      >
        <Typography
          variant="h1"
          gutterBottom
          align={matchesMD ? "center" : undefined}
        >
          About Us
        </Typography>
      </Grid>
      <Grid
        item
        container
        justify="center"
        className={classes.rowContainer}
        style={{ marginTop: "3em" }}
      >
        <Typography
          variant="h4"
          align="center"
          className={classes.missionStatement}
        >
          Whether it be person to person, business to consumer, or an individual
          to their interests, technology is meant to bring us closer to what we
          care about in the best way possible. Arc Development will use that
          principle to provide fast, modern, inexpensive, and aesthetic software
          to the Midwest and beyond.
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction={matchesMD ? "column" : "row"}
        className={classes.rowContainer}
        justify="space-around"
        alignItems={matchesMD ? "center" : undefined}
        style={{ marginTop: "10em", marginBottom: "10em" }}
      >
        <Grid item>
          <Grid
            lg
            item
            container
            direction="column"
            style={{ maxWidth: "35em" }}
          >
            <Grid item>
              <Typography
                variant="h4"
                gutterBottom
                align={matchesMD ? "center" : undefined}
              >
                History
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                paragraph
                style={{ fontWeight: 700, fontStyle: "italic" }}
                align={matchesMD ? "center" : undefined}
              >
                We're the new kid on the block
              </Typography>
              <Typography
                variant="body1"
                paragraph
                align={matchesMD ? "center" : undefined}
              >
                Founded in 2019, we’re ready to get our hands on the world’s
                business problems.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                align={matchesMD ? "center" : undefined}
              >
                It all started with one question: Why aren’t all businesses
                using available technology? There are many different answers to
                that question: economic barriers, social barriers, educational
                barriers, and sometimes institutional barriers.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                align={matchesMD ? "center" : undefined}
              >
                We aim to be a powerful force in overcoming these obstacles.
                Recent developments in software engineering and computing power,
                compounded by the proliferation of smart phones, has opened up
                infinite worlds of possibility. Things that have always been
                done by hand can now be done digitally and automatically, and
                completely new methods of interaction are created daily. Taking
                full advantage of these advancements is the name of the game.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                align={matchesMD ? "center" : undefined}
              >
                All this change can be a lot to keep up with, and that’s where
                we come in.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid lg item container justify="center">
            <img
              src="/assets/history.svg"
              alt="Quilt pen over open book"
              style={{ maxHeight: matchesMD ? 200 : "22em" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        className={classes.rowContainer}
        alignItems="center"
        style={{ marginBottom: "15em" }}
      >
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Team
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" paragraph align="center">
            Zachary Reece, Founder
          </Typography>
          <Typography variant="body1" paragraph align="center">
            I started coding when I was 9 years old.
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            alt="founder"
            src="/assets/founder.jpg"
            className={classes.avatar}
          />
        </Grid>
        <Grid item container justify={matchesMD ? "center" : undefined}>
          <Hidden lgUp>
            <Grid lg item style={{ maxWidth: "45em", padding: "1.25em" }}>
              <Typography variant="body1" paragraph align="center">
                I taught myself basic coding from a library book in third grade,
                and ever since then my passion has solely been set on learning —
                learning about computers, learning mathematics and philosophy,
                studying design, always just learning.
              </Typography>
              <Typography variant="body1" paragraph align="center">
                Now I’m ready to apply everything I’ve learned, and to help
                others with the intuition I have developed. I'm currently
                teaching a course about building responsive modern user
                interfaces on Udemy.com as well as beginning work on my first
                machine learning mobile application.
              </Typography>
            </Grid>
          </Hidden>
          <Grid
            lg
            item
            container
            direction="column"
            alignItems={matchesMD ? "center" : undefined}
            style={{ marginBottom: matchesMD ? "2.5em" : 0 }}
          >
            <Grid item>
              <img
                src="/assets/yearbook.svg"
                alt="yearbook page about founder"
                style={{ maxWidth: matchesMD ? 300 : undefined }}
              />
            </Grid>
            <Grid item>
              <Typography variant="caption">
                a page from my Sophmore yearbook
              </Typography>
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid lg item style={{ maxWidth: "45em", padding: "1.25em" }}>
              <Typography variant="body1" paragraph align="center">
                I taught myself basic coding from a library book in third grade,
                and ever since then my passion has solely been set on learning —
                learning about computers, learning mathematics and philosophy,
                studying design, always just learning.
              </Typography>
              <Typography variant="body1" paragraph align="center">
                Now I’m ready to apply everything I’ve learned, and to help
                others with the intuition I have developed. I'm currently
                teaching a course about building responsive modern user
                interfaces on Udemy.com as well as beginning work on my first
                machine learning mobile application.
              </Typography>
            </Grid>
          </Hidden>
          <Grid
            lg
            item
            container
            direction="column"
            alignItems={matchesMD ? "center" : "flex-end"}
          >
            <Grid item>
              <img
                src="/assets/puppy.svg"
                alt="Grey spotted puppy"
                style={{ maxWidth: matchesMD ? 300 : undefined }}
              />
            </Grid>
            <Grid item>
              <Typography variant="caption">
                My miniature dapple dachshund, Sterling
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <CallToAction setValue={props.setValue} />
      </Grid>
    </Grid>
  );
}
