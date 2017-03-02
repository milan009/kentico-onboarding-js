import React, { PureComponent } from 'react';

import { ListItemFormContainer } from '../containers/ListItemFormContainer';
import { ListItemLabelContainer } from '../containers/ListItemLabelContainer';

class ListItem extends PureComponent {

  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      formDisplayed: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired,
    }),
  };

  render() {
    return (this.props.item.formDisplayed)
      ? (<ListItemFormContainer
        item={this.props.item}
      />)
      : (<ListItemLabelContainer
        item={this.props.item}
      />);
  }
}

export { ListItem };
