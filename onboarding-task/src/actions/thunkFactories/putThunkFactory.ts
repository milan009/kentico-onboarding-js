import { ItemData } from '../../models/ItemData';
import { putFailed, putStarted, putSucceeded } from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { Dispatch } from 'react-redux';
import { IStore } from '../../interfaces/IStore';

export const putSavedItemFactory = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>): (item: ItemData) =>
  ThunkAction => (
  (item: ItemData) =>
    function (dispatch: Dispatch<IStore>) {
      const headers = new Headers();
      headers.append('Content-type', 'Application/json');

      const options = {
        method: 'PUT',
        headers,
        body: JSON.stringify({id: item.id, text: item.text}),
      };

      dispatch(putStarted(item));

      return fetch(`${route}/${item.id}`, options)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }
          return response.json();
        })
        .then(
          (json) => {
            dispatch(putSucceeded(json));
            return json;
          })
        .catch((error) => dispatch(putFailed(error)));
      /* dispatch(putStarted(item));

      return fetch(`${route}/${item.id}`, options)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }
          return response.json();
        })
        .then(
          (json) => {
            dispatch(putSucceeded(json));
            return json;
          })
        .then((receivedItem: IItemDTO) => dispatch(saveChange(receivedItem.id, receivedItem.text)))
        .catch((error) => dispatch(putFailed(error)));*/
    });

const putSavedItemWithFetchAPI: (item: ItemData) => ThunkAction
  = putSavedItemFactory(fetch);
export { putSavedItemWithFetchAPI as putSavedItem }
