import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { ListItemFormContainer } from '../containers/ListItemFormContainer';
import { ListItemLabelContainer } from '../containers/ListItemLabelContainer';

class ListItem extends Component {

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      formDisplayed: React.PropTypes.bool.isRequired,
    }),
  };

  render() {
    return (this.props.item.formDisplayed)
      ? (<ListItemFormContainer
        id={this.props.item.id}
      />)
      : (<ListItemLabelContainer
        id={this.props.item.id}
      />);
  }
}

export { ListItem };
