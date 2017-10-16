import { deleteFailed, deleteStarted, deleteSucceeded } from '../actionCreators';
import { route } from '../../utils/constants';
import { Dispatch } from 'react-redux';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';

export type DeleteThunkActionFactory = (deps: IFactoryDependencies) => (id: string) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  deleteThunkActionFactory: DeleteThunkActionFactory;
}

export const deleteStoredItemFactory: DeleteThunkActionFactory = ({fetch, deleteThunkActionFactory}) =>
  (id: string) => (
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
        .catch((error) => {
          const deps: IFactoryDependencies = {
            fetch,
            deleteThunkActionFactory,
          };
          return dispatch(deleteFailed(id, error, deleteThunkActionFactory(deps)(id)));
        });
    });

const deleteStoredItemWithFetchAPI: (id: string) => ThunkAction = deleteStoredItemFactory({
  fetch,
  deleteThunkActionFactory: deleteStoredItemFactory,
});
export { deleteStoredItemWithFetchAPI as deleteStoredItem }
