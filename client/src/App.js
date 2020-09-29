import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import ProblemCampaignsWrapper from './components/Campaigns/Wrapper/ProblemCampaignsWrapper';
import AllCampaignsWrapper from './components/Campaigns/Wrapper/AllCampaignsWrapper';

function App() {
  return (
    <BrowserRouter>
      <Nav component={Nav}/>
    <Switch>
      <Home exact path="/" component={Home}/>
      <AllCampaignsWrapper exact path="/campaigns/all" component={AllCampaignsWrapper} />
      <ProblemCampaignsWrapper exact path="/campaigns/problem" component={ProblemCampaignsWrapper} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
