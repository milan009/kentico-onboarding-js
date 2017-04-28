import React, { PureComponent, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';

class List extends PureComponent {
  static displayName = 'List';

  render() {
    const listItems = this.props.orderedIds.map((id, index) => {
      const item = this.props.itemsByIds.get(id);

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

List.propTypes = {
  itemsByIds: PropTypes.object.isRequired, // TODO object is too general
  orderedIds: PropTypes.object.isRequired,
};

export { List };
