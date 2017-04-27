import React, { PureComponent } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';

class List extends PureComponent {
  static displayName = 'List';

  _createListItems = () => {
    return this.props.orderedIds.map((id, index) => {
      const item = this.props.items.get(id);

      return (
        <ListGroupItem key={id}>
          <ListItem
            data={item}
            index={index}
            id={id}
          />
        </ListGroupItem>
      );
    });
  };

  render() {
    const listItems = this._createListItems();

    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <ListGroup>
              {listItems}
              <ListGroupItem>
                <CreateItemForm />
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export { List };
