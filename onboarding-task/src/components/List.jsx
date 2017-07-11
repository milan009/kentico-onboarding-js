import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OrderedMap } from 'immutable';

import { AddItem } from '../containers/AddItemContainer';
import { ListItem } from './ListItem';

class List extends PureComponent {

  static displayName = 'List';

  static propTypes = {
    items: PropTypes.instanceOf(OrderedMap).isRequired,
  };

  render() {
    const existingItems = this.props.items.valueSeq().map((item, index) =>
      (<ListItem
        index={index + 1}
        item={item}
        key={item.id}
      />)
    );

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ol className="list-group">
            {existingItems}
            <AddItem />
          </ol>
        </div>
      </div>
    );
  }
}

export { List as ListComponent };
