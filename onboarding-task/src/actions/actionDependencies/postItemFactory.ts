import { postItemFailure, postItemSuccess } from '../actionCreators';
import { Fetch } from '../IFetch';
import { Dispatch } from '../Dispatch';
import { IItemServerModel, IItemServerModelNullable } from '../../models/IItemServerModel';
import { parseResponse } from '../../utils/ajaxUtils';


const postItem = (fetch: Fetch, text: string) => {
  return (dispatch: Dispatch) => {

    const newItem: IItemServerModelNullable = {id: undefined, text };
    const requestData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    };

    return fetch('api/v1/items', requestData)
      .then( (response: Response) => parseResponse<IItemServerModel>(response))
      .then( (json: IItemServerModel) => dispatch(postItemSuccess(json)))
      .catch( (error: Error) => dispatch(postItemFailure(error)));
  };
};

export const postItemFactory = (fetch: Fetch) => (text: string) => postItem(fetch, text);
