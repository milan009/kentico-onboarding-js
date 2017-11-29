import { Dispatch } from 'redux';

import {
  deleteFailed,
  deleteStarted,
  deleteSucceeded,
} from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';

export type DeleteThunkActionFactory = (dependencies: IFactoryDependencies) => (id: string) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  deleteThunkActionFactory: DeleteThunkActionFactory;
}

export const deleteStoredItemFactory: DeleteThunkActionFactory = (dependencies) =>
  (id: string) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    const init = {
      method: 'DELETE',
      headers,
    };

    dispatch(deleteStarted(id));

    try {
      const response = await dependencies.fetch(`${route}/${id}`, init);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return dispatch(deleteSucceeded(id));

    } catch (error) {

      return dispatch(deleteFailed(id, error, dependencies.deleteThunkActionFactory(dependencies)(id)));
    }
  };
