import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    width: 300,
    height: 380,
    marginBottom: 10,
    marginTop: 10
  },
  card: {
    width: 300,
    height: 380,
    backgroundColor: "transparent",
    borderRadius: 5,
    borderColor: "#c19a6b",
    borderWidth: 1
  },
  card2: {
    width: 300,
    height: 380,
    backgroundColor: "#492201",
    borderRadius: 5,
    borderColor: "#c19a6b",
    borderWidth: 1,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    paddingTop: 10,
    shadowOpacity: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#F7F7F7"
  }
});
