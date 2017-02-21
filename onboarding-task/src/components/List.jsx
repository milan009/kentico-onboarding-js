import React, { Component, PropTypes } from 'react';
import ListItemEditable from './ListItemEditable.jsx';
import ListItemStatic from './ListItemStatic.jsx';
import AddItem from './AddItem.jsx';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { toggleEditMode, deleteItem, updateItem } from '../actions/actionCreators.js';


class List extends Component {
  static displayName = 'List';
  static propTypes = {
    items: ImmutablePropTypes.mapOf(
      ImmutablePropTypes.recordOf({
        guid: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        isEdited: React.PropTypes.bool.isRequired,
      }),
    ),
    onToggleEditMode: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._deleteItem = this._deleteItem.bind(this);
    this._saveItem = this._saveItem.bind(this);
    this._toggleEditMode = this._toggleEditMode.bind(this);
    this._getItemToRender = this._getItemToRender.bind(this);
  }

  _deleteItem(guid) {
    this.props.onDelete(guid);
  }

  _saveItem(guid, text) {
    this.props.onUpdate(guid, text);
  }

  _toggleEditMode(guid) {
    this.props.onToggleEditMode(guid);
  }

  _getItemToRender(item, index) {
    return (item.get('isEdited'))
      ? (<ListItemEditable
        key={item.get('guid')}
        item={item}
        onDelete={this._deleteItem}
        onSave={this._saveItem}
        onCancel={this._toggleEditMode}
      />)
      : (<ListItemStatic
        key={item.get('guid')}
        item={item}
        onClick={this._toggleEditMode}
      />);
  }

  render() {
    const items = this.props.items.valueSeq();
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <table className="table table-bordered">
            <tbody>
            {items.map(this._getItemToRender)}
              <AddItem />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleEditMode: (guid) => dispatch(toggleEditMode(guid)),
    onDelete: (guid) => dispatch(deleteItem(guid)),
    onUpdate: (guid, text) => dispatch(updateItem(guid, text)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(List);
