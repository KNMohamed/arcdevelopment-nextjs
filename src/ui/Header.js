/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  makeStyles,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Hidden
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import Link from "../Link";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "50px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    [theme.breakpoints.down("md")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5rem",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: theme.palette.common.white,
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": { opacity: 1 },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = [
    { name: "Services", path: "/services", activeIndex: 1, selectedIndex: 0 },
    {
      name: "Custom Software Development",
      path: "/customsoftware",
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: "iOS/Android App Development",
      path: "/mobileapps",
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: "Website Development",
      path: "/websites",
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  const routes = [
    { name: "Home", path: "/", activeIndex: 0 },
    {
      name: "Services",
      path: "/services",
      activeIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      mouseOver: (event) => handleClick(event),
    },
    { name: "The Revolution", path: "/revolution", activeIndex: 2 },
    { name: "About Us", path: "/about", activeIndex: 3 },
    { name: "Contact Us", path: "/contact", activeIndex: 4 },
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.path}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              route.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        case "/estimate":
          if(props.value !== false){
            props.setValue(false);
          }          
          break;
        default:
          break;
      }
    });
  }, [menuOptions, routes, props, props.value, props.selectedIndex]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            href={route.path}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        href="/estimate"
        onClick={() => props.setValue(false)}
      >
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        MenuListProps={{ onMouseLeave: handleClose }}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={`${option}${index}`}
            component={Link}
            onClick={(event) => {
              handleMenuItemClick(event, index);
              props.setValue(1);
              handleClose();
            }}
            href={option.path}
            classes={{ root: classes.menuItem }}
            selected={index === props.selectedIndex && props.value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const listComponent = (
    <List disablePadding component="nav" aria-label="main navigation list">
      {routes.map((route) => (
        <ListItem
          key={`${route}${route.activeIndex}`}
          onClick={() => {
            setOpenDrawer(false);
            props.setValue(route.activeIndex);
          }}
          divider
          button
          selected={props.value === route.activeIndex}
          classes={{ selected: classes.drawerItemSelected }}
          component={Link}
          href={route.path}
        >
          <ListItemText className={classes.drawerItem} disableTypography>
            {route.name}
          </ListItemText>
        </ListItem>
      ))}
      <ListItem
        onClick={() => {
          setOpenDrawer(false);
          props.setValue(false);
        }}
        divider
        button
        selected={props.value === false}
        component={Link}
        href="/estimate"
        classes={{
          root: classes.drawerItemEstimate,
          selected: classes.drawerItemSelected,
        }}
      >
        <ListItemText className={classes.drawerItem} disableTypography>
          Free Estimate
        </ListItemText>
      </ListItem>
    </List>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        {listComponent}
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              href="/"
              className={classes.logoContainer}
              onClick={() => props.setValue(0)}
              disableRipple
            >
              <img className={classes.logo} src="/assets/logo.svg" alt="Company logo" />
            </Button>
            <Hidden mdDown>
              {tabs}
            </Hidden>
            <Hidden lgUp>
              {drawer}
            </Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
