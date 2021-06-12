import React, { useState } from "react";
import Head from "next/head";

import axios from "axios";
import {
  Grid,
  Typography,
  useMediaQuery,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Hidden,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import Lottie from "react-lottie";
import { cloneDeep } from "lodash";

import estimateAnimation from "../src/animations/estimateAnimation/data.json";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "12em",
    height: "12em",
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    backgroundColor: theme.palette.common.orange,
    height: 50,
    width: 225,
    fontSize: "1.25rem",
    marginTop: "5em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  message: {
    marginTop: "3em",
    marginBottom: "2em",
    border: `2px solid ${theme.palette.common.blue}`,
    borderRadius: 5,
  },
  specialText: {
    fontFamily: "Raleway",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.palette.common.orange,
  },
}));

const defaultQuestions = [
  {
    id: 1,
    title: "Which service are you interested in?",
    active: true,
    options: [
      {
        id: 1,
        title: "Custom Software Development",
        subtitle: null,
        icon: "/assets/software.svg",
        iconAlt: "three floating screens",
        selected: false,
        cost: 0,
      },
      {
        id: 2,
        title: "iOS/Android App Development",
        subtitle: null,
        icon: "/assets/mobile.svg",
        iconAlt: "outlines of phones and tablets",
        selected: false,
        cost: 0,
      },
      {
        id: 3,
        title: "Website Development",
        subtitle: null,
        icon: "/assets/website.svg",
        iconAlt: "computer outline",
        selected: false,
        cost: 0,
      },
    ],
  },
];

const softwareQuestions = [
  {
    id: 1,
    title: "Which service are you interested in?",
    active: false,
    options: [
      {
        id: 1,
        title: "Custom Software Development",
        subtitle: null,
        icon: "/assets/software.svg",
        iconAlt: "three floating screens",
        selected: false,
        cost: 0,
      },
      {
        id: 2,
        title: "iOS/Android App Development",
        subtitle: null,
        icon: "/assets/mobile.svg",
        iconAlt: "outlines of phones and tablets",
        selected: false,
        cost: 0,
      },
      {
        id: 3,
        title: "Website Development",
        subtitle: null,
        icon: "/assets/website.svg",
        iconAlt: "computer outline",
        selected: false,
        cost: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Which platforms do you need supported?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Web Application",
        subtitle: null,
        icon: "/assets/website.svg",
        iconAlt: "computer outline",
        selected: false,
        cost: 1000,
      },
      {
        id: 2,
        title: "iOS Application",
        subtitle: null,
        icon: "/assets/iphone.svg",
        iconAlt: "outline of iphone",
        selected: false,
        cost: 1000,
      },
      {
        id: 3,
        title: "Android Application",
        subtitle: null,
        icon: "/assets/android.svg",
        iconAlt: "outlines of android phone",
        selected: false,
        cost: 1000,
      },
    ],
    active: true,
  },
  {
    id: 3,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Photo/Video",
        subtitle: null,
        icon: "/assets/camera.svg",
        iconAlt: "camera outline",
        selected: false,
        cost: 250,
      },
      {
        id: 2,
        title: "GPS",
        subtitle: null,
        icon: "/assets/gps.svg",
        iconAlt: "gps pin",
        selected: false,
        cost: 250,
      },
      {
        id: 3,
        title: "File Transfer",
        subtitle: null,
        icon: "/assets/upload.svg",
        iconAlt: "outline of cloud with arrow pointing up",
        selected: false,
        cost: 250,
      },
    ],
    active: false,
  },
  {
    id: 4,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Users/Authentication",
        subtitle: null,
        icon: "/assets/users.svg",
        iconAlt: "outline of a person with a plus sign",
        selected: false,
        cost: 250,
      },
      {
        id: 2,
        title: "Biometrics",
        subtitle: null,
        icon: "/assets/biometrics.svg",
        iconAlt: "fingerprint",
        selected: false,
        cost: 250,
      },
      {
        id: 3,
        title: "Push Notifications",
        subtitle: null,
        icon: "/assets/bell.svg",
        iconAlt: "outline of a bell",
        selected: false,
        cost: 250,
      },
    ],
    active: false,
  },
  {
    id: 5,
    title: "What type of custom features do you expect to need?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Low Complexity",
        subtitle: "(Informational)",
        icon: "/assets/info.svg",
        iconAlt: "'i' inside a circle",
        selected: false,
        cost: 250,
      },
      {
        id: 2,
        title: "Medium Complexity",
        subtitle: "(Interactive, Customizable, Realtime)",
        icon: "/assets/customized.svg",
        iconAlt: "two toggle switches",
        selected: false,
        cost: 500,
      },
      {
        id: 3,
        title: "High Complexity",
        subtitle: "(Data Modeling and Computation)",
        icon: "/assets/data.svg",
        iconAlt: "outline of line graph",
        selected: false,
        cost: 1000,
      },
    ],
    active: false,
  },
  {
    id: 6,
    title: "How many users do you expect?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "0-10",
        subtitle: null,
        icon: "/assets/person.svg",
        iconAlt: "person outline",
        selected: false,
        cost: 1,
      },
      {
        id: 2,
        title: "10-100",
        subtitle: null,
        icon: "/assets/persons.svg",
        iconAlt: "outline of two people",
        selected: false,
        cost: 1.125,
      },
      {
        id: 3,
        title: "100+",
        subtitle: null,
        icon: "/assets/people.svg",
        iconAlt: "outline of three people",
        selected: false,
        cost: 1.25,
      },
    ],
    active: false,
  },
];

