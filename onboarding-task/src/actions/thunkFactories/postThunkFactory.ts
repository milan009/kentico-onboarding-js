import * as uuidV4 from 'uuid';
import { Dispatch } from 'react-redux';

import { emptyUuid, route } from '../../utils/constants';
import { postFailed, postStarted, postSucceeded } from '../actionCreators';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';

export type PostThunkActionFactory = (deps: IFactoryDependencies) => (newText: string) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  optimisticUpdatedGenerator: () => string;
  postThunkActionFactory: PostThunkActionFactory;
}

export const postNewItemFactory: PostThunkActionFactory = ({fetch, optimisticUpdatedGenerator, postThunkActionFactory}: IFactoryDependencies) =>
  (newText: string) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    headers.append('Content-type', 'Application/json');

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({id: emptyUuid, text: newText}),
    };

    const optimisticUpdateId = optimisticUpdatedGenerator();
    dispatch(postStarted(optimisticUpdateId, newText));

    try {
      const response = await fetch(route, options);

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      return dispatch(postSucceeded(optimisticUpdateId, json));

    } catch (error) {
      const deps: IFactoryDependencies = {
        fetch,
        optimisticUpdatedGenerator: () => optimisticUpdateId,
        postThunkActionFactory
      };

      return dispatch(postFailed(optimisticUpdateId, error, postThunkActionFactory(deps)(newText)));
    }
  };

const postNewItemWithFetchAPIAndUUIDV4: (newText: string) => ThunkAction = postNewItemFactory({
  fetch,
  optimisticUpdatedGenerator: uuidV4,
  postThunkActionFactory: postNewItemFactory
});
export { postNewItemWithFetchAPIAndUUIDV4 as postNewItem };
