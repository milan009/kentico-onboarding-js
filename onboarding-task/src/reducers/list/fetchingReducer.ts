import { IAction } from '../../interfaces/IAction';
import { FETCH_STARTED } from '../../actions/actionTypes';
import { FETCH_SUCCESS } from '../../actions/actionTypes';
import { FETCH_FAIL } from '../../actions/actionTypes';

const defaultState = false;

export const fetchingReducer = (state: boolean = defaultState, action: IAction): boolean => {
  switch (action.type) {
    case FETCH_STARTED:
      return true;

    case FETCH_SUCCESS:
    case FETCH_FAIL:
      return false;

    default:
      return state;
  }
};
