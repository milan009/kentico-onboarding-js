import {IAction} from '../interfaces/IAction';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from '../constants/actionTypes';
import { convertGetAllResponseResponse } from '../utils/convertResponse';

const fetchItemsRequest = (): IAction => {
  return {
    type: FETCH_ITEMS_REQUEST,
    payload: {},
  };
};

const fetchItemsSuccess = (response: string): IAction => {
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: {
      response: response,
    },
  };
};

const fetchItemsFailure = (response: string): IAction => {
  return {
    type: FETCH_ITEMS_FAILURE,
    payload: {
      response: response,
    },
  };
};

type dispatchType = (action: IAction) => IAction;

interface FetchedItem {
  id: string;
  text: string;
}

const fetchItems = () => {
  return (dispatch: dispatchType) => {
    dispatch(fetchItemsRequest());

    return fetch('/api/Items')
      .then((response: Response) => response.json())
      .then((json: FetchedItem[]) => convertGetAllResponseResponse(json))
      .catch((response: Response) => dispatch(fetchItemsFailure(response.text())));
  };
};

export { fetchItemsRequest, fetchItemsFailure, fetchItemsSuccess, fetchItems };
