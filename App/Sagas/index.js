import { takeLatest, all } from "redux-saga/effects";
import API from "../Services/Api";

/* ------------- Types ------------- */

import { HearthstoneTypes } from "../Redux/HearthstoneRedux";

/* ------------- Sagas ------------- */

import { getAllCards } from "./HearthstoneSagas";
import { searchCard } from "./HearthstoneSagas";

/* ------------- API ------------- */

const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(HearthstoneTypes.CARD_REQUEST, getAllCards, api),
    takeLatest(HearthstoneTypes.CARDSEARCH_REQUEST, searchCard, api)
  ]);
}
