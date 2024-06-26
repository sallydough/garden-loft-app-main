import { StyleSheet, Alert, View, ImageBackground,Dimensions, Text} from "react-native";
// import CarouselOne from "@/src/components/CarouselOne/CarouselOne";
import CarouselOne from "../../components/CarouselOne/CarouselOne";
import HelpButton from "../../components/HelpButton/HelpButton";
//Create Navigation Stacks
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../../components/Login/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import io from "socket.io-client";
import { FIRESTORE_DB } from "../../../FirebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {createMeeting, token} from '../../components/CarouselTwo/ApiSK';
import messaging from '@react-native-firebase/messaging';



const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

// function InsideLayout() {
//   return (
//     // <InsideStack.Navigator>
//     // <InsideStack.Screen name='login' component={Login} />
//     // {/* <InsideStack.Screen name='homepage' component={HomePage} /> */}
//     // </InsideStack.Navigator>
//   // )
// }

export default function TabOneScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      // console.log('user', user);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    console.log("hello please work please");
    // MUST CHANGE IP ADDRESS TO MATCH YOUR NETWORK IP ADDRESS 
    // please change ip address in server.server.js as well)
    // const socket = io('http://192.168.1.73:3000/'); // thin air labs wifi
    const socket = io('http://10.0.0.193:3000/'); // sally wifi
    // const socket = io('http://10.44.22.86:3000/'); //inception wifi
  
    socket.on("connect", () => {
      console.log("connected to server");
    });
  
    socket.on("me", (token) => {
      console.log("Your ID: ", token);
    });
  
    socket.on("ping", (data) => {
      console.log("hello world we here!", data);
    });
  
    socket.emit("ping");
  
    return () => socket.disconnect();
  }, []);


  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
      
        <>
          {user ? (
            <Stack.Screen 
            options={{ headerShown: false }} name="Garden Loft Home" 
            component={InsideApp} />
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const image = {uri: "https://st4.depositphotos.com/16940446/39797/v/450/depositphotos_397974052-stock-illustration-orange-white-gradient-soft-background.jpg"};

//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmfTEcAX_NdavZp6_Htr2okERd0HQBKzJ8Xw&usqp=CAU
// 

function InsideApp() {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} resizeMode="stretch" style={styles.image}> */}
      <HelpButton />
      <CarouselOne />
      {/* </ImageBackground> */}
    {/* <HomePage /> */}
    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCF8E3",

    
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    // width: viewportWidth, 
    // height: viewportHeight,
    
  }
});
