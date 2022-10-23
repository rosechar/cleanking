

import React from "react";
import Toolbar from "react-big-calendar/lib/Toolbar";

import {Button, IconButton, Typography} from "@mui/material";
import RightArrowIcon from "@mui/icons-material/ChevronRight";
import LeftArrowIcon from "@mui/icons-material/ChevronLeft";

export default class CalendarToolbar extends Toolbar {

  componentDidMount() {
    const view = this.props.view;
  }

  render() {
    return (
      <div className="custom-toolbar">
        <div className="rbc-btn-group">
          <IconButton onClick={() => this.navigate("PREV")}>
            <LeftArrowIcon fontSize="small" />
          </IconButton>
          <Button size="small" onClick={() => this.navigate("TODAY")}>
            Today
          </Button>
          <IconButton onClick={() => this.navigate("NEXT")}>
            <RightArrowIcon fontSize="small" />
          </IconButton>
        </div>
        <div ><Typography variant="h5" fontWeight={1}>{this.props.label}</Typography></div>
      </div>
    );
  }
}