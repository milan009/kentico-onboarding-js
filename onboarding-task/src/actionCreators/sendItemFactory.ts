
import { IAction } from '../interfaces/IAction';
import { IFetchedItem } from '../interfaces/IFetchedItem';
import { dispatchType } from '../utils/dispatchType';
import { sendItemSuccess, sendItemFailure } from './sendItemActionCreators';
import { fetchType } from '../utils/fetchType';
import { parseJsonResponse } from '../utils/jsonResponseParser';

const sendItem = (fetchParam: fetchType, item: IFetchedItem) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  return (dispatch: dispatchType) =>
    fetchParam('/api/v1/Items', { method: 'POST', body: JSON.stringify(item), headers: myHeaders })
      .then<IFetchedItem | string>(parseJsonResponse)
      .then<IAction>((json: IFetchedItem) => dispatch(sendItemSuccess(json)))
      .catch<IAction>((error: Error) => dispatch(sendItemFailure(error.message, item.ueid)));
};

const sendItemFactory = (fetchParam: fetchType) => (item: IFetchedItem) => sendItem(fetchParam, item);

export { sendItemFactory };
