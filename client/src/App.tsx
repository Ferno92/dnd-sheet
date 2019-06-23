import React from 'react';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import ThemeLight from './assets/styles/ThemeLight'

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={ThemeLight}>
      {/* <BottomAppBar
              logged={this.state.logged}
              logout={this.logout}
              navigationMenuOpen={false}
              logoutDialogOpen={false}
              hideAppBar={false}
            /> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
