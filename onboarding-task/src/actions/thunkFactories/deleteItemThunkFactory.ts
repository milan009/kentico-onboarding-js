import { Dispatch } from 'redux';

import {
  deleteItemFailed,
  deleteItemStarted,
  deleteItemSucceeded,
} from '../actionCreators';
import { controllerUrl } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { fetchJsonResponse } from '../../utils/fetchJsonResponse';

type DeleteItemThunkActionFactory = (dependencies: IFactoryDependencies) => (id: string) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  deleteThunkActionFactory: DeleteItemThunkActionFactory;
}

export const deleteItemThunkFactory: DeleteItemThunkActionFactory = (dependencies) =>
  (id: string) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    const init = {
      method: 'DELETE',
      headers,
    };
    const url = `${controllerUrl}/${id}`;

    dispatch(deleteItemStarted(id));

    try {
      await fetchJsonResponse({fetch: dependencies.fetch, input: url, init});
      return dispatch(deleteItemSucceeded(id));

    } catch (error) {

      return dispatch(deleteItemFailed(id, error, dependencies.deleteThunkActionFactory(dependencies)(id)));
    }
  };
