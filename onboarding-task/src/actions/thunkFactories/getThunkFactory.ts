import {
  fetchingFailed, fetchingSucceeded, parseItems,
  startFetchingItems
} from '../actionCreators';
import { route } from '../../utils/constants';
import { Dispatch } from 'react-redux';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';

export type GetThunkActionFactory = (deps: IFactoryDependencies) => () => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  getThunkActionFactory: GetThunkActionFactory;
}

export const getItemsFactory: GetThunkActionFactory = ({fetch, getThunkActionFactory}: IFactoryDependencies) =>
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
        .then((action) => dispatch(parseItems(action.payload.items)))
        .catch((error) => {
          const deps: IFactoryDependencies = {
            fetch,
            getThunkActionFactory,
          };
          return dispatch(fetchingFailed(error, getThunkActionFactory(deps)()));
        });
    });

const getItemsWithFetchAPI: () => ThunkAction = getItemsFactory({
  fetch,
  getThunkActionFactory: getItemsFactory,
});
export { getItemsWithFetchAPI as getItems }
