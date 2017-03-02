import React, { PureComponent } from 'react';

import { ListItemFormContainer } from '../containers/ListItemFormContainer';
import { ListItemLabel } from './ListItemLabel';

class ListItem extends PureComponent {

  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      formDisplayed: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired,
    }),
    onLabelClick: React.PropTypes.func.isRequired,
  };

  render() {
    return (this.props.item.formDisplayed)
      ? (<ListItemFormContainer
        item={this.props.item}
      />)
      : (<ListItemLabel
        text={this.props.item.text}
        index={this.props.item.index}
        onClick={this.props.onLabelClick}
      />);
  }
}

export { ListItem };
