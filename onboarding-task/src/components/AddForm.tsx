import * as React from 'react';

interface IAddFormProps {
  onAdd: (text: string) => void;
}

interface IAddFormState {
  textInput: string;
}

class AddForm extends React.PureComponent<IAddFormProps, IAddFormState> {
  static displayName = 'AddForm';

  static propTypes = {
    onAdd: React.PropTypes.func.isRequired,
  };

  constructor(props: IAddFormProps) {
    super(props);
    this.state = {
      textInput: '',
    };
    this._handleTextInputChange = this._handleTextInputChange.bind(this);
    this._add = this._add.bind(this);
  }

  _handleTextInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ textInput: event.target.value });
  }

  _add() {
    this.props.onAdd(this.state.textInput);
    this.setState({ textInput: '' });
  }

  render() {
    return (
      <form className="form-inline">
        <input
          type="text"
          className="form-control"
          id="itemText"
          value={this.state.textInput}
          onChange={this._handleTextInputChange}
        />
        <button type="button" className="btn btn-default" onClick={this._add}>Add</button>
      </form>
    );
  }
}

export { AddForm };
