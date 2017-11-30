import { Dispatch } from 'redux';

import {
  deleteItemFailed,
  deleteItemStarted,
  deleteItemSucceeded,
} from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { fetchJsonResponse } from '../../utils/fetchJsonResponse';

type DeleteThunkActionFactory = (dependencies: IFactoryDependencies) => (id: string) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  deleteThunkActionFactory: DeleteThunkActionFactory;
}

export const deleteItemThunkFactory: DeleteThunkActionFactory = (dependencies) =>
  (id: string) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    const init = {
      method: 'DELETE',
      headers,
    };
    const url = `${route}/${id}`;

    dispatch(deleteItemStarted(id));

    try {
      await fetchJsonResponse({fetch: dependencies.fetch, input: url, init});
      return dispatch(deleteItemSucceeded(id));

    } catch (error) {

      return dispatch(deleteItemFailed(id, error, dependencies.deleteThunkActionFactory(dependencies)(id)));
    }
  };
