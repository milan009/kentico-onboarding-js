import { Dispatch } from 'redux';

import {
  fetchItemsFailed,
  fetchItemsSucceeded,
  fetchItemsStarted,
} from '../actionCreators';
import { route } from '../../utils/constants';
import { IStore } from '../../interfaces/IStore';
import { IItemDTO } from '../../interfaces/IItemDTO';
import { ThunkAction } from '../../interfaces/IAction';
import { fetchJsonResponse } from '../../utils/fetchJsonResponse';

type FetchItemsThunkActionFactory = (dependencies: IFactoryDependencies) => () => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  getThunkActionFactory: FetchItemsThunkActionFactory;
}

export const fetchItemsThunkFactory: FetchItemsThunkActionFactory = (dependencies) =>
  () => async (dispatch: Dispatch<IStore>) => {
    dispatch(fetchItemsStarted());

    try {
      const items = await fetchJsonResponse<IItemDTO[]>({fetch: dependencies.fetch, input: route});
      return dispatch(fetchItemsSucceeded(items));

    } catch (error) {
      return dispatch(fetchItemsFailed(error, dependencies.getThunkActionFactory(dependencies)()));
    }
  };
