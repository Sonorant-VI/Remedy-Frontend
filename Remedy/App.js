import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Dashboard from './components/Dashboard';
import LogSignIn from './components/LogSignIn';
import Calendar from './components/Calendar';
import Accounts from './components/Accounts';
import Error from './components/Error';
import Navigation from './components/Navigation';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/Dashboard" component={Dashboard} exact/>
             <Route path="/LogSignIn" component={LogSignIn}/>
             <Route path="/Calendar" component={Calendar}/>
             <Route path="/Accounts" component={Accounts}/>

            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;