import {
  Grid,
  Typography,
  Button,
  TextField,
  useMediaQuery,
  Dialog,
  DialogContent,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import Head from "next/head";

import Link from "../src/Link";
import ButtonArrow from "../src/ui/ButtonArrow";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url("/assets/background.jpg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "60em",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url("/assets/mobileBackground.jpg")`,
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

    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      marginRight: 0,
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
  },
  message: {
    marginTop: "5em",
    border: `2px solid ${theme.palette.common.blue}`,
    borderRadius: 5,
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: "1rem",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
}));

export default function ContactPage(props) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [emailHelper, setEmailHelper] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    let valid;
    switch (event.target.id) {
      case "email":
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );
        if (!valid) {
          setEmailHelper("Invalid email");
        } else {
          setEmailHelper("");
        }
        break;
      case "phone":
        valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
          event.target.value
        );
        if (!valid) {
          setPhoneHelper("Invalid phone");
        } else {
          setPhoneHelper("");
        }
        break;
      default:
        break;
    }
  };

  const onConfirm = () => {
    setLoading(true);
    const url =
      "https://us-central1-material-ui-course-8afe8.cloudfunctions.net/sendMail";
    axios
      .get(url, {
        params: values,
      })
      .then((response) => {
        setLoading(false);
        setOpen(false);
        setValues({ name: "", email: "", phone: "", message: "" });
        setPhoneHelper("");
        setEmailHelper("");
        setAlert({
          open: true,
          message: "Message sent successfully",
          backgroundColor: "#4BB543",
        });
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          open: true,
          message: "Something went wrong, please try again!",
          backgroundColor: "#FF3232",
        });
      });
  };

  const buttonContents = (
    <React.Fragment>
      Send message
      <img
        src="/assets/send.svg"
        alt="paper airplane"
        style={{ marginLeft: "1em" }}
      />
    </React.Fragment>
  );

  return (
    <Grid item container direction="row">
      <Head>
        <title key="title">Contact Us | Arc Development</title>
        <meta
          name="description"
          key="description"
          content="Let us guide you through the custom software design and development process. Send us a message with any of your ideas or questions to get started!"
        />
        <meta
          property="og:title"
          content="Bringing West Coast Technology to the Midwest | Contact Us"
          key="og:title"
        />
        <meta
          property="og:url"
          content="https://arcsoftwaredevelopment.com/contact"
          key="og:url"
        />
        <link
          href="https://arcsoftwaredevelopment.com/contact"
          rel="canonical"
          key="canonical"
        />
      </Head>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        lg={4}
        xl={3}
        style={{
          marginBottom: matchesMD ? "5em" : 0,
          marginTop: matchesSM ? "1em" : matchesMD ? "5em" : 0,
        }}
      >
        <Grid item>
          <Grid item container direction="column">
            {/*-----Contact Us form section------*/}
            <Grid item>
              <Typography
                align={matchesMD ? "center" : undefined}
                variant="h2"
                style={{ lineHeight: 1 }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="body1"
                align={matchesMD ? "center" : undefined}
                style={{ color: theme.palette.common.blue }}
              >
                We're waiting.
              </Typography>
            </Grid>
            <Grid item container style={{ marginTop: "2em" }}>
              <Grid item>
                <img
                  src="/assets/phone.svg"
                  alt="phone"
                  style={{ marginRight: "0.5em" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                >
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    href="tel:5555555555"
                  >
                    (555) 555-5555
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{ marginBottom: "2em" }}>
              <Grid item>
                <img
                  src="/assets/email.svg"
                  alt="envelope"
                  style={{ marginRight: "0.5em", verticalAlign: "bottom" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                >
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    href="mailto:khalid.n.mohamed@outlook.com"
                  >
                    Khalid.N.Mohamed@outlook.com
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column" style={{ width: "20em" }}>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  id="name"
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  error={emailHelper.length !== 0}
                  helperText={emailHelper}
                  value={values.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  id="phone"
                  label="Phone"
                  name="phone"
                  error={phoneHelper.length !== 0}
                  helperText={phoneHelper}
                  value={values.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item style={{ width: "20em" }}>
              <TextField
                id="message"
                name="message"
                multiline
                rows={10}
                value={values.message}
                onChange={handleChange}
                className={classes.message}
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </Grid>
            <Grid item container justify="center" style={{ marginTop: "2em" }}>
              <Button
                disabled={
                  values.name.length === 0 ||
                  values.message.length === 0 ||
                  values.phone.length === 0 ||
                  values.email.length === 0 ||
                  phoneHelper.length !== 0 ||
                  emailHelper.length !== 0
                }
                variant="contained"
                className={classes.sendButton}
                onClick={() => setOpen(true)}
              >
                {buttonContents}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        style={{ zIndex: 1302 }}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            padding: matchesXS
              ? "0 1em"
              : matchesSM
              ? "5em 5em"
              : matchesMD
              ? "5em 15em"
              : "5em 25em",
          },
        }}
        fullScreen={matchesSM}
      >
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4" gutterBottom align="center">
                Confirm Message
              </Typography>
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                id="name"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                id="email"
                label="Email"
                name="email"
                error={emailHelper.length !== 0}
                helperText={emailHelper}
                value={values.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                id="phone"
                label="Phone"
                name="phone"
                error={phoneHelper.length !== 0}
                helperText={phoneHelper}
                value={values.phone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item style={{ width: matchesSM ? "100%" : "20em" }}>
            <TextField
              id="message"
              name="message"
              multiline
              rows={10}
              value={values.message}
              onChange={handleChange}
              className={classes.message}
              InputProps={{ disableUnderline: true }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            container
            direction={matchesSM ? "column" : "row"}
            style={{ marginTop: "2em" }}
            alignItems="center"
          >
            <Grid item>
              <Button
                color="primary"
                onClick={() => setOpen(false)}
                style={{ fontWeight: 300 }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={
                  values.name.length === 0 ||
                  values.message.length === 0 ||
                  values.phone.length === 0 ||
                  values.email.length === 0 ||
                  phoneHelper.length !== 0 ||
                  emailHelper.length !== 0
                }
                variant="contained"
                className={classes.sendButton}
                onClick={onConfirm}
              >
                {loading ? <CircularProgress size={30} /> : buttonContents}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <Grid
        item
        container
        direction={matchesMD ? "column" : "row"}
        className={classes.background}
        lg={8}
        xl={9}
        alignItems="center"
        justify={matchesMD ? "center" : undefined}
      >
        <Grid
          item
          style={{
            marginLeft: matchesMD ? 0 : "3em",
            textAlign: matchesMD ? "center" : "inherit",
          }}
        >
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h2" align={matchesMD ? "center" : undefined}>
                Simple Software.
                <br />
                Revolutionary Results.
              </Typography>
              <Typography
                variant="subtitle2"
                style={{ fontSize: "1.5rem" }}
                align={matchesMD ? "center" : undefined}
              >
                Take advantage of the 21st Century.
              </Typography>
              <Grid container item justify={matchesMD ? "center" : undefined}>
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
    </Grid>
  );
}
