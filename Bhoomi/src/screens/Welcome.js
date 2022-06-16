import * as React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import SignUp from "./SignUp";
import SignIn from "./SignIn";


const Welcome = ({navigation}) => {

    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/Bhoomi.png")}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={(e) => navigation.navigate('SignUp') } // navigation.navigate({name: SignUp})
          style={{ backgroundColor: "#fee9bf",  height:50, width: 250, justifyContent:'center', alignItems:'center' }}
        >
          <Text style={{ fontSize: 20, color: "#47525E" }}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={{ backgroundColor: "#fee9bf" , margin: 20, height:50, width: 250, justifyContent:'center', alignItems:'center'}}
        >
          <Text style={{ fontSize: 20, color: "#47525E" }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",

    flex: 1,

    alignItems: "center",

    height: "100%",

    width: "100%",
  },
  image: {
    width: "100%",
    margin:30,
    marginTop:70,
  },
});

export default Welcome;