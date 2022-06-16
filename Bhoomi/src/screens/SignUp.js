import React, {componentDidMount} from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {states}  from "../models/state";
import {cities}  from "../models/cities";

import {connect  } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { update_user } from '../actions/user_actions';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Phone_num: "",
      Password: "",
      Repassword: "",
      State: "",
      City: "",
      Pin_code: "",
      cities:[]
    };
  }

 

  citySelectUpdateByState(userStateSelect){
    console.log(cities.get(0) , userStateSelect);

    states.map((item) => {
        if(item.label == userStateSelect )
        {
          console.log(item);
          this.setState({cities: cities.get(item.id + 1)});
        }
    });


  }

  componentDidMount(){
    console.log(this.props.name);
  }

  getStateName()
  {
    return this.props.name;
  }

  

  InsertRecord = () =>{

    console.log("Insert Record is called");


    var Name = this.state.Name;
    var Phone_num = this.state.Phone_num;
    var Password = this.state.Password;
    var Repassword = this.state.Repassword;
    var State = this.state.State;
    var City = this.state.City;
    var Pin_code = this.state.Pin_code;

    console.log('name' + Name);
    console.log('Phone' + Phone_num);
    console.log('password' + Password);
    console.log('repass' + Repassword);
    console.log('satet' + State);
    console.log('city' + City);
    console.log('pin' + Pin_code);


    if(Name == '' || Phone_num == ''|| Password == '' || Repassword == '' || State == '' || City == '' || Pin_code == ''){
      alert("Required Fields are Missing");
    }else if(Phone_num.length != 10){
      alert("Invalid Mobile Numer");
    }else if(Password.length < 3 || Password.length > 8){
      alert("Min 3 characters and Max 8 charaters are required");
    }else if(Repassword !== Password){
      alert("Passwords do not match");
    }else if(Pin_code.length != 6){
      alert("Invalid Pin Code");
    }else{
      // var InsertAPIURL = "http://10.0.2.2:80/GroWise/insert.php";

      console.log('connect to server');

      var InsertAPIURL = "http://growise.000webhostapp.com/register.php";

      var headers = {
        'Accept':'application/json',
        'Content-Type':'application/json'
      };

      var Data = {
        //php:name variable defined here
        Name: Name,
        Phone_num: Phone_num,
        Password: Password,
        State: State,
        City: City,
        Pin_code: Pin_code
      };
      
      console.log(Data);


      fetch(InsertAPIURL,
        {
          method:'POST',
          headers: headers,
          body: JSON.stringify(Data)
        }).then((response)=>response.json())
        .then((response)=>{
          console.log(response, response[0].Message ,  response[0].Result  );

          if(response[0].Result == 0)
          {
            alert(response[0].Message );
          } 
          else{
            this.props.navigation.navigate('Home' , { userId : response[0].userId});
          }
        })
        .catch((error)=>{
          console.log(error)
        })
      
    }
  }
   
  render() {
    return (
      <View style={styles.container}>
        
        <Image
          source={require("../../assets/Bhoomi.png")}
          style={styles.image}
        />

        <TextInput
          style={styles.form}
          name="Name" 
          placeholder= 'Name'
          onChangeText={(Name) => this.setState({Name})}
        />
        <TextInput
          style={styles.form}
          name="Phone_num"
          keyboardType={"numeric"}
          placeholder="Phone Number"
          onChangeText={(Phone_num) => this.setState({Phone_num})}
        />
        <TextInput
          style={styles.form}
          name="Password"
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(Password) => this.setState({Password})}
        />
        <TextInput
          style={styles.form}
          name="Repassword"
          secureTextEntry={true}
          placeholder="Re-enter your Password"
          onChangeText={(Repassword) => this.setState({Repassword})}
        />
        {/* <TextInput
          style={styles.form}
          name="State"
          placeholder="State"
          onChangeText={(State) => this.setState({State})}
        /> */}

        <RNPickerSelect  placeholder={{ label: "Select State", value: null }}  useNativeAndroidPickerStyle={false}
        onValueChange={ (State) => { this.setState({State}, this.citySelectUpdateByState(State)) }} items={states}   style={pickerSelectStyles}
        />
        <RNPickerSelect   placeholder={{ label: "Select City", value: null }}   useNativeAndroidPickerStyle={false}
        onValueChange={(city) =>  this.setState({City:city} )} 
        items={this.state.cities}   style={pickerSelectStyles}
        />
        {/* <TextInput
          style={styles.form}
          name="City"
          placeholder="City"
          onChangeText={(City) => this.setState({City})}
        /> */}
        <TextInput
          style={styles.form}
          name="Pin_code"
          keyboardType={"numeric"}
          placeholder="Pin Code"
          onChangeText={(Pin_code) => this.setState({Pin_code})}
        />
        <TouchableOpacity
          onPress={()=>{ this.InsertRecord() }}
          style={styles.button}
        >   

          <Text style={{ fontSize: 15, color: "#ffffff" }}>SUBMIT</Text>
        </TouchableOpacity>

        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "61%",
    height: "20%",
    marginTop: 40,
    marginBottom: 30,
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



const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 8,
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: "#fee9bf",
      width: 250,
      height: 50,
      padding: 10,
      marginTop:7,
      marginBottom:7,
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center',
      color:'black'
  },
  placeholder:{
    color: "rgba(71,82,94,0.6)",
    
  }
});

const mapStateToProps = state => {
  console.log(state);
  console.log(state.phone);
  console.log(state.name);
  return {
   name : state.userReducer.name,
   phone : state.userReducer.phone,
};

}

const mapDispatchToProps  = dispatch => {
  
  return {
    updateName : (name) => dispatch(update_user(name)),
  };

  // bindActionCreators({ update_user,  } , dispatch)
};

 
export default connect(mapStateToProps , mapDispatchToProps ) (SignUp);

// export default SignUp