export const ACTIONS = {
  USER_SIGNUP: 'userSignup',
  USER_LOGIN: 'userLogin',
  USER_LOGOUT: 'userLogout',
  USER_ADD_FAVORITE: 'userAddFavorite',
  USER_REMOVE_FAVORITE: 'userRemoveFavorite',
  USER_ADD_WATCHLIST: 'userAddWatchlist',
  USER_REMOVE_WATCHLIST: 'userRemoveWatchlist',
  USER_ADD_DIARY: 'userAddDiary',
  USER_REMOVE_DIARY: 'userRemoveDiary',
  USER_UPDATE_LOGGED_IN_STATE: 'userSetLoggedInState',
  USER_UPDATE_USER: 'userUpdateUser',
};

export const MUTATIONS = {
  USER_SET_LOGGED_IN_STATE: 'userSetLoggedInState',
  USER_SET_USER: 'userSetUser',
};

export const MODULE_NAME = 'user';
