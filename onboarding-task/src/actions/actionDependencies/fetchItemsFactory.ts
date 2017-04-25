import { Fetch } from '../Fetch';
import { Dispatch } from '../Dispatch';
import { fetchItemsFailure, fetchItemsRequest, fetchItemsSuccess } from '../actionCreators';
import { IItemServerModel } from '../../models/IItemServerModel';
import { parseResponse } from '../../utils/ajaxUtils';


const fetchItems = (fetch: Fetch) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchItemsRequest());

    return fetch('/api/v1/items')
      .then((response: Response) => parseResponse<IItemServerModel[]>(response))
      .then((json: IItemServerModel[]) => dispatch(fetchItemsSuccess(json)))
      .catch((error: Error) => dispatch(fetchItemsFailure(error)));
  };
};

export const fetchItemsFactory = (fetch: Fetch) => () => fetchItems(fetch);
