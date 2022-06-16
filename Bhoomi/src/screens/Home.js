import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImageView from "react-native-image-viewing";
import { SimpleLineIcons, Feather, MaterialIcons } from "@expo/vector-icons";

export default function Home({ navigation, route }) {
  console.log("UserID ", route.params.userId);
  const [name, setName] = useState('');
  // componentDidMount()
  useEffect(() => {
    fetch("http://growise.000webhostapp.com/profile.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // we will pass our input data to server
        userId: route.params.userId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setName(response.name);
      })
      .catch((err) => console.log(err));
  });

  const [image, setImage] = useState(null);
  const [images, setImages] = useState([
    {
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
  ]);

  const [visible, setIsVisible] = useState(false);

  const showImageToModal = async () => {
    console.log("Show Image to Modal");

    addImageToArray();

    console.log(images);

    setModalVisibleTrue();
  };

  const setModalVisibleTrue = () => {
    setIsVisible(true);
  };

  const addImageToArray = () => {
    images.splice(0, images.length);
    images.push({
      uri: image,
    });

    setImages(images);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync();

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function takePhoto() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // higher res on iOS
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }
    setImage(result.uri);
  }

  // http://growise.000webhostapp.com/upload.php
  const uploadImage = async () => {
    let url = "http://growise.000webhostapp.com/upload.php"; // server url
    if (image != null) {
      console.log("initial image" + image);
      let localUri = image;
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append("photo", { uri: localUri, name: filename, type });
      // formData.append('userId', JSON.stringify({userId : route.params.userId}) );

      console.log(formData);

      let response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "User-Id": route.params.userId,
        },
      });

      if (response.ok) {
        // if HTTP-status is 200-299
        console.log("Image value Prior " + image);
        // get the response body (the method explained below)
        console.log("reponse" + response);

        let json = await response.json();
        console.log(json);
        setImage(null);
        console.log("Image value " + image);
        navigation.navigate('Result',  { userId : route.params.userId });
      } else {
        alert("HTTP-Error: " + response.status);
      }
    } else {
      alert("Please, First Choose Photo!");
    }
  };

  const logo = require("../../assets/Bhoomi.png");
  var width = Dimensions.get("window").width; //full width
  var height = Dimensions.get("window").height; //full height

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#FFF",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View>
          <Image
            source={logo}
            style={{
              width: 200,
              height: 200,
              marginLeft: -30,
              marginRight: 50,
            }}
          ></Image>
        </View>

        <View>
          <Text style={styles.welcomeStyle}>Hello {name}</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#418a40",
          padding: 20,
          // marginTop: -30,
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            width: width,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Welcome
        </Text>

        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            width: width,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {name} !
        </Text>
      </View>

      <ScrollView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {/* Previous History */}

          <TouchableOpacity
            style={styles.historybutton}
            onPress={() => {
              navigation.navigate("History", { userId : route.params.userId });
            }}
          >
            <Text style={{ fontSize: 22, alignSelf: "center" }}>
              <MaterialIcons name="history" size={20} color="black" /> Previous
              History
            </Text>
          </TouchableOpacity>

          {/* Choose Photo from Gallery */}
          <TouchableOpacity style={styles.historybutton} onPress={pickImage}>
            <Text style={{ fontSize: 22, alignSelf: "center" }}>
              <MaterialIcons name="photo-library" size={20} color="black" />{" "}
              Choose Photo From Gallery
            </Text>
          </TouchableOpacity>

          {/* Take Photo from Camera */}
          <TouchableOpacity style={styles.historybutton} onPress={takePhoto}>
            <Text style={{ fontSize: 22, alignSelf: "center" }}>
              <MaterialIcons name="photo-library" size={20} color="black" />{" "}
              Take Photo From Camera
            </Text>
          </TouchableOpacity>

          {image && (
            <TouchableOpacity onPress={showImageToModal}>
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          )}

          <ImageView
            images={images}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />

          {/* Upload Image */}
          <TouchableOpacity style={styles.historybutton} onPress={uploadImage}>
            <Text style={{ fontSize: 22, alignSelf: "center" }}>
              <Feather name="upload" size={20} color="black" /> Upload Image
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.historybutton}
            onPress={() => {
              navigation.navigate("Profile", { userId : route.params.userId });
            }}
          >
            <Text style={{ fontSize: 22, alignSelf: "center" }}> Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.historybutton}
            onPress={() => {
              navigation.navigate("Catalog",{ name: name }
);
            }}
          >
            <Text style={{ fontSize: 22, alignSelf: "center" }}> Catalog</Text>
          </TouchableOpacity>

          {/* Crop Catalog */}
          {/* <TouchableOpacity
        style={styles.cropCatalog}
         
      >
      <Text style={{fontSize:22, alignSelf:'center', color:'white'}}>Crop Catalog</Text>
      </TouchableOpacity> */}

          {/* Logo */}
        </View>
      </ScrollView>

      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Take Photo" onPress={takePhotoAndUpload} />
      <Button color='pink' style={{color:'black'}} title="Upload" onPress={uploadImage} />
    </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  welcomeStyle: {
    fontSize: 20,
    marginRight: 30,
    marginBottom: 15,
  },
  welcomeBar: {
    backgroundColor: "lightblue",
    padding: 20,
    marginTop: -20,
  },
  welcomeContent: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  historybutton: {
    backgroundColor: "#fee9bf",
    color: "#47525E",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    alignContent: "center",
    marginBottom: 13,
    marginTop: 10,
    borderRadius: 20,
  },
  cropCatalog: {
    backgroundColor: "green",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    alignContent: "center",
    marginBottom: 15,
    marginTop: 15,
  },
});
