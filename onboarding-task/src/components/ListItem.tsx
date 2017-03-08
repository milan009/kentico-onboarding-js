import React =  require('react');

import { ListItemFormContainer } from '../containers/ListItemFormContainer';
import { ListItemLabel } from './ListItemLabel';
import { IAction } from '../interfaces/IAction';
import { IItemViewModel } from '../interfaces/IItemViewModel';

interface IListItemProps {
  item: IItemViewModel;
  onLabelClick: () => IAction;
}

class ListItem extends React.PureComponent<IListItemProps, undefined> {

  static displayName = 'ListItem';

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
