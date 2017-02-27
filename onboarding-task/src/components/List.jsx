import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { ListItem } from './ListItem.jsx';
import { AddForm } from './AddForm';
import { EditForm } from './EditForm';

class List extends PureComponent {
  static displayName = 'List';

  static propTypes = {
    list: ImmutablePropTypes.orderedMap.isRequired,
    areEditable: ImmutablePropTypes.set.isRequired,
    addItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    startEditingItem: PropTypes.func.isRequired,
    stopEditingItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._getItemToRender = this._getItemToRender.bind(this);
  }

  _getItemToRender(item, index) {
    if (this.props.areEditable.has(item.id)) {
      return (<EditForm
        item={item}
        index={index}
        onSave={this.props.updateItem}
        onDelete={this.props.deleteItem}
        onCancel={this.props.stopEditingItem}
      />);
    }
    return <ListItem onListItemClick={this.props.startEditingItem} item={item} index={index} />;
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <pre>
            <ul className="list-group">
              {this.props.list.valueSeq().map((item, index) =>
                <li className="list-group-item" key={item.id}>
                  {this._getItemToRender(item, index)}
                </li>)
              }
              <li className="list-group-item">
                <AddForm onAdd={this.props.addItem} />
              </li>
            </ul>
          </pre>
        </div>
      </div>
    );
  }
}

export { List };
