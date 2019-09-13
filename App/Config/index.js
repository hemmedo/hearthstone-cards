import DebugConfig from "./DebugConfig";
import AppConfig from "./AppConfig"; // eslint-disable-line no-unused-vars

if (__DEV__) {

  console.disableYellowBox = !DebugConfig.yellowBox;
}
