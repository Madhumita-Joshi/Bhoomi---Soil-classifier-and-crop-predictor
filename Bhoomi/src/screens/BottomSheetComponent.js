import React, { useState } from 'react';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';



const BottomSheetComponent = (props) => {

  console.log(props.visible);

  const [isVisible, setIsVisible] = useState(props.visible);
  const [image, setImage] = useState('https://thumbs.dreamstime.com/b/icon-profile-color-green-icon-profile-color-green-circle-color-dark-green-background-color-white-194702090.jpg');

    
  // choose photo from gallery
  async function pickImage() {
     console.log("Pick Image from Gallery");
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync();

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setIsVisible(false);
    }
  };
  // choose photo by camera

  async function takePhoto() {

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // higher res on iOS
      aspect: [4, 3],
    });
  
    if (result.cancelled) {
      return;
    }
    setImage(result.uri);
    setIsVisible(false);
  }






  const list = [
    { title: 'Choose Photo from Gallery' , 
    onPress: () =>{ pickImage() } ,
    },
    { title: 'Take Photo by Camera' , 
    onPress: () =>{ takePhoto() } ,
    },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <SafeAreaProvider>
      {/* <Button
        title="Open Bottom Sheet"
        onPress={() => setIsVisible(true)}
        buttonStyle={styles.button}
      /> */}
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default BottomSheetComponent;