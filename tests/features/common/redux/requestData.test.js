import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_REQUEST_DATA_BEGIN,
  COMMON_REQUEST_DATA_SUCCESS,
  COMMON_REQUEST_DATA_FAILURE,
  COMMON_REQUEST_DATA_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  requestData,
  dismissRequestDataError,
  reducer,
} from '../../../../src/features/common/redux/requestData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/requestData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestData succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestData())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_REQUEST_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_REQUEST_DATA_SUCCESS);
      });
  });

  it('dispatches failure action when requestData fails', () => {
    const store = mockStore({});

    return store.dispatch(requestData({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_REQUEST_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_REQUEST_DATA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRequestDataError', () => {
    const expectedAction = {
      type: COMMON_REQUEST_DATA_DISMISS_ERROR,
    };
    expect(dismissRequestDataError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_REQUEST_DATA_BEGIN correctly', () => {
    const prevState = { requestDataPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_REQUEST_DATA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.requestDataPending).toBe(true);
  });

  it('handles action type COMMON_REQUEST_DATA_SUCCESS correctly', () => {
    const prevState = { requestDataPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_REQUEST_DATA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.requestDataPending).toBe(false);
  });

  it('handles action type COMMON_REQUEST_DATA_FAILURE correctly', () => {
    const prevState = { requestDataPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_REQUEST_DATA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.requestDataPending).toBe(false);
    expect(state.requestDataError).toEqual(expect.anything());
  });

  it('handles action type COMMON_REQUEST_DATA_DISMISS_ERROR correctly', () => {
    const prevState = { requestDataError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_REQUEST_DATA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.requestDataError).toBe(null);
  });
});

