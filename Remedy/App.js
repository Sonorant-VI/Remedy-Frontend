import { NavigationContainer } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';

import MainStackNavigator from './components/Page/Navigation/MainStackNavigator';

export default function App() {

    
    // Need token to see if person is logged in or not
    
    // const [isLoggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //   setLoggedIn(!!token);
    // }, [token]);

    // return( 
    //   <> 
    //     <NavigationContainer>
    //       {isLoggedIn ? <MainStackNavigator /> : <SignInNavigator />}
    //     </NavigationContainer>
    //   </>
    // );
  
   return <MainStackNavigator />
  // return <Splash />
}