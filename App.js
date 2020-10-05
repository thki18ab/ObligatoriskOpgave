import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, AsyncStorage } from 'react-native';

import SignUpForm from './components/SignUpForm';
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";
import ProfilScreen from "./components/ProfilScreen";
import {createAppContainer} from "react-navigation";
import HomeScreen from "./components/HomeScreen";
import {createDrawerNavigator} from "react-navigation-drawer";
import GroceryListScreen from "./components/GroceryListScreen";
import PlatformScreen from "./components/PlatformScreen";
import { Card } from 'react-native-paper';

const fireBaseConfig ={
  apiKey: "AIzaSyB_Epj8q65oQOTSfS5s2UtNxbCUtHJmDMM",
  authDomain: "ovelse-5.firebaseapp.com",
  databaseURL: "https://ovelse-5.firebaseio.com",
  projectId: "ovelse-5",
  storageBucket: "ovelse-5.appspot.com",
  messagingSenderId: "430393569044",
  appId: "1:430393569044:web:d912a18a1871c3e457dc01",
  measurementId: "G-5JLJPB0G6N"
}
// vigtigt at tilføje nedestående if statement, da ellers init firebase flere gange
if (!firebase.apps.length) {
  firebase.initializeApp(fireBaseConfig);
}


const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  GroceryList:{
    screen: GroceryListScreen
  },
  Platform:{
    screen:PlatformScreen
  },
  ProfilScreen:{
    screen:ProfilScreen
  }

});

const AppNav = createAppContainer(MyDrawerNavigator)

export default class App extends React.Component {

  state = {user:null}

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user });
    });
    console.log(this.state.user)
  }

  render() {
    const {user} = this.state
    if (!user){
    return(
       <View>
        <Card>
      <SignUpForm/>
    </Card>
      <Card>
        <LoginForm />
      </Card>
       </View>
    )
    } else {
    return (
        <AppNav user={user} />
    );
    }

  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
