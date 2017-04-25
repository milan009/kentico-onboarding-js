import * as React from 'react';
import { IItemView } from '../models/IItemView';
import { IAction } from '../actions/IAction';

interface IListItemStaticProps {
  item: IItemView;
  onToggleEditMode: () => IAction;
}

const ListItemStatic: React.StatelessComponent<IListItemStaticProps> = (props: IListItemStaticProps) => (
  <tr>
    <td>
      <div onClick={props.onToggleEditMode}>{props.item.index + 1}. {props.item.text}</div>
    </td>
  </tr>
);

ListItemStatic.propTypes = {
  item: React.PropTypes.shape({
    guid: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
  }),
  onToggleEditMode: React.PropTypes.func.isRequired,
};

export { ListItemStatic };
