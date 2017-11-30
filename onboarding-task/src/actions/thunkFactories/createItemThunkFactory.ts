import { Dispatch } from 'redux';

import {/* emptyUuid,*/ route } from '../../utils/constants';
import { createItemFailed, createItemStarted, createItemSucceeded } from '../actionCreators';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { fetchJsonResponse } from '../../utils/fetchJsonResponse';
import { IItemDTO } from '../../interfaces/IItemDTO';

type PostThunkActionFactory = (dependencies: IFactoryDependencies) => (newText: string) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  optimisticUpdatedGenerator: () => string;
  postThunkActionFactory: PostThunkActionFactory;
}

export const postItemThunkFactory: PostThunkActionFactory = (dependencies) =>
  (newText: string) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    headers.append('Content-type', 'Application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({/*id: emptyUuid, */text: newText}),
    };

    const optimisticUpdateId = dependencies.optimisticUpdatedGenerator();
    dispatch(createItemStarted(optimisticUpdateId, newText));

    try {
      const item = await fetchJsonResponse<IItemDTO>({fetch: dependencies.fetch, input: route, init: options});
      return dispatch(createItemSucceeded(optimisticUpdateId, item));

    } catch (error) {
      return dispatch(createItemFailed(optimisticUpdateId, error, dependencies.postThunkActionFactory(dependencies)(newText)));
    }
  };
