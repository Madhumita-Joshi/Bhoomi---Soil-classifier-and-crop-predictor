import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions,ScrollView } from 'react-native';
import TopHeader from '../components/component';


export default function History({route}) {

    const logo  = require('../../assets/Bhoomi.png');
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height
    const [name, setName] = useState('');

    useEffect(()=>{
        // get all images 
        fetch('http://growise.000webhostapp.com/profile.php', {
            method: "POST",
            headers : {
              "Accept" : "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // we will pass our input data to server
               userId : route.params.userId
            }),
          }).then(response => response.json()).then( response => {
            console.log(response);
            setName(response.name);
            
          }).catch( err => console.log(err));         
      
        
    })



  return (
    
    <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', marginBottom:-30, backgroundColor:'#FFF'}}>
            <View>
            <Image source={logo}
            style={{width: 200, height: 200,marginLeft:-30, marginRight:50 }}></Image>
            </View>

            <View>
            <Text style={styles.welcomeStyle}>Hello {name}</Text>
            </View>
        </View>

        <View style={{marginTop: 30}}>
            <View style={{ justifyContent: 'center',  alignItems:'center' , fontSize:20, backgroundColor:"#fff" }}>
                <Text style={{fontSize:20, lineHeight:40, marginLeft:-25}}>Thanks for visiting our App again!</Text>
                <Text style={{fontSize:20,}}>Let's take a look what crops suited {'\n'}your soil previously:</Text> 
            </View>
            <View
            style={{
            borderBottomColor: 'rgba(0, 0, 0, 0.2)',
            borderBottomWidth: 1,
            marginTop: 10
            }}
            />
        </View>
        <ScrollView>
        <View>
            <View style={{ display:'flex', justifyContent: 'flex-start'  }}>
                <Text style={{fontSize:20, lineHeight:40 , marginLeft:25}}>21st December, 2021</Text>    
            </View>
            <View style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Image
                source={{
                uri: 'https://www.digitrac.in/pub/media/magefan_blog/Wheat_crop.jpg',
                }} style={{ width:150, height:150 , justifyContent:'center'}}
                />
            </View>
            <Text style={{fontSize:20,  marginLeft:25}}>Wheat was best suited crop for your soil</Text>
            <View
            style={{
            borderBottomColor: 'rgba(0, 0, 0, 0.2)',
            borderBottomWidth: 1,
            marginTop: 10
            }}
            />
        </View>
        
        {/* 2nd */}

        <View>
            <View style={{ display:'flex', justifyContent: 'flex-start'  }}>
                <Text style={{fontSize:20, lineHeight:40 , marginLeft:25}}>21st December, 2021</Text>    
            </View>
            <View style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Image
                source={{
                uri: 'https://www.digitrac.in/pub/media/magefan_blog/Wheat_crop.jpg',
                }} style={{ width:150, height:150 , justifyContent:'center'}}
                />
            </View>
            <Text style={{fontSize:20,  marginLeft:25}}>Wheat was best suited crop for your soil</Text>
            <View
            style={{
            borderBottomColor: 'rgba(0, 0, 0, 0.2)',
            borderBottomWidth: 1,
            marginTop: 10
            }}
            />
        </View>
        </ScrollView>


    </View>

    );

}


const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:'#FFF',
    },
    welcomeStyle:
    {
        fontSize: 20,
        marginRight: 30,
        marginBottom:15
  
    },
    textStyle:{
        fontSize:20, 
    },
    historyBar:{
        justifyContent:'center',
        alignItems:'center',
    }
    


});
