import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/Dashboard">Dashboard </NavLink>
          <NavLink to="/LogSignIn">LogSignIn </NavLink>
          <NavLink to="/Calendar">Calendar </NavLink>
          <NavLink to="/Accounts">Accounts </NavLink>
       </div>
    );
}
 
export default Navigation;