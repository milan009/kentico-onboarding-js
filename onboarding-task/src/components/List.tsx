import * as React from 'react';

// Types not available
const ImmutablePropTypes = require('react-immutable-proptypes');
import { OrderedSet } from 'immutable';
import TsComponent from './TsComponent';
import { CreateItem } from './CreateItem';
import { ListRow } from '../containers/ListRow';
import { IAction } from '../interfaces/IAction';

interface IListProps {
  itemIds: OrderedSet<string>;
  onItemAdd: (text: string) => IAction;
}

const List: React.StatelessComponent<IListProps> = (props) => {
  const listItems = props.itemIds.valueSeq().map((id: string, i: number) => {
    return (
      <div key={id} className="list-group-item item-custom">
        <ListRow id={id} index={i + 1} />
      </div>
    );
  });

  return (
    <div className="row">
      <div className="row">
        <div className="col-sm-12 text-center">
          <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <div className="list-group">
            {listItems}
            <div className="list-group-item">
              <CreateItem onItemAdd={props.onItemAdd} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  itemIds: ImmutablePropTypes.orderedSetOf(React.PropTypes.string).isRequired,
  onItemAdd: React.PropTypes.func.isRequired,
};

export { List };
