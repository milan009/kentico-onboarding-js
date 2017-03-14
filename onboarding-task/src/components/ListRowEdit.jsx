import React from 'react';

class ListRowEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.item.text };

    this._onItemUpdate = this._onItemUpdate.bind(this);
    this._onItemDelete = this._onItemDelete.bind(this);
    this._onItemCancel = this._onItemCancel.bind(this);
    this._onTextChange = this._onTextChange.bind(this);
  }

  _onTextChange(event) {
    this.setState({ text: event.target.value });
  }

  _onItemUpdate(event) {
    this.props.onItemUpdate(this.props.item.id, this.state.text);
    event.preventDefault();
  }

  _onItemDelete(event) {
    this.props.onItemDelete(this.props.item.id);
    event.preventDefault();
  }

  _onItemCancel(event) {
    this.props.onItemCancel(this.props.item.id);
    event.preventDefault();
  }

  render() {
    return (
      <div className="list-group-item">
        <div className="form-inline">
          {this.props.children}
          <input type="text" className="form-control" defaultValue={this.state.text} onChange={this._onTextChange} />
          <input type="button" className="btn btn-primary" value="Save" onClick={this._onItemUpdate} />
          <input type="button" className="btn btn-default" value="Cancel" onClick={this._onItemCancel} />
          <input type="button" className="btn btn-danger" value="Delete" onClick={this._onItemDelete} />
        </div>
      </div>
    );
  }
}

ListRowEdit.propTypes = {
  item: React.PropTypes.object,
  children: React.PropTypes.node,
  onItemUpdate: React.PropTypes.func,
  onItemDelete: React.PropTypes.func,
  onItemCancel: React.PropTypes.func,
};

export default ListRowEdit;
