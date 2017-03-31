import { IAction } from '../actions/IAction';

type TDispatch = ( action: IAction |( (dispatch: TDispatch) => Promise<IAction>) | ( (dispatch: TDispatch) => IAction)) => IAction;

export { TDispatch as Dispatch};
