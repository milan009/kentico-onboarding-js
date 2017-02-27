import React, { Component } from 'react';

import { ListItemFormContainer } from '../containers/ListItemFormContainer';
import { ListItemLabelContainer } from '../containers/ListItemLabelContainer';

class ListItem extends Component {

  static propTypes = {
    id: React.PropTypes.string.isRequired,
    formDisplayed: React.PropTypes.bool.isRequired,
  };

  render() {
    return (this.props.formDisplayed)
      ? (<ListItemFormContainer
        id={this.props.id}
      />)
      : (<ListItemLabelContainer
        id={this.props.id}
      />);
  }
}

export default ListItem;
