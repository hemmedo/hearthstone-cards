import React, { PureComponent } from "react";
import {
  Text,
  Container,
  Content,
  Header,
  Left,
  Right,
  Title,
  Body,
  ListItem,
  Button,
  List,
  Icon
} from "native-base";

import { connect } from "react-redux";

// Styles

class LaunchScreen extends PureComponent {
  onMechanicPress = value => {
    this.props.navigation.navigate("CardScreen", {mechanic: value});
  };
onSearchPress = () => {
    this.props.navigation.navigate("CardScreen", {mechanic: null, isSearch: true});
  };
  render() {
    return (
      <Container>
        <Header iosBarStyle={"light-content"}>
          <Left />
          <Body>
            <Title>Card Mechanics</Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={this.onSearchPress}>
              <Text>Search Card</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {this.props.mechanics.length > 0
              ? this.props.mechanics.map((mechanic, index) => {
                  return (
                    <ListItem
                      key={index}
                      onPress={() => this.onMechanicPress(mechanic)}
                    >
                      <Left>
                        <Text>{mechanic}</Text>
                      </Left>
                      <Right>
                      <Icon name="arrow-forward" />
                      </Right>
                    </ListItem>
                  );
                })
              : null}
          </List>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    fetching: state.hs.fetching,
    cards: state.hs.cards,
    mechanics: state.hs.mechanics
  };
};



export default connect(
  mapStateToProps,
  null
)(LaunchScreen);
