import { deleteFailed, deleteStarted, deleteSucceeded } from '../actionCreators';
import { route } from '../../utils/constants';
import { Dispatch } from 'react-redux';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';

export const deleteStoredItemFactory = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>): (id: string) =>
  ThunkAction => (
  (id: string) =>
    function (dispatch: Dispatch<IStore>) {
      const headers = new Headers();
      const init = {
        method: 'DELETE',
        headers,
      };

      dispatch(deleteStarted(id));

      return fetch(`${route}/${id}`, init)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }

          return response;
        })
        .then(() => {
          return dispatch(deleteSucceeded(id));
        })
        .catch((error) => dispatch(deleteFailed(error, deleteStoredItemFactory(fetch)(id))));
    });

const deleteStoredItemWithFetchAPI: (id: string) => ThunkAction = deleteStoredItemFactory(fetch);
export { deleteStoredItemWithFetchAPI as deleteStoredItem }