const websiteQuestions = [
  {
    id: 1,
    title: "Which service are you interested in?",
    active: false,
    options: [
      {
        id: 1,
        title: "Custom Software Development",
        subtitle: null,
        icon: "/assets/software.svg",
        iconAlt: "three floating screens",
        selected: false,
        cost: 0,
      },
      {
        id: 2,
        title: "iOS/Android App Development",
        subtitle: null,
        icon: "/assets/mobile.svg",
        iconAlt: "outlines of phones and tablets",
        selected: false,
        cost: 0,
      },
      {
        id: 3,
        title: "Website Development",
        subtitle: null,
        icon: "/assets/website.svg",
        iconAlt: "computer outline",
        selected: false,
        cost: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Which type of website are you wanting?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Basic",
        subtitle: "(Informational)",
        icon: "/assets/info.svg",
        iconAlt: "person outline",
        selected: false,
        cost: 1000,
      },
      {
        id: 2,
        title: "Interactive",
        subtitle: "(Users, API's, Messaging)",
        icon: "/assets/customized.svg",
        iconAlt: "outline of two people",
        selected: false,
        cost: 2000,
      },
      {
        id: 3,
        title: "E-Commerce",
        subtitle: "(Sales)",
        icon: "/assets/globe.svg",
        iconAlt: "outline of three people",
        selected: false,
        cost: 2500,
      },
    ],
    active: true,
  },
];

