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


export type GetThunkActionFactory = (dependencies: IFactoryDependencies) => () => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  getThunkActionFactory: GetThunkActionFactory;
  parseThunkAction: (json: IItemDTO[]) => ThunkAction;
}

export const getItemsFactory: GetThunkActionFactory = (dependencies) =>
  () => async (dispatch: Dispatch<IStore>) => {
    dispatch(startFetchingItems());

    try {
      const json: IItemDTO[] = await fetchJsonResponse({fetch: dependencies.fetch, input: route});
      dispatch(fetchingSucceeded(json));
      return await dispatch(dependencies.parseThunkAction(json));

    } catch (error) {
      return dispatch(fetchingFailed(error, dependencies.getThunkActionFactory(dependencies)()));
    }
  };
