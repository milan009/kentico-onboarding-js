import { deleteFailed, deleteStarted, deleteSucceeded } from '../actionCreators';
import { route } from '../../utils/constants';

export const deleteStoredItemFactory = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>): (id: string) => any => (
  (id: string) =>
    function (dispatch: any) {
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
        .catch((error) => dispatch(deleteFailed(error)));
    });

const deleteStoredItemWithFetchAPI = deleteStoredItemFactory(fetch);
export { deleteStoredItemWithFetchAPI as deleteStoredItem }
