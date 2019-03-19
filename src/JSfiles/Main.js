import React from "react";
import { Switch, Route } from 'react-router-dom';
import Landing from '../JSfiles/Landing';
import Favorits from '../JSfiles/Favorits';
// import Login from '../JScript/Login';
// import CreateAccount from '../JScript/CreateAccount'



function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/favorits' component={Favorits}/>
        {/* <Route path='/login' component={Login}/> */}
        {/* <Route path='/createAccount' component={CreateAccount}/>  */}
      </Switch>
    </main>
  );
}



export default Main;