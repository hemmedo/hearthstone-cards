import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cardRequest: null,
  cardSuccess: ["cards", "mechanics"],
  cardFailure: null,
  cardsearchRequest: ["searchByParam"],
  cardsearchSuccess: ["cardsBySearch"],
  cardsearchFailure: null
});

export const HearthstoneTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  cards: [],
  cardsBySearch: [],
  mechanics: [],
  fetching: false,
  isSearching: false
});

/* ------------- Reducers ------------- */

export const request = state => state.merge({ fetching: true });

export const success = (state, action) => {
  const { cards, mechanics } = action;
  return state.merge({ fetching: false, cards, mechanics });
};

export const failure = () => {
  return INITIAL_STATE;
};

export const searchRequest = (state, { searchByParam }) =>
  state.merge({ fetching: true, isSearching: true });

export const searchSuccess = (state, action) => {
  const { cardsBySearch } = action;
  return state.merge({ fetching: false, cardsBySearch, isSearching: false });
};

export const searchFailure = state =>
  state.merge({ fetching: false, isSearching: false, cardsBySearch: [] });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CARD_REQUEST]: request,
  [Types.CARD_SUCCESS]: success,
  [Types.CARD_FAILURE]: failure,
  [Types.CARDSEARCH_REQUEST]: searchRequest,
  [Types.CARDSEARCH_SUCCESS]: searchSuccess,
  [Types.CARDSEARCH_FAILURE]: searchFailure
});
