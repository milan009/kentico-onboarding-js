import {IAction} from '../interfaces/IAction';
import { fetchItemsRequest, fetchItemsSuccess, fetchItemsFailure} from './fetchItemsActionCreators';
import { IThenable } from 'promise';

type dispatchType = (action: IAction) => IAction;

interface FetchedItem {
  id: string;
  text: string;
}

type fetchType = (path: string, parameters?: any) => IThenable<Response>;

const fetchItems = (fetchParam: fetchType) => {
  return (dispatch: dispatchType) => {
    dispatch(fetchItemsRequest());

    return fetchParam('/api/Items')
      .then<FetchedItem[]>((response: Response) => response.json())
      .then<IAction>((json: FetchedItem[]) => dispatch(fetchItemsSuccess(json)))
      .catch<IAction>((response: Response) => dispatch(fetchItemsFailure(response.text())));
  };
};

const fetchItemsFactory = (fetchParam: fetchType) => () => fetchItems(fetchParam);

export { fetchItemsFactory };
