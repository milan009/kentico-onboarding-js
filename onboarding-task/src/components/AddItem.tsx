import * as React from 'react';
import { IAction } from '../interfaces/IAction';

interface IAddItemCallbackProps {
  onAdd: (text: string) => IAction;
}

interface IAddItemState {
  text: string;
}

class AddItem extends React.PureComponent<IAddItemCallbackProps, IAddItemState> {
  static displayName = 'AddItem';

  static propTypes = {
    onAdd: React.PropTypes.func.isRequired,
  };

  constructor(props: IAddItemCallbackProps) {
    super(props);
    this.state = { text: '' };
  }

  _handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ text: event.currentTarget.value });
  };

  _handleClickAdd = () => {
    this.props.onAdd(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <div className="form-inline">
        <input className="form-control" onChange={this._handleChange} value={this.state.text} />
        <button type="button" className="btn btn-default" onClick={this._handleClickAdd}>Add</button>
      </div>
    );
  }
}

export { AddItem };
