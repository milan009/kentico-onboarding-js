import { Dispatch } from 'react-redux';

import {
  deleteFailed,
  deleteStarted,
  deleteSucceeded,
} from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';

export type DeleteThunkActionFactory = (deps: IFactoryDependencies) => (id: string) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  deleteThunkActionFactory: DeleteThunkActionFactory;
}

export const deleteStoredItemFactory: DeleteThunkActionFactory = ({fetch, deleteThunkActionFactory}) =>
  (id: string) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    const init = {
      method: 'DELETE',
      headers,
    };

    dispatch(deleteStarted(id));

    try {
      const response = await fetch(`${route}/${id}`, init);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return dispatch(deleteSucceeded(id));

    } catch (error) {
      const deps: IFactoryDependencies = {
        fetch,
        deleteThunkActionFactory,
      };

      return dispatch(deleteFailed(id, error, deleteThunkActionFactory(deps)(id)));
    }
  };

const deleteStoredItemWithFetchAPI: (id: string) => ThunkAction = deleteStoredItemFactory({
  fetch,
  deleteThunkActionFactory: deleteStoredItemFactory,
});
export { deleteStoredItemWithFetchAPI as deleteStoredItem }
