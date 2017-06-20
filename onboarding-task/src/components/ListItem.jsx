import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ViewItem } from './ViewItem';
import { EditItem } from './EditItem';

class ListItem extends Component {

  static displayName = 'ListItem';

  static propTypes = {
    index: PropTypes.number,
    element: PropTypes.shape({
      text: PropTypes.string,
      id: PropTypes.string,
      isEdited: PropTypes.bool,
    }),
    saveChange: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired,
  };

  _getCorrectComponent = () => {
    if (this.props.element.isEdited) {
      return (<EditItem
        index={this.props.index}
        element={this.props.element}
        removeElement={this.props.removeElement}
        saveChange={this.props.saveChange}
      />);
    }
    return (<ViewItem
      index={this.props.index}
      element={this.props.element}
      onClick={this.props.saveChange}
    />);
  };

  render() {
    return (
      <li className="list-group-item">
        {this._getCorrectComponent()}
      </li>);
  }
}

export { ListItem };
