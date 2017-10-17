import { Dispatch } from 'react-redux';

import {
  fetchingFailed, fetchingSucceeded,
  startFetchingItems
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
  () => (
    function (dispatch: Dispatch<IStore>) {
      dispatch(startFetchingItems());

      return fetch(route)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }

          return response.json();
        })
        .then((json) => dispatch(fetchingSucceeded(json)))
        .then((action) => dispatch(parseThunkAction(action.payload.items)))
        .catch((error) => {
          const deps: IFactoryDependencies = {
            fetch,
            getThunkActionFactory,
            parseThunkAction
          };
          return dispatch(fetchingFailed(error, getThunkActionFactory(deps)()));
        });
    });

const getItemsWithFetchAPIAndResponseParser: () => ThunkAction = getItemsFactory({
  fetch,
  getThunkActionFactory: getItemsFactory,
  parseThunkAction: parseItems,
});
export { getItemsWithFetchAPIAndResponseParser as getItems }
