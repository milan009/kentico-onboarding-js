import { Dispatch } from 'react-redux';
import { IAction } from '../actions/IAction';

type TDispatch = Dispatch<(action: IAction) => IAction>;

export { TDispatch as Dispatch};
