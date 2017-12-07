import { Dispatch } from 'redux';

import { route } from '../../utils/constants';
import { createItemFailed, createItemStarted, createItemSucceeded } from '../actionCreators';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { fetchJsonResponse } from '../../utils/fetchJsonResponse';
import { IItemDTO } from '../../interfaces/IItemDTO';

type CreateItemThunkActionFactory = (dependencies: IFactoryDependencies) => (newText: string) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  optimisticUpdatedGenerator: () => string;
  postThunkActionFactory: CreateItemThunkActionFactory;
}

export const createItemThunkFactory: CreateItemThunkActionFactory = (dependencies) =>
  (newText: string) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    headers.append('Content-type', 'Application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({text: newText}),
    };

    const optimisticUpdateId = dependencies.optimisticUpdatedGenerator();
    dispatch(createItemStarted(optimisticUpdateId, newText));

    try {
      const item = await fetchJsonResponse<IItemDTO>({fetch: dependencies.fetch, input: route, init: options});
      return dispatch(createItemSucceeded(optimisticUpdateId, item));

    } catch (error) {
      const retryAction = dependencies.postThunkActionFactory(dependencies)(newText);
      const createFailedAction = createItemFailed(optimisticUpdateId, error, retryAction);

      return dispatch(createFailedAction);
    }
  };
