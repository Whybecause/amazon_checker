import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    {/* NAV + SEARCH FORM */}
    <Switch>
      {/* GET POPULAR MOVIES BY DEFAULT */}
      <Home exact path="/" component={Home}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
