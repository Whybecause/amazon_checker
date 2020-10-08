import React from 'react';
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import NavMenu from './components/NavMenu';
import CampaignContainer from './components/Campaigns/CampaignContainer';
import BuyboxContainer from './components/BuyboxContainer';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <NavMenu component={NavMenu}/>
    <Switch>
      <Redirect exact from= "/" to="/campaigns" />
      <CampaignContainer exact path="/campaigns" component={CampaignContainer} />
      <Login exact path="/login" component={Login} />
      <BuyboxContainer exact path="/buybox" component={BuyboxContainer}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
