import React, { Component } from "react";
import DashboardStyles from "./Dashboard.styles";
import { WithStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core";

interface DashboardProps {

}

interface DashboardState {

}

class Dashboard extends Component<DashboardProps & WithStyles<typeof DashboardStyles>, DashboardState>{

    render() {
        const {classes} = this.props
        return (
            <div className={classes.container}>CIAONE</div>
        )
    }
}

export default withStyles(DashboardStyles)(Dashboard)