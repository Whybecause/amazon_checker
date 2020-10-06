import React from 'react';
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import NavMenu from './components/NavMenu';
import CampaignBox from './components/CampaignBox';
import Buybox from './components/Buybox';

function App() {
  return (
    <BrowserRouter>
      <NavMenu component={NavMenu}/>
    <Switch>
      <Redirect exact from= "/" to="/campaigns" />
      <CampaignBox exact path="/campaigns" component={CampaignBox} />
      <Buybox exact path="/buybox" component={Buybox} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
