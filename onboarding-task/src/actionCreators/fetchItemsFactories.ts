import { IAction } from '../interfaces/IAction';
import { fetchItemsRequest, fetchItemsSuccess, fetchItemsFailure} from './fetchItemsActionCreators';
import { IFetchedItem } from '../interfaces/IFetchedItem';
import { dispatchType } from '../utils/dispatchType';
require('isomorphic-fetch');

type fetchType = (path: string, parameters?: any) => Promise<Response>;

const fetchItems = (fetchParam: fetchType) => {
  return (dispatch: dispatchType) => {
    dispatch(fetchItemsRequest());

    return fetchParam('/api/Items')
      .then<IFetchedItem[]>((response: Response) => response.json())
      .then<IAction>((json: IFetchedItem[]) => dispatch(fetchItemsSuccess(json)))
      .catch<string>((response: Response) => response.text())
      .then<IAction>((text: string) => dispatch(fetchItemsFailure(text)));
  };
};

const fetchItemsFactory = (fetchParam: fetchType) => () => fetchItems(fetchParam);

export { fetchItemsFactory };
