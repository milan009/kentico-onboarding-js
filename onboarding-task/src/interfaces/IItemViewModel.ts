export interface IItemViewModel {
  readonly id: string;
  readonly text: string;
  readonly formDisplayed: boolean;
  readonly index: number;
  readonly savedOnServer: boolean;
}
