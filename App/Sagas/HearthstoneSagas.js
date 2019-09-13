import { call, put } from "redux-saga/effects";
import HearthstoneActions from "../Redux/HearthstoneRedux";

export function* getAllCards(api) {
  const response = yield call(api.getAllCards);

  if (response.ok) {
    const allCards = response.data;
    let allCardsWithMechanics = [];
    let allMechanics = [];
    const expansionsCount = Object.keys(allCards).length;
    for (let i = 0; i < expansionsCount; i++) {
      if (
        Object.keys(allCards)[i] == "Promo" ||
        Object.keys(allCards)[i] == "Credits" ||
        Object.keys(allCards)[i] == "System" ||
        Object.keys(allCards)[i] == "Debug"
      ) {
        continue;
      }
      let expansionCards = allCards[Object.keys(allCards)[i]];
      for (let j = 0; j < expansionCards.length; j++) {
        const card = expansionCards[j];
        if (!card) {
          continue;
        }
        if (!card.hasOwnProperty("mechanics") || !card.mechanics) {
          continue;
        }
        const mechanics = card.mechanics;
        if (Array.isArray(mechanics) && mechanics.length > 0) {
          //IF CARD CONTAINS A MECHANIC, ADD IT, OTHERWISE SKIP TO NEXT
          allCardsWithMechanics.push(card);
          for (let z = 0; z < mechanics.length; z++) {
            //ADD ONLY THE UNIQUE MECHANIC TO AVOID DUPLICATION
            if (allMechanics.includes(mechanics[z].name)) {
              continue;
            }
            allMechanics.push(mechanics[z].name);
          }
        }
      }
      expansionCards = null;
    }

    yield put(
      HearthstoneActions.cardSuccess(allCardsWithMechanics, allMechanics)
    );
  } else {
    yield put(HearthstoneActions.cardFailure());
  }
}

export function* searchCard(api, action) {
  let { searchByParam } = action;

  const response = yield call(api.searchCards, searchByParam);

  if (response.ok) {
    const cards = response.data;
    let allCardsWithMechanics = [];
    for (let j = 0; j < cards.length; j++) {
      const card = cards[j];
      if (!card) {
        continue;
      }
      if (
        (!card.hasOwnProperty("mechanics") || !card.mechanics) &&
        (!card.hasOwnProperty("text") || !card.text)
      ) {
        continue;
      }
      const mechanics = card.mechanics;
      if (
        (card.text && card.text.length > 0) ||
        (Array.isArray(mechanics) && mechanics.length > 0)
      ) {
        //IF CARD CONTAINS A MECHANIC, ADD IT, OTHERWISE SKIP TO NEXT
        allCardsWithMechanics.push(card);
      }
    }
    yield put(HearthstoneActions.cardsearchSuccess(allCardsWithMechanics));
  } else {
    yield put(HearthstoneActions.cardsearchFailure());
  }
}
