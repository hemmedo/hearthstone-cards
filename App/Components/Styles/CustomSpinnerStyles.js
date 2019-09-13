import Scaling from "../../Themes/Scaling";

export default {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "grey",
    opacity: 0.8
  },
  spinnerContainer: {
    backgroundColor: "#504D4D",
    borderRadius: Scaling.moderateScale(10),
    padding: Scaling.moderateScale(10)
  },
  text: {
    fontSize: Scaling.moderateScale(16),
    color: "white",
    fontWeight: "bold"
  }
};
