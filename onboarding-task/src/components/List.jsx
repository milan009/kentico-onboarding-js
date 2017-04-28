import React, { PureComponent, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';

class List extends PureComponent {
  static displayName = 'List';

  static propTypes = {
    orderedIds: PropTypes.object.isRequired,
  };

  render() {
    const listItems = this.props.orderedIds.map((id, index) => {
      return (
        <ListGroupItem key={id}>
          <ListItem
            id={id}
            index={index}
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

export { List };
