interface IItemView {
  readonly guid: string;
  readonly text: string;
  readonly isEdited: boolean;
  readonly index: number;
}

export { IItemView };
