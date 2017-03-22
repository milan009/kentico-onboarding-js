import React, { PureComponent, PropTypes } from 'react';
import { LineEdit } from './LineEdit.jsx';
import { LineRead } from './LineRead.jsx';

class ListItem extends PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    line: PropTypes.object,
    orderNumber: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
  };

  _renderLineItem = (line, orderNumber) => {
    if (line.isEdited) {
      return (
        <LineEdit
          line={line}
          prefixedNumber={(orderNumber + 1)}
          onSave={this.props.onSave}
          onCancel={this.props.onCancel}
          onDelete={this.props.onDelete}
        />
      );
    }
    return (
      <LineRead
        line={line}
        prefixedNumber={(orderNumber + 1)}
        onDoubleClick={this.props.onDoubleClick}
      />
    );
  };

  render() {
    return (
      this._renderLineItem(this.props.line, this.props.orderNumber)
    );
  }
}

export { ListItem };
