import React = require('react');

import { IAction } from '../interfaces/IAction';
import { ListItemSavedFlag } from './ListItemSavedFlag';
import { ListItemValidatedInput } from './ListItemValidatedInput';

interface IListItemFormProps {
  index: number;
  inputValue: string;
  savedOnServer: boolean;
  onFormSubmit: (input: string) => IAction;
  onFormCancelClick: () => IAction;
  onFormDeleteClick: () => IAction;
}

interface IListItemFormState {
  input: string;
}

class ListItemForm extends React.PureComponent<IListItemFormProps, IListItemFormState> {

  static displayName = 'ListItemForm';

  constructor(props: IListItemFormProps) {
    super(props);

    this.state = {
      input: props.inputValue,
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._isValid = this._isValid.bind(this);
  }

  _isValid(input: string) {
    return input !== '';
  }

  _onInputChange(input: string) {
    this.setState({ input });
  }

  _onSubmit(event: any) {
    event.preventDefault();
    this.props.onFormSubmit(this.state.input);
  }

  render() {
    return (
      <div className="container-fluid">
        <form className="form-inline col-md-10" onSubmit={this._onSubmit}>
          {this.props.index}. <ListItemValidatedInput onInputChange={this._onInputChange} input={this.state.input} />
        <button type="submit" className="btn btn-primary" disabled={!this._isValid(this.state.input)} > Change</button>
        <button type="button" className="btn btn-default" onClick={this.props.onFormCancelClick}> Cancel</button>
        <button type="button" className="btn btn-danger" onClick={this.props.onFormDeleteClick}> Delete</button>
      </form>
      <ListItemSavedFlag saved={this.props.savedOnServer}/>
    </div>
    );
  }
}

export { ListItemForm };
