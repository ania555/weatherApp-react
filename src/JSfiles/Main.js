import React from "react";
import { Switch, Route } from 'react-router-dom';
import Landing from '../JSfiles/Landing';
import Favorits from '../JSfiles/Favorits';




function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/Favorits' component={Favorits}/>
      </Switch>
    </main>
  );
}



export default Main;