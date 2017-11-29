import { Dispatch } from 'redux';

import {
  deleteFailed,
  deleteStarted,
  deleteSucceeded,
} from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { fetchJsonResponse } from '../../utils/fetchJsonResponse';

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
    const url = `${route}/${id}`;

    dispatch(deleteStarted(id));

    try {
      await fetchJsonResponse({fetch: dependencies.fetch, input: url, init});
      return dispatch(deleteSucceeded(id));

    } catch (error) {

      return dispatch(deleteFailed(id, error, dependencies.deleteThunkActionFactory(dependencies)(id)));
    }
  };
