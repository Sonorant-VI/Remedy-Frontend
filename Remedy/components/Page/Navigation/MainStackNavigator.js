import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setToken } from '../store/actions/user';
// import AsyncStorage from '@react-native-community/async-storage';
import MainStack from '../Navigation/MainStack';
import LogInStack from '../Navigation/LogInStack';


const MainStackNavigator = () => {

//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user);

//   useEffect(() => {
//     const getToken = async () => dispatch(setToken(await AsyncStorage.getItem('token')));
//     getToken();
//   }, [])

//   return (
//     <NavigationContainer>
//         {(user.token == null)
//             ? <LogInStack /> : <MainStack />
//         }
//     </NavigationContainer>
//   ) 
// };
  // return <MainStack />
   return <LogInStack />
  
};

export default MainStackNavigator;