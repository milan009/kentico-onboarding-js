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
      const response = await dependencies.fetch(route);

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      dispatch(fetchingSucceeded(json));
      return await dispatch(dependencies.parseThunkAction(json));

    } catch (error) {
      return dispatch(fetchingFailed(error, dependencies.getThunkActionFactory(dependencies)()));
    }
  };
