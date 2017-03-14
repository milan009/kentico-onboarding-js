import {IAction} from '../interfaces/IAction';
import { fetchItemsRequest, fetchItemsSuccess, fetchItemsFailure} from './fetchItemsActionCreators';

type dispatchType = (action: IAction) => IAction;

interface FetchedItem {
  id: string;
  text: string;
}

type fetchType = (path: string, parameters?: any) => any;

const fetchItems = (fetchParam: fetchType) => {
  return (dispatch: dispatchType) => {
    dispatch(fetchItemsRequest());

    return fetchParam('/api/Items')
      .then((response: Response) => response.json())
      .then((json: FetchedItem[]) => dispatch(fetchItemsSuccess(json)))
      .catch((response: Response) => dispatch(fetchItemsFailure(response.text())));
  };
};

const fetchItemsFactory = (fetchParam: fetchType) => () => fetchItems(fetchParam);

export { fetchItemsFactory };
