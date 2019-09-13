import React, { PureComponent } from "react";
import { Image, TouchableOpacity, FlatList } from "react-native";
import {
  Text,
  Container,
  Content,
  Header,
  Left,
  Right,
  Title,
  Body,
  Item,
  Input,
  Button,
  Icon
} from "native-base";
import CardFlip from "react-native-card-flip";
import debounce from "lodash/debounce";
import HearthstoneActions from "../Redux/HearthstoneRedux";
import { connect } from "react-redux";

// Styles
import styles from "./Styles/CardScreenStyles";

class CardScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardsByMechanic: [],
      isSearchActive: this.props.navigation.state.params.isSearch,
      searchParam: ""
    };
  }
  handleTextChange = text => {
    this.setState({ searchParam: text });
    this.sendTextChange(text);
  };
  sendTextChange = text => {
    this.props.searchCard(text);
  };
  
  componentDidMount() {
    this.sendTextChange = debounce(this.sendTextChange, 500);

    const mechanic = this.props.navigation.state.params.mechanic;

    if (mechanic && this.props.cards.length > 0) {
      let cardsByMechanic = [];
      const allCards = this.props.cards;
      for (let i = 0; i < allCards.length; i++) {
        for (let j = 0; j < allCards[i].mechanics.length; j++) {
          if (mechanic == allCards[i].mechanics[j].name) {
            cardsByMechanic.push(allCards[i]);
          }
        }
      }
      this.setState({ cardsByMechanic });
    }
  }
  renderCard = card => {
    return (
      <CardFlip
        style={styles.cardContainer}
        ref={value => (this["card" + card.index] = value)}
        key={card.index}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => this["card" + card.index].flip()}
        >
          <Image
            source={{ uri: card.item.img }}
            style={{
              width: "100%",
              height: 380,
              resizeMode: "contain",
              alignSelf: "center"
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card2}
          onPress={() => this["card" + card.index].flip()}
        >
          <Body>
            <Text style={styles.text}>
              {"Name: " + (card.item.name ? card.item.name : "-")}
            </Text>
            <Text style={styles.text}>
              {"Card Set: " + (card.item.cardSet ? card.item.cardSet : "-")}
            </Text>
            <Text style={styles.text}>
              {"Type: " + (card.item.type ? card.item.type : "-")}
            </Text>
            <Text style={styles.text}>
              {"Faction: " + (card.item.faction ? card.item.faction : "-")}
            </Text>
            <Text style={styles.text}>
              {"Rarity: " + (card.item.rarity ? card.item.rarity : "-")}
            </Text>
            <Text style={styles.text}>
              {"Cost: " + (card.item.cost ? card.item.cost : "-")}
            </Text>
            <Text style={styles.text}>
              {"Attack: " + (card.item.attack ? card.item.attack : "-")}
            </Text>
            <Text style={styles.text}>
              {"Health: " + (card.item.health ? card.item.health : "-")}
            </Text>
            <Text style={styles.text}>
              {"Flavor: " + (card.item.flavor ? card.item.flavor : "-")}
            </Text>
            <Text style={styles.text}>
              {"Artist: " + (card.item.artist ? card.item.artist : "-")}
            </Text>
            <Text style={styles.text}>
              {"Collectible: " +
                (card.item.collectible ? card.item.collectible : "-")}
            </Text>
            <Text style={styles.text}>
              {"Elite: " + (card.item.elite ? card.item.elite : "-")}
            </Text>
            <Text style={styles.text}>
              {"Race: " + (card.item.race ? card.item.race : "-")}
            </Text>
            <Text style={styles.text}>
              {"Player Class: " +
                (card.item.playerClass ? card.item.playerClass : "-")}
            </Text>
          </Body>
        </TouchableOpacity>
      </CardFlip>
    );
  };

  toggleSearch = () => {
    this.setState({ isSearchActive: !this.state.isSearchActive });
  };

  render() {
    const mechanic = this.props.navigation.state.params.mechanic;

    return (
      <Container>
        {this.state.isSearchActive ? (
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onChangeText={this.handleTextChange}
                value={this.state.searchParam}
                ref={input => {
                  this.search = input;
                }}
                autoFocus={true}
              />
            </Item>
            <Right>
              <Button hasText transparent onPress={this.toggleSearch}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          </Header>
        ) : (
          <Header iosBarStyle={"light-content"}>
            <Left>
              <Button
                iconLeft
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{mechanic}</Title>
            </Body>
            <Right>
              <Button hasText transparent onPress={this.toggleSearch}>
                <Text>Search Card</Text>
              </Button>
            </Right>
          </Header>
        )}
        <Content>
          {this.state.isSearchActive ? (
            <FlatList
              contentContainerStyle={styles.container}
              data={this.props.cardsBySearch}
              renderItem={this.renderCard}
              removeClippedSubviews={true}
              maxToRenderPerBatch={3}
              updateCellsBatchingPeriod={25}
              initialNumToRender={2}
              getItemLayout={(data, index) => ({
                length: 380,
                offset: 380 * index,
                index
              })}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <FlatList
              contentContainerStyle={styles.container}
              data={this.state.cardsByMechanic}
              renderItem={this.renderCard}
              removeClippedSubviews={true}
              maxToRenderPerBatch={3}
              updateCellsBatchingPeriod={25}
              initialNumToRender={2}
              getItemLayout={(data, index) => ({
                length: 380,
                offset: 380 * index,
                index
              })}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    cards: state.hs.cards,
    cardsBySearch: state.hs.cardsBySearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchCard: searchByParam =>
      dispatch(HearthstoneActions.cardsearchRequest(searchByParam))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardScreen);
