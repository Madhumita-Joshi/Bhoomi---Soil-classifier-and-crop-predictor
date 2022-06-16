import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';


export default function TopHeader() {
    const logo  = require('../../assets/Bhoomi.png');
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>

    
      <Image source={logo}
      style={{width: 200, height: 200, marginLeft:-50}}></Image>
    

    
      <Text style={styles.welcomeStyle}>Hello Keshav</Text>
    
    </View>
  )
}


const styles = StyleSheet.create({
    welcomeStyle:
    {
      fontSize: 20,
      marginRight: 30,
      marginBottom:15,
      marginRight:-40
    },


});
