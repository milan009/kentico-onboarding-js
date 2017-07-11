import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { AddItem } from '../containers/AddItem';
import { ListItem } from '../containers/ListItem';

class List extends PureComponent {

  static displayName = 'List';

  static propTypes = {
    itemIds: ImmutablePropTypes.iterableOf(PropTypes.string).isRequired,
  };

  render() {
    const existingItems = this.props.itemIds.map((id, index) =>
      (<ListItem
        index={index + 1}
        id={id}
        key={id}
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

export { List };
