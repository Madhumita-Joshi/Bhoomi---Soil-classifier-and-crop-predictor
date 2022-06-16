import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

const logo = require("../../assets/Bhoomi.png");

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;

class CropCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "WHEAT",
      data1: [],
    };
  }

  componentDidMount() {
    // get all crops from server

    fetch("https://growise.000webhostapp.com/cropDetails.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        this.setState({ data1: response });
        // console.log(this.state.data1);
      })
      .catch((err) => console.log(err));
  }

  handlePress = (item) => {
    this.setState({ value: item }, () => {
      this.props.navigation.navigate("Blog", { cropId: this.state.value });
    });
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    // isValue=this.state.favorites.includes(item)

    return (
      <ScrollView>
        <TouchableOpacity
          // onPress={()=>{this.props.navigation.navigate('Blog', {
          //       cropName: this.handlePress(item.name)
          //     });}}
          onPress={() => {
            this.handlePress(item.id);
          }}
        >
          <View style={styles.item}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 130, height: 100, marginTop: 0 }}
            ></Image>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  render() {
    return (
      <>
        <View
          style={{
            backgroundColor: "#FFF",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
            {/* <Text style={styles.welcomeStyle}>Hello {this.props.name}</Text> */}
          </View>
        </View>
        <FlatList
          data={formatData(this.state.data1, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
        <View style={styles.footer}>
          <Text style={{ fontSize: 12, color: "white" }}>
            Click on any image to Know More!
          </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -25,
    backgroundColor: "#FFF",
  },
  welcomeStyle: {
    fontSize: 20,
    marginRight: 30,
    marginBottom: 15,
  },
  item: {
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 2,
    height: Dimensions.get("window").width / numColumns, // approximate a square\
    borderWidth: 0.1,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#000",
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    backgroundColor: "#418a40",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CropCatalog;
