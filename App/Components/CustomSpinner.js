import React from 'react';
import {Modal} from 'react-native';
import {Text, View, Spinner} from 'native-base';
import styles from "./Styles/CustomSpinnerStyles";
const CustomSpinner = ({visible, message}) => {
  return (
    <Modal
      visible={visible}
      animationType={'none'}
      transparent={true}
      onRequestClose={() => {}}>
      <View
        style={styles.container}>
        <View
          style={styles.spinnerContainer}>
          <Spinner textContent={'Loading...'} color={'red'} size={"large"}/>
          <Text
            style={styles.text}>
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomSpinner;
