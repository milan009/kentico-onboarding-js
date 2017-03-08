import { IPayload } from './IPayload';

export interface IItemAction {
    type: string;
    payload?: IPayload | any;
}