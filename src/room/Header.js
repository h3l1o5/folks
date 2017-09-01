import React from "react";
import PropTypes from "prop-types";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Icon from "material-ui/Icon";
import Switch from "material-ui/Switch";
import { FormControlLabel } from "material-ui/Form";

import "./Header.css";

const Header = props => (
  <div className="header">
    <AppBar position="static" color="accent">
      <Toolbar>
        <IconButton
          color="contrast"
          onClick={props.onCloseButtonClick}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <Typography type="title" color="inherit">
          {props.title}
        </Typography>
        <div className="mapSwitcher">
          <FormControlLabel
            control={
              <Switch
                checked={props.showMap}
                onChange={(event, checked) => props.onMapSwitherClick(checked)}
              />
            }
            label={
              <Icon color="contrast" style={{ fontSize: 30 }}>
                near_me
              </Icon>
            }
          />
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

Header.defaultProps = {
  title: "",
};

Header.propTypes = {
  onCloseButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  showMap: PropTypes.bool.isRequired,
  onMapSwitherClick: PropTypes.func.isRequired,
};

export default Header;
