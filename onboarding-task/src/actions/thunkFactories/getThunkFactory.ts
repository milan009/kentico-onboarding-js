import { Dispatch } from 'react-redux';

import {
  fetchingFailed,
  fetchingSucceeded,
  startFetchingItems,
} from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { IItemDTO } from '../../interfaces/IItemDTO';
import { parseItems } from './parseThunkFactory';

export type GetThunkActionFactory = (deps: IFactoryDependencies) => () => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  getThunkActionFactory: GetThunkActionFactory;
  parseThunkAction: (json: IItemDTO[]) => ThunkAction;
}

export const getItemsFactory: GetThunkActionFactory = ({fetch, getThunkActionFactory, parseThunkAction}: IFactoryDependencies) =>
  () => async (dispatch: Dispatch<IStore>) => {
    dispatch(startFetchingItems());

    try {
      const response = await fetch(route);

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      dispatch(fetchingSucceeded(json));
      return await dispatch(parseThunkAction(json));

    } catch (error) {
      const deps: IFactoryDependencies = {
        fetch,
        getThunkActionFactory,
        parseThunkAction
      };
      return dispatch(fetchingFailed(error, getThunkActionFactory(deps)()));
    }
  };

const getItemsWithFetchAPIAndResponseParser: () => ThunkAction = getItemsFactory({
  fetch,
  getThunkActionFactory: getItemsFactory,
  parseThunkAction: parseItems,
});

export { getItemsWithFetchAPIAndResponseParser as getItems }
