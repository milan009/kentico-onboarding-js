import { Dispatch } from 'redux';

import {
  fetchingFailed,
  fetchingSucceeded,
  startFetchingItems,
} from '../actionCreators';
import { route } from '../../utils/constants';
import { IStore } from '../../interfaces/IStore';
import { IItemDTO } from '../../interfaces/IItemDTO';
import { ThunkAction } from '../../interfaces/IAction';
import { fetchJsonResponse } from '../../utils/fetchJsonResponse';

type GetThunkActionFactory = (dependencies: IFactoryDependencies) => () => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  getThunkActionFactory: GetThunkActionFactory;
}

export const getItemsFactory: GetThunkActionFactory = (dependencies) =>
  () => async (dispatch: Dispatch<IStore>) => {
    dispatch(startFetchingItems());

    try {
      const items = await fetchJsonResponse<IItemDTO[]>({fetch: dependencies.fetch, input: route});
      return dispatch(fetchingSucceeded(items));

    } catch (error) {
      return dispatch(fetchingFailed(error, dependencies.getThunkActionFactory(dependencies)()));
    }
  };
