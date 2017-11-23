import { ItemFlags } from '../../models/ItemFlags';
import { IAction } from '../../interfaces/IAction';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,
  POST_REQUEST_FAIL,
  PUT_REQUEST_FAIL,
  PUT_REQUEST_STARTED,
  PUT_REQUEST_SUCCESS,
} from '../../actions/actionTypes';

const defaultState = new ItemFlags();

export const itemFlagsReducer = (state: ItemFlags = defaultState, action: IAction): ItemFlags => {
  switch (action.type) {
    case ITEM_MAKE_EDITABLE:
      return state.typedMerge({isBeingEdited: true});

    case ITEM_CHANGE_CANCELLED:
      return state.typedMerge({isBeingEdited: false});

    case DELETE_REQUEST_STARTED:
    case PUT_REQUEST_STARTED:
      return state.typedMerge({isBeingEdited: false, isStored: false, requestError: null});

    case PUT_REQUEST_SUCCESS:
      return state.typedMerge({isStored: true, isBeingEdited: false});

    case PUT_REQUEST_FAIL:
    case DELETE_REQUEST_FAIL: {
      return state.typedMerge(new ItemFlags({isStored: true, requestError: action.payload}));
    }

    case POST_REQUEST_FAIL: {
      return state.typedMerge(new ItemFlags({isStored: false, requestError: action.payload}));
    }

    default:
      return state;
  }
};
