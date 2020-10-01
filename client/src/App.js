import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import NavMenu from './components/NavMenu';
import Home from './components/Home';
import CampaignBox from './components/Campaigns/CampaignBox';
import AllCampaigns from './components/Campaigns/AllCampaigns';
import ProblemCampaigns from './components/Campaigns/ProblemCampaigns';

function App() {
  return (
    <BrowserRouter>
      <NavMenu component={NavMenu}/>
    <Switch>
      <AllCampaigns exact path="/campaigns/all" component={AllCampaigns} />
      <ProblemCampaigns exact path="/campaigns/problem" component={ProblemCampaigns} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
