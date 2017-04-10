import { Fetch } from '../IFetch';
import { Dispatch } from '../Dispatch';
import { fetchItemsFailure, fetchItemsRequest, fetchItemsSuccess } from '../actionCreators';
import { IItemServerModel } from '../../models/IItemServerModel';

const fetchItems = (fetch: Fetch) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchItemsRequest());

    return fetch('/api/v1/items')
      .then( (response: Response) => response.json() )
      .then( (json: IItemServerModel[]) => dispatch(fetchItemsSuccess(json)))
      .catch( (error: Error) => dispatch(fetchItemsFailure(error)));
  };
};

export const fetchItemsFactory = (fetch: Fetch) => () => fetchItems(fetch);
