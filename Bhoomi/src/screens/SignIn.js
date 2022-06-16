import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import Home from './Home';
import {connect} from 'react-redux';
import { getUserDetails , updateUserDetails } from '../redux/index'


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Phone_num: "",
      Password: "",
    };
  }

  login = () => {

    console.log("Login function ");

    // this.props.navigation.navigate(Home);
    const { Phone_num, Password } = this.state;

    console.log(Phone_num , Password);

    if (Phone_num.length != 10) {
      alert("Invalid Mobile Number");
      return false;
    } else if (Password == "") {
      alert("Please enter password");
    } else {

      console.log("Else block");

      fetch("http://growise.000webhostapp.com/login.php", {
      // fetch("http://192.168.0.104:80/GroWise/login.php", {
        method: "POST",
        headers : {
          "Accept" : "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // we will pass our input data to server
          Phone_num: Phone_num,
          Password: Password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          if (response[0].response == 1) {
            //alert("Successfully Login");
            this.props.navigation.navigate("Home",  { userId : response[0].userId} );
//            () => navigation.navigate("Sign In")
          } else {
            alert("Wrong Login Details");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    Keyboard.dismiss();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/Bhoomi.png")}
          style={styles.image}
        />
        <TextInput
          placeholder="Enter your Phone number"
          style={styles.form}
          keyboardType={"numeric"}
          onChangeText={(Phone_num) => this.setState({ Phone_num })}
        />

        <TextInput
          placeholder="Enter Password"
          style={styles.form}
          secureTextEntry={true}
          onChangeText={(Password) => this.setState({ Password })}
        />
        <TouchableOpacity onPress={()=> { this.login() }} style={styles.button}>
          <Text style={{ color: "white" }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "61%",
    height: "20%",
    marginBottom: 40,
  },
  form: {
    backgroundColor: "#fee9bf",
    width: 250,
    height: 50,
    color: "#47525E",
    padding: 10,
    margin: 7,
  },
  button: {
    backgroundColor: "#418a40",
    margin: 7,
    height: 50,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps=(state)=>{
	return{
		phone : state.userReducer.phone,
		
	}
}

const mapDispatchToProps=(dispatch)=>{
		return{
			getUserDetails : (parameter) => {dispatch(getUserDetails(parameter))},
		
		}
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
