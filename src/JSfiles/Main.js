import React from "react";
import { Switch, Route } from 'react-router-dom';
import Landing from '../JSfiles/Landing';
import Favorits from '../JSfiles/Favorits';




function Main() {
  return (
    <main>
      <Switch>
        {/* <Route exact path='/' component={Landing}/> */}
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Landing}/>
        <Route path={`${process.env.PUBLIC_URL}/Favorits`} component={Favorits}/>
      </Switch>
    </main>
  );
}



export default Main;