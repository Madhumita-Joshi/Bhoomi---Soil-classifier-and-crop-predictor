import React, {Component , useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager , Dimensions} from "react-native";
import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import Data from "./Data";

export default function Accordion1(props) {

    width = Dimensions.get('window').width; //full width

    const [data , setData ] = useState(props.data);
    const [expanded , setExpanded ] = useState(false);

    React.useEffect(()=>{
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        console.log('Accordion1 ' + expanded);
        setExpanded(true);
        console.log('Accprdion after change  ' + expanded);

    },[]);

    toggleExpand=()=>{
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        
        // this.setState({expanded : !this.state.expanded})
        console.log(expanded + '' +  !expanded);

        setExpanded(!expanded);
        console.log(expanded);
      }
  

    // constructor(props) {
    //     super(props);
    //     this.state = { 
    //       data: props.data,
    //       expanded : false,
    //     }

    //     if (Platform.OS === 'android') {
    //         UIManager.setLayoutAnimationEnabledExperimental(true);
    //     }
    // }
  
//   render() {

    return (
       <View>
            <TouchableOpacity style={{width:this.width,      flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: Colors.CGRAY }} onPress={()=>toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{props.title}</Text>
                <Icon name={ expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                expanded &&
                <View style={styles.child}>
                    <Text>{props.data}</Text>    
                </View>
            }
            
       </View>
    )
  }

  

// }

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: Colors.DARKGRAY,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: Colors.CGRAY,
    },
    parentHr:{
        height:1,
        color: Colors.WHITE,
        width:'100%'
    },
    child:{
        backgroundColor: Colors.LIGHTGRAY,
        padding:16,
    }
    
});