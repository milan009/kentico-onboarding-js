
import { IAction } from '../interfaces/IAction';
import { fetchItemsRequest, fetchItemsSuccess, fetchItemsFailure} from './fetchItemsActionCreators';
import { IFetchedItem } from '../interfaces/IFetchedItem';
import { dispatchType } from '../utils/dispatchType';
import { fetchType } from '../utils/fetchType';
import { parseJsonResponse } from '../utils/jsonResponseParser';

const fetchItems = (fetchParam: fetchType) => {
  return (dispatch: dispatchType) => {
    dispatch(fetchItemsRequest());

    return fetchParam('/api/v1/Items')
      .then<IFetchedItem[] | string>(parseJsonResponse)
      .then<IAction>((json: IFetchedItem[]) => dispatch(fetchItemsSuccess(json)))
      .catch<IAction>((error: Error) => dispatch(fetchItemsFailure(error.message)));
  };
};

const fetchItemsFactory = (fetchParam: fetchType) => () => fetchItems(fetchParam);

export { fetchItemsFactory };
