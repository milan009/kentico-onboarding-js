interface IAction {
  type: string;
  payload: { id: string; text?: string; };
}

export { IAction };
