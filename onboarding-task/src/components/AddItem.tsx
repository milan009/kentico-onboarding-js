import * as React from 'react';

interface IAddItemProps {
  onItemAdd: (text: string) => void;
}

interface IAddItemState {
  text: string;
}

class AddItem extends React.PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItem';
  static propTypes = {
    onItemAdd: React.PropTypes.func.isRequired,
  };

  constructor(props: IAddItemProps) {
    super(props);
    this.state = { text: '' };

    this._onInputChange = this._onInputChange.bind(this);
    this._createNewItem = this._createNewItem.bind(this);
  }

  _onInputChange(e: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({ text: e.currentTarget.value });
  }

  _createNewItem() {
    this.props.onItemAdd(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <tr>
        <td>
          <div className="form-inline">
            <div className="form-group">
              <input className="form-control" type="text" value={this.state.text} onChange={this._onInputChange} />
            </div>
            <div className="form-group">
              <input className="btn btn-default" type="button" value="Add" onClick={this._createNewItem} />
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export { AddItem };
