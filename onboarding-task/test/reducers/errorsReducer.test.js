import { OrderedMap } from 'immutable';
import { errorsReducer } from '../../src/reducers/errorsReducer.ts';
import {
  GET_ITEMS_SUCCESS,
  POST_ITEM_SUCCESS,
  PUT_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  GET_ITEMS_FAILURE,
  POST_ITEM_FAILURE,
  PUT_ITEM_FAILURE,
  DELETE_ITEM_FAILURE,
  DISMISS_ERROR,
} from '../../src/actions/actionTypes.ts';
import { itParam } from 'mocha-param';

describe('Errors reducer', () => {
  const successActions = [
    GET_ITEMS_SUCCESS,
    POST_ITEM_SUCCESS,
    PUT_ITEM_SUCCESS,
    DELETE_ITEM_SUCCESS,
  ];
  const failureActions = [
    GET_ITEMS_FAILURE,
    POST_ITEM_FAILURE,
    PUT_ITEM_FAILURE,
    DELETE_ITEM_FAILURE,
  ];

  it('should return previous state on unknown action', () => {
    const state = OrderedMap({
      'key 1': 'error 1',
      'key 2': 'error 2',
    });

    const resultState = errorsReducer(state, { type: 'unknown' });

    expect(resultState).toEqual(state);
  });

  itParam(`should return empty map on actions: ${successActions.join(', ')}`, successActions, (type) => {
    const state = OrderedMap({
      'key 1': 'error 1',
      'key 2': 'error 2',
    });
    const action = {
      type,
      payload: {},
    };

    const resultState = errorsReducer(state, action);

    expect(resultState.size).toBe(0);
  });

  itParam(`should add new error messages to state on actions: ${failureActions.join(', ')}`, failureActions, (type) => {
    const state = OrderedMap({
      'key 1': 'error 1',
      'key 2': 'error 2',
    });
    const errors = ['error 3', 'error 4', 'error 5'];
    const action = {
      type,
      payload: {
        errors,
      },
    };
    const expectedErrors = [...state.toArray(), ...errors];

    const resultState = errorsReducer(state, action);

    expect(resultState.toArray()).toEqual(expectedErrors);
  });

  it(`should delete error by key on action: ${DISMISS_ERROR}`, () => {
    const key = 'idOfToBeDeletedItem';
    const state = OrderedMap({
      [key]: 'error 1',
      'key 2': 'error 2',
    });
    const action = {
      type: DISMISS_ERROR,
      payload: {
        key,
      },
    };
    const expectedResult = state.slice(1);

    const resultState = errorsReducer(state, action);

    expect(resultState).toEqual(expectedResult);
  });
});
