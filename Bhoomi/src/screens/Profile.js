import { View, SafeAreaView, StyleSheet } from "react-native";
import React, { Component, useState, useEffect } from "react";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

export default Profile = ({ navigation, route }) => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [name , setName] = useState('');

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
        setState(response.state);
        setCity(response.city);
        setNumber(response.number);
      })
      .catch((err) => console.log(err));
  });

  return (
    <SafeAreaView>
      <View style={styles.userInfoArea}>
        <View
          style={{
            flexDirection: "column",
            marginTop: 40,
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <Avatar.Image
            source={{
              uri: "https://thumbs.dreamstime.com/b/icon-profile-color-green-icon-profile-color-green-circle-color-dark-green-background-color-white-194702090.jpg",
            }}
            size={100}
            style={{ marginLeft: 25 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 25,
                  marginBottom: 5,
                },
              ]}
            >
              Hello {name}
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoArea}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="green" size={20} />
          <Text style={{ color: "rgb(119, 119, 119)", marginLeft: 20 }}>
            Maharashtra, Mumbai
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="green" size={20} />
          <Text style={{ color: "rgb(119, 119, 119)", marginLeft: 20 }}>
            +91-{number}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="green" size={20} />
          <Text style={{ color: "rgb(119, 119, 119)", marginLeft: 20 }}>
            {name}@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("Home", { userId : route.params.userId });
          }}
        >
          <View style={styles.menuItem}>
            <Icon1 name="home-outline" color="rgba(0,255,0,1)" size={25} />
            <Text style={styles.menuItemText}>Home</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("Catalog", { name: name });
          }}
        >
          <View style={styles.menuItem}>
            <Icon2 name="collections" color="rgba(0,255,0,1)" size={25} />
            <Text style={styles.menuItemText}>Catalog</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("History",{ userId : route.params.userId });
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="history" color="rgba(0,255,0,1)" size={25} />
            <Text style={styles.menuItemText}>History</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="rgba(0,255,0,0.5)" size={25} />
            <Text style={styles.menuItemText}>Share </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon
              name="account-check-outline"
              color="rgba(0,255,0,0.5)"
              size={25}
            />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <View style={styles.menuItem}>
            <Feather name="edit" color="rgba(0,255,0,0.5)" size={25} />
            <Text style={styles.menuItemText}>Update Profile</Text>
          </View>
        </TouchableRipple> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoArea: {
    paddingHorizontal: 30,
    marginBottom: 5,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
