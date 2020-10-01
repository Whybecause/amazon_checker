import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import CampaignBox from './components/Campaigns/CampaignBox';
import AllCampaignsWrapper from './components/Campaigns/Wrapper/AllCampaignsWrapper';
import ProblemCampaignsWrapper from './components/Campaigns/Wrapper/ProblemCampaignsWrapper';

function App() {
  return (
    <BrowserRouter>
      <Nav component={Nav}/>
    <Switch>
      {/* <Home exact path="/" component={Home} /> */}
      {/* <AllCampaignsWrapper exact path="/campaigns/all" component={AllCampaignsWrapper} />
      <ProblemCampaignsWrapper exact path="/campaigns/problem" component={ProblemCampaignsWrapper} /> */}
      <CampaignBox exact path="/campaigns/all" component={CampaignBox} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
