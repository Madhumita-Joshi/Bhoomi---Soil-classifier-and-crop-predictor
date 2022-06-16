import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,Button
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from "react-native-picker-select";
import {states}  from "../models/state";
import {cities}  from "../models/cities";
import BottomSheetComponent from './BottomSheetComponent';



const EditProfile = () => {

  const [image, setImage] = useState('https://thumbs.dreamstime.com/b/icon-profile-color-green-icon-profile-color-green-circle-color-dark-green-background-color-white-194702090.jpg');
  
  
  const [userState, setuserState] = useState('');
  const [city, setCity] = useState(null);
  const [citiesSelect, setcitiesSelect] = useState([]);

  const [firstName , setFirstName ] = useState(null);
  const [lastName , setLastName ] = useState(null);
  const [Phone , setPhone ] = useState(null);
  const [Email , setEmail ] = useState(null);
  const [Pin , setPin ] = useState(null);

  const [visible , setIsVisible ] = useState(false);

  const {colors} = useTheme();

  function citySelectUpdateByState(userStateSelect){
    console.log(cities.get(0) , userStateSelect);

    states.map((item) => {
        if(item.label == userStateSelect )
        {
          console.log(item);
          setcitiesSelect(cities.get(item.id + 1));
        }
    });
  }

  return (
    <View style={styles.container}>
     
    
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={ () => { setIsVisible(!visible); } }>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center', marginTop:50
              }}>
  <ImageBackground source={{  uri: image }} style={{height: 100, width: 100}} imageStyle={{borderRadius: 15}} />
               
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            Hello {name}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <MaterialIcons name="my-location" color={colors.text} size={20} />
<RNPickerSelect  placeholder={{ label: "Select State", value: null }}  useNativeAndroidPickerStyle={false}
onValueChange={ (State) => { setuserState(State); citySelectUpdateByState(State) }} items={states}   style={pickerSelectStyles}
/>
        </View>
        <View style={styles.action}>
<Icon name="map-marker-outline" color={colors.text} size={20} />
<RNPickerSelect  placeholder={{ label: "Select City", value: null }}  useNativeAndroidPickerStyle={false}
onValueChange={(city) => setCity(city) } 
items={citiesSelect}    style={pickerSelectStyles}
/>
        </View>

      <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
      <Text style={styles.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>

    
      { visible && <BottomSheetComponent visible={visible} />}      


    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButton: {

    width:200,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,255,0,1)',
    alignItems: 'center',
    marginTop: 10,
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center'
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginLeft:20,
    
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    marginTop: -5,
    paddingLeft: 10,
    color: '#05375a',
    
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
        paddingRight: 30, // to ensure the text is never behind the icon
        width: 250,
        height: 50,
        padding: 10,
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        color:'black',
        marginTop: -15,
    },
    placeholder:{
      color: "rgba(71,82,94,0.6)",
      
    }
  });
  