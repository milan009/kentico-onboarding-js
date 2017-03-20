import TsPromise from 'ts-promise';
require('isomorphic-fetch');

import { IAction } from '../interfaces/IAction';
import { fetchItemsRequest, fetchItemsSuccess, fetchItemsFailure} from './fetchItemsActionCreators';
import { IFetchedItem } from '../interfaces/IFetchedItem';
import { dispatchType } from '../utils/dispatchType';
import { fetchType } from '../utils/fetchType';

const fetchItems = (fetchParam: fetchType) => {
  return (dispatch: dispatchType) => {
    dispatch(fetchItemsRequest());

    return fetchParam('/api/Items')
      .then<IFetchedItem[] | string>((response: Response) => response.ok ? response.json() : TsPromise.reject(new Error(response.statusText)))
      .then<IAction>((json: IFetchedItem[]) => dispatch(fetchItemsSuccess(json)))
      .catch<IAction>((error: Error) => dispatch(fetchItemsFailure(error.message)));
  };
};

const fetchItemsFactory = (fetchParam: fetchType) => () => fetchItems(fetchParam);

export { fetchItemsFactory };
