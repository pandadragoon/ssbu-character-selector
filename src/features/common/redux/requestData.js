import {
  COMMON_REQUEST_DATA_BEGIN,
  COMMON_REQUEST_DATA_SUCCESS,
  COMMON_REQUEST_DATA_FAILURE,
  COMMON_REQUEST_DATA_DISMISS_ERROR,
} from './constants';

import axios from 'axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function requestData(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_REQUEST_DATA_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const root = process.env.NODE_ENV === 'production' ? '/ssbu-character-selector' : '';
      const doRequest = axios.get(root + '/data.json');
      doRequest.then(
        (res) => {
          dispatch({
            type: COMMON_REQUEST_DATA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: COMMON_REQUEST_DATA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissRequestDataError() {
  return {
    type: COMMON_REQUEST_DATA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_REQUEST_DATA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        requestDataPending: true,
        requestDataError: null,
      };

    case COMMON_REQUEST_DATA_SUCCESS:
      // The request is success
      
      return {
        ...state,
        requestDataPending: false,
        requestDataError: null,
        questions: normalizeData(action.data.data.questions),
        characters: normalizeData(action.data.data.characters),
        answers: normalizeData(action.data.data.answers)
      };

    case COMMON_REQUEST_DATA_FAILURE:
      // The request is failed
      return {
        ...state,
        requestDataPending: false,
        requestDataError: action.data.error,
      };

    case COMMON_REQUEST_DATA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        requestDataError: null,
      };

    default:
      return state;
  }
}

function normalizeData(data){
  let normalizedData = {};
  data.forEach(item => {
    normalizedData[item.id] = item;
  });

  return normalizedData;
}