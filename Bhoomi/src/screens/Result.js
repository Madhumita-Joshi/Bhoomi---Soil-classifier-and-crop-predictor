import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TopHeader from "../components/component";
import { SimpleLineIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Accordion from "../components/Accordion";

export default function Result({ navigation, route }) {
  const [menu, setMenu] = useState([
    {
      id: 1,
      cropName: "Crop",
      cropDetails: "Details",
    },
  ]);

  const [cropImage, setcropImage] = useState(
    "https://www.digitrac.in/pub/media/magefan_blog/Wheat_crop.jpg"
  );
  const [name, setName] = useState("");
  const [soilType, setSoitType] = useState("");

  // useEffect(() => {
  //     fetch('http://localhost/soil/fetch.php').then(Response=>Response.json()).then(res =>
  //     console.log(res)
  //     ).catch(err => console.log(err));
  // })

  // function calldjango()
  // {
  //     fetch('http://192.168.0.107:80/soil/fetch.php').then(Response=>Response.json()).then(res =>
  //     console.log(res)
  //     ).catch(err => console.log(err));
  // }

  const logo = require("../../assets/Bhoomi.png");
  var width = Dimensions.get("window").width; //full width
  var height = Dimensions.get("window").height; //full height

  function renderAccordians() {
    const items = [];
    for (let item of menu) {
      items.push(
        <Accordion
          key={item.id}
          title={item.cropName}
          data={item.cropDetails}
        />
      );
    }
    return items;
  }

  // get latest image ->

  // connect to api and get soil recommedation
  data = JSON.stringify({
    headline: "Testing",
    url: "https://growise.000webhostapp.com/images/1648486701_5c801972-03f0-4c28-827e-d3f30733698e.jpg",
  });

  useEffect(() => {
    fetch("http://growise.000webhostapp.com/profile.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // we will pass our input data to server
        // userId: route.params.userId,
        userId: route.params.userId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setName(response.name);
      })
      .catch((err) => console.log(err));

    fetch("http://growise.000webhostapp.com/result.php", {
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
        console.log("http://growise.000webhostapp.com/" + response.path);
        setcropImage("http://growise.000webhostapp.com/" + response.path);
        console.log(cropImage);
      })
      .catch((err) => console.log(err));

    // single crop is fetched
    return () => {
      setState({});
    };
  }, []);

  // connect to api and get soil recommedation
  connectDjango();

  function connectDjango() {
    data = JSON.stringify({
      headline: "Testing",
      url: cropImage,
    });

    //let csrftoken = getCookie('csrftoken');
    fetch("http://192.168.240.59:8000", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-CSRFToken": "csrftoken",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.crop_response);

        crop_arr = res.crop_response.split(",");

        crop_arr.map((crop) => console.log(crop));

        crop_menu = [];
        setSoitType(crop_arr[crop_arr.length - 1]);

        for (let i = 0; i < crop_arr.length - 1; i++) {
          console.log("for loop " + crop_arr[i]);
          let general_data =
            "A crop is a plant that can be grown and harvested extensively for profit or subsistence.Crops may refer either to the harvested parts or to the harvest in a more refined state.";

          // // get crop details
          // let crop_detail = '';
          // fetch('https://growise.000webhostapp.com/cropDetailsResult.php', {
          //     method: "POST",
          //     headers : {
          //       "Accept" : "application/json",
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       // we will pass our input data to server
          //        cropName : crop_arr[i]
          //     }),

          //   }).then(response => response.json()).then( response => {
          //     console.log(response);
          //     // assigned to state variable

          //     console.log(response);
          //     crop_detail = response;

          //   }).catch( err => console.log(err));

          // // get crop details

          crop_menu.push({
            id: crop_arr[i],
            cropName: crop_arr[i],
            cropDetails: general_data.substring(0, 100 + Math.random() * (120 - 100)),
          });
        }
        setMenu(crop_menu);
      });
  }

   return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#FFF",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: -30,
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

      <ScrollView>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            marginTop: 20
          }}
        >
          <View>
            <Image
              source={{
                uri: cropImage,
              }}
              style={{
                width: width - 10,
                height: 150,
                justifyContent: "center",
              }}
            />
            {/* latest image uploaded */}
          </View>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <TouchableOpacity 
            style={styles.reuploadButton}
            onPress={() => {
              navigation.navigate("Home",  { userId : route.params.userId })}}
          >
            <Text style={{ fontSize: 22, alignSelf: "center", color: "white" }}>
              <Feather name="upload" size={20} color="white" /> Re-upload Image
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity style={styles.headerType}>
            <Text
              style={{
                fontSize: 22,
                alignSelf: "center",
                color: "#C46200",
                fontWeight: "bold",
              }}
            >
              Soil Type - {soilType}
            </Text>
          </TouchableOpacity>

          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Crop Recommendations
            </Text>
            <View
              style={{
                borderBottomColor: "rgba(0, 255, 0, 1)",
                borderBottomWidth: 1.5,
              }}
            />
          </View>
        </View>

        <View style={styles.container}>{renderAccordians()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  welcomeStyle: {
    fontSize: 20,
    marginRight: 30,
    marginBottom: 15,
  },
  textStyle: {
    fontSize: 20,
  },
  historyBar: {
    justifyContent: "center",
    alignItems: "center",
  },
  reuploadButton: {
    width: 250,
    backgroundColor: "rgba(0, 230, 64,1)",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    alignContent: "center",
    marginBottom: 13,
    marginTop: 15,
    borderRadius: 20,
  },

  headerType: {
    width: 350,
    backgroundColor: "#FFD5AA",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    alignContent: "center",
    marginBottom: 5,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
  },
});
