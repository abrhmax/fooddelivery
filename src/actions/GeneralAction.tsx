import {StorageService} from '../services/StorageService';

const types = {
  SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
  SET_TOKEN: 'SET_TOKEN',
  SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
};

const SetIsAppLoading = isAppLoading => {
  return {
    type: types.SET_IS_APP_LOADING,
    payload: isAppLoading,
  };
};

const setToken = token => {
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
};

const appStart = () => {
  return (dispatch, getState) => {
    StorageService.getFirstTimeUse().then(isFirstTimeUse => {
      dispatch({
        type: types.SET_FIRST_TIME_USE,
        payload: isFirstTimeUse ? false : true,
      });
    });
    StorageService.getToken().then(token => {
      if (token) {
        dispatch({
          type: types.SET_TOKEN,
          payload: token,
        });
      }
    });
    dispatch({
      type: types.SET_IS_APP_LOADING,
      payload: false,
    });
  };
};

export default {SetIsAppLoading, setToken, types, appStart};
