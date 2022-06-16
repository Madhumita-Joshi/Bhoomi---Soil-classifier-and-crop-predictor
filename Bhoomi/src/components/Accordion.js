import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager , Dimensions} from "react-native";
import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/AntDesign";


export default class Accordion extends Component{

   width = Dimensions.get('window').width; //full width

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    toggleExpand=()=>{
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded : !this.state.expanded})
      }




  
  render() {

    return (
    
       <View>
        <TouchableOpacity style={{width:this.width,      flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: Colors.WHITE }} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <Icon1 name={this.state.expanded ? 'minuscircle' : 'pluscircle'} size={30} color={Colors.GREEN} />
            </TouchableOpacity>
            <View
            style={{
            borderBottomColor: 'rgba(0, 255, 0, 0.7)',
            borderBottomWidth: 1,
            marginLeft:25, marginRight:20
            }}
            />
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text>{this.props.data}</Text>    
                </View>
            }
            
       </View>
    )
  }

 

}

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
        backgroundColor: Colors.WHITE,
        padding:25,
    }
    
});