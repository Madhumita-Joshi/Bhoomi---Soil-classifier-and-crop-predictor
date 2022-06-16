import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { CropsData } from "../models/cropData";
import { Dimensions, PixelRatio } from "react-native";
const { width, height } = Dimensions.get("window");

function Blog({ route }) {
  // console.log("Crop Name in Blog", route.params.cropId);

  const [crop, setCrop] = useState({});

  useEffect(() => {
    // fetch from server by id

    fetch("https://growise.000webhostapp.com/cropDetail.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // we will pass our input data to server
        cropId: route.params.cropId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        // assigned to state variable
        setCrop(response);
        // console.log(crop);
      })
      .catch((err) => console.log(err));

    // single crop is fetched
    return () => {
      setState({}); 
    };
}, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View key={crop.id} style={styles.crop}>
            <Image
              source={{ uri: crop.imageUrl }} 
              style={styles.image}
            />
            <Card.Title style={styles.title}>{crop.name}</Card.Title>
            <Card.Divider />
            <Text style={styles.data}>{crop.details}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  image: {
    width: width,
    height: 350,
    marginBottom: 10,
  },
  crop: {
    width: width,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
  },
  data: {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    marginBottom: 15,
  },
});

export default Blog;