export default function EstimatePage() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [questions, setQuestions] = useState(defaultQuestions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [service, setService] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [customFeatures, setCustomFeatures] = useState("");
  const [category, setCategory] = useState("");
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [emailHelper, setEmailHelper] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: estimateAnimation,
    rendererSettings: {
      preserveAspectRation: "xMidYMid slice",
    },
  };

  const nextQuestion = () => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter((question) => question.active);
    const activeIndex = currentlyActive[0].id - 1;
    const nextIndex = activeIndex + 1;

    newQuestions[activeIndex] = { ...currentlyActive[0], active: false };
    newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true };

    setQuestions(newQuestions);
  };

  const previousQuestion = () => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter((question) => question.active);
    const activeIndex = currentlyActive[0].id - 1;
    const nextIndex = activeIndex - 1;

    newQuestions[activeIndex] = { ...currentlyActive[0], active: false };
    newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true };

    setQuestions(newQuestions);
  };

  const navigationPreviousDisabled = () => {
    const currentlyActive = questions.filter((question) => question.active);
    if (currentlyActive[0].id === 1) {
      return true;
    }
    return false;
  };

  const navigationNextDisabled = () => {
    const currentlyActive = questions.filter((question) => question.active);
    if (currentlyActive[0].id === questions.length) {
      return true;
    }
    return false;
  };

  const handleSelect = (id) => {
    const newQuestions = cloneDeep(questions);
    const currentlyActive = newQuestions.filter((question) => question.active);
    const activeIndex = currentlyActive[0].id - 1;

    const newSelected = newQuestions[activeIndex].options[id - 1];

    const prevSelected = currentlyActive[0].options.filter(
      (option) => option.selected
    );

    switch (currentlyActive[0].subtitle) {
      case "Select one.":
        if (prevSelected[0]) {
          prevSelected[0].selected = !prevSelected[0].selected;
        }
        newSelected.selected = !newSelected.selected;
        break;
      default:
        newSelected.selected = !newSelected.selected;
        break;
    }

    switch (newSelected.title) {
      case "Custom Software Development":
        setQuestions(softwareQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setCategory("");
        setUsers("");
        break;
      case "iOS/Android App Development":
        setQuestions(softwareQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setCategory("");
        setUsers("");
        break;
      case "Website Development":
        setQuestions(websiteQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setCategory("");
        setUsers("");
        break;
      default:
        setQuestions(newQuestions);
        break;
    }
  };

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

  const getTotal = () => {
    let cost = 0;
    const selections = questions
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length > 0);

    selections.map((options) => options.map((option) => (cost += option.cost)));
    if (questions.length > 2) {
      const userCost = questions
        .filter(
          (question) => question.title === "How many users do you expect?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0];

      setUsers(userCost.title);
      cost -= userCost.cost;
      cost *= userCost.cost;
    }
    setTotal(cost);
  };

  const getPlatforms = () => {
    let newPlatforms = [];

    if (questions.length > 2) {
      questions
        .filter(
          (question) =>
            question.title === "Which platforms do you need supported?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0]
        .map((option) => newPlatforms.push(option.title));

      setPlatforms(newPlatforms);
    }
  };

  const getFeatures = () => {
    let newFeatures = [];

    if (questions.length > 2) {
      questions
        .filter(
          (question) =>
            question.title === "Which features do you expect to use?"
        )
        .map((question) => question.options.filter((option) => option.selected))
        .map((option) =>
          option.map((newFeature) => newFeatures.push(newFeature.title))
        );

      setFeatures(newFeatures);
    }
  };

  const getCustomFeatures = () => {
    if (questions.length > 2) {
      let newCustomFeatures = questions
        .filter(
          (question) =>
            question.title ===
            "What type of custom features do you expect to need?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0].title;

      setCustomFeatures(newCustomFeatures);
    }
  };

  const getCategory = () => {
    if (questions.length === 2) {
      const newCategory = questions
        .filter(
          (question) =>
            question.title === "Which type of website are you wanting?"
        )[0]
        .options.filter((option) => option.selected)[0].title;
      setCategory(newCategory);
    }
  };

  const sendEstimate = () => {
    setLoading(true);

    const url =
      "https://us-central1-material-ui-course-8afe8.cloudfunctions.net/sendMail";
    axios
      .get(url, {
        params: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          total: total,
          category: category,
          service: service,
          platforms: platforms,
          features: features,
          customFeatures: customFeatures,
          users: users,
        },
      })
      .then((res) => {
        setLoading(false);
        setAlert({
          open: true,
          message: "Estimate placed successfully",
          backgroundColor: "#4BB543",
        });
        setDialogOpen(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setAlert({
          open: true,
          message: "Something went wrong, please try again!",
          backgroundColor: "#FF3232",
        });
      });
  };

  const estimateDisabled = () => {
    let disabled = true;

    const emptySelections = questions
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length === 0);

    if (questions.length === 2) {
      if (emptySelections.length === 1) {
        return false;
      }
    } else if (questions.length === 1) {
      return true;
    } else {
      if (
        emptySelections.length < 3 &&
        questions[questions.length - 1].options.filter(
          (option) => option.selected
        ).length > 0
      ) {
        return false;
      }
    }

    return disabled;
  };

  const softwareSelection = (
    <Grid container direction="column">
      <Head>
        <title key="title">
          Free Custom Software Estimate | Arc Development
        </title>
        <meta
          name="description"
          key="description"
          content="Use our free online estimate calculator to instantly check the cost of your custom software, mobile app, or website design and development project!"
        />
        <meta
          property="og:title"
          content="Bringing West Coast Technology to the Midwest | Free Estimate"
          key="og:title"
        />
        <meta
          property="og:url"
          content="https://arcsoftwaredevelopment.com/estimate"
          key="og:url"
        />
        <link
          href="https://arcsoftwaredevelopment.com/estimate"
          rel="canonical"
          key="canonical"
        />
      </Head>
      <Grid
        item
        container
        alignItems="center"
        style={{ marginBottom: "1.25em" }}
      >
        <Grid item xs={2}>
          <img src="/assets/check.svg" alt="checkmark" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            You want {service + " for "}
            {platforms.length > 0
              ? platforms
                  .map((platform) =>
                    "aeiouAEIOU".indexOf(platform[0]) !== -1
                      ? `an ${platform}`
                      : `a ${platform}`
                  )
                  .join(", ") + "."
              : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        style={{ marginBottom: "1.25em" }}
      >
        <Grid item xs={2}>
          <img src="/assets/check.svg" alt="checkmark" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            {"with "}
            {/* if we have features... */}
            {features.length > 0
              ? //...and there's only 1...
                features.length === 1
                ? //then end the sentence here
                  `${features[0]}.`
                : //otherwise, if there are two features...
                features.length === 2
                ? //...then end the sentence here
                  `${features[0]} and ${features[1]}.`
                : //otherwise, if there are three or more features...
                  features
                    //filter out the very last feature...
                    .filter((feature, index) => index !== features.length - 1)
                    //and for those features return their name...
                    .map((feature, index) => (
                      <span key={index}>{`${feature}, `}</span>
                    ))
              : null}
            {features.length > 0 &&
            features.length !== 1 &&
            features.length !== 2
              ? //...and then finally add the last feature with 'and' in front of it
                ` and ${features[features.length - 1]}.`
              : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container alignItems="center">
        <Grid item xs={2}>
          <img src="/assets/check.svg" alt="checkmark" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            The custom feature will be of {customFeatures.toLowerCase()}
            {`, and the project will be used by about ${users} users.`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  const websiteSelection = (
    <Grid container direction="column" style={{ marginTop: "14em" }}>
      <Grid item container alignItems="center">
        <Grid item xs={2}>
          <img src="/assets/check.svg" alt="checkmark" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            You want{" "}
            {category === "Basic"
              ? "a Basic Website"
              : `an  ${category} Website`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Grid container direction={matchesMD ? "column" : "row"}>
      <Grid
        item
        container
        lg
        direction="column"
        alignItems={matchesMD ? "center" : undefined}
      >
        <Grid
          item
          style={{ marginTop: "2em", marginLeft: matchesMD ? 0 : "5em" }}
        >
          <Typography variant="h1" align={matchesMD ? "center" : undefined}>
            Estimate
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            marginRight: matchesMD ? 0 : "10em",
            maxWidth: "50em",
            marginTop: "7.5em",
          }}
        >
          <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
        </Grid>
      </Grid>
      <Grid
        item
        container
        lg
        direction="column"
        style={{ marginRight: matchesMD ? 0 : "2em", marginBottom: "25em" }}
        alignItems="center"
      >
        {questions
          .filter((question) => question.active)
          .map((question, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item>
                  <Typography
                    variant="h1"
                    align="center"
                    style={{
                      fontWeight: 500,
                      fontSize: "2.25rem",
                      marginTop: "5em",
                      lineHeight: 1.25,
                      marginLeft: matchesSM ? "1em" : 0,
                      marginRight: matchesSM ? "1em" : 0,
                    }}
                  >
                    {question.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    style={{ marginBottom: "2.5em" }}
                    gutterBottom
                  >
                    {question.subtitle}
                  </Typography>
                </Grid>
                <Grid item container>
                  {question.options.map((option, index) => {
                    return (
                      <Grid
                        key={index}
                        item
                        container
                        direction="column"
                        md
                        component={Button}
                        onClick={() => handleSelect(option.id)}
                        style={{
                          display: "grid",
                          textTransform: "none",
                          borderRadius: 0,
                          backgroundColor: option.selected
                            ? theme.palette.common.orange
                            : null,
                          marginBottom: matchesSM ? "1.5em" : 0,
                        }}
                      >
                        <Grid item style={{ maxWidth: "14em" }}>
                          <Typography
                            variant="h6"
                            align="center"
                            style={{ marginBottom: "1em" }}
                          >
                            {option.title}
                          </Typography>
                          <Typography variant="caption" align="center">
                            {option.subtitle}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <img
                            src={option.icon}
                            alt={option.iconAlt}
                            className={classes.icon}
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </React.Fragment>
            );
          })}

        <Grid
          item
          container
          justify="space-between"
          style={{ width: "18em", marginTop: "3em" }}
        >
          <Grid item>
            <IconButton
              disabled={navigationPreviousDisabled()}
              onClick={previousQuestion}
            >
              <img
                src={
                  navigationPreviousDisabled()
                    ? "/assets/backArrowDisabled.svg"
                    : "/assets/backArrow.svg"
                }
                alt="previous question"
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              disabled={navigationNextDisabled()}
              onClick={nextQuestion}
            >
              <img
                src={
                  navigationNextDisabled()
                    ? "/assets/forwardArrowDisabled.svg"
                    : "/assets/forwardArrow.svg"
                }
                alt="next question"
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={classes.estimateButton}
            onClick={() => {
              getTotal();
              getPlatforms();
              getFeatures();
              getCustomFeatures();
              getCategory();
              setDialogOpen(true);
            }}
            disabled={estimateDisabled()}
          >
            Get Estimate
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="lg"
        style={{ zIndex: 1302 }}
        fullScreen={matchesSM}
      >
        <Grid container justify="center">
          <Grid item style={{ marginTop: "1em", marginBottom: "1em" }}>
            <Typography variant="h1" align="center">
              Estimate{" "}
            </Typography>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid
            container
            direction={matchesSM ? "column" : "row"}
            alignItems={matchesSM ? "center" : undefined}
            justify="space-around"
          >
            <Grid
              item
              container
              direction="column"
              md={7}
              style={{ maxWidth: "20em" }}
            >
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
              <Grid item style={{ maxWidth: "20em" }}>
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
                  placeholder="Tell us more about your project"
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  paragraph
                  align={matchesSM ? "center" : undefined}
                  style={{ lineHeight: 1.25 }}
                >
                  We can create this digital solution for an estimated&nbsp;
                  <span className={classes.specialText}>
                    ${total.toFixed(2)}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  align={matchesSM ? "center" : undefined}
                >
                  Fill out your name, phone number, and email, place your
                  request, and we'll get back to you with details moving forward
                  and a final price.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              md={5}
              style={{ maxWidth: "30em" }}
              alignItems={matchesSM ? "center" : undefined}
            >
              <Hidden smDown>
                <Grid item>
                  {questions.length > 2 ? softwareSelection : websiteSelection}
                </Grid>
              </Hidden>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.estimateButton}
                  onClick={sendEstimate}
                  disabled={
                    values.name.length === 0 ||
                    values.message.length === 0 ||
                    values.phone.length === 0 ||
                    values.email.length === 0 ||
                    phoneHelper.length !== 0 ||
                    emailHelper.length !== 0
                  }
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <React.Fragment>
                      Place Request
                      <img
                        src="/assets/send.svg"
                        alt="paper airplane"
                        style={{ marginLeft: "0.5em" }}
                      />
                    </React.Fragment>
                  )}
                </Button>
              </Grid>
              <Hidden mdUp>
                <Grid item style={{ marginBottom: matchesSM ? "5em" : 0 }}>
                  <Button
                    style={{ fontWeight: 300 }}
                    color="primary"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Hidden>
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
    </Grid>
  );
}
