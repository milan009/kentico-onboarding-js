import React, { PureComponent, PropTypes } from 'react';
import { LineEdit } from './LineEdit.jsx';
import { LineRead } from './LineRead.jsx';

class ListItem extends PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    line: PropTypes.object,
    index: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
  };

  _renderLineItem = (line, index) => {
    if (line.row.get('isEdited')) {
      return (
        <LineEdit
          key={line.id}
          line={line}
          index={(index)}
          onSave={this.props.onSave}
          onCancel={this.props.onCancel}
          onDelete={this.props.onDelete}
        />
      );
    }
    return (
      <LineRead
        key={line.id}
        line={line}
        index={(index)}
        onDoubleClick={this.props.onDoubleClick}
      />
    );
  };

  render() {
    return (
      this._renderLineItem(this.props.line, this.props.index)
    );
  }
}

export { ListItem };
