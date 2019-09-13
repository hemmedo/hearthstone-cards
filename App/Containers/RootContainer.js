import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import HearthstoneActions from '../Redux/HearthstoneRedux';
import CustomSpinner from '../Components/CustomSpinner';

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    this.props.getAllCards();
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
        <CustomSpinner
          visible={this.props.fetching}
          message={this.props.isSearching ? "Searching the card..." : 'Getting all cards with mechanics...'}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.hs.fetching,
    isSearching: state.hs.isSearching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCards: () => dispatch(HearthstoneActions.cardRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
