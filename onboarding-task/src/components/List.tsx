import * as React from 'react';

// Types not available
const ImmutablePropTypes = require('react-immutable-proptypes');
import { OrderedSet, OrderedMap } from 'immutable';
import TsComponent from './TsComponent';
import { CreateItem } from './CreateItem';
import { ListRow } from '../containers/ListRow';
import { GridLoader } from 'halogen';
import { ErrorsContainer } from './Erorrs/ErrorsContainer';
import { IAction } from '../actions/IAction';

interface IListProps {
  itemIds: OrderedSet<string>;
  errors: OrderedMap<string, string>;
  isFetching: boolean;
  onItemAdd: (text: string) => Promise<IAction>;
  onDismissError: (key: string) => IAction;
}

const List: React.StatelessComponent<IListProps> = (props) => {
  const loader = !props.isFetching ? null : (
    <div style={{width: '100%', display: 'flex', marginTop: '10%'}}>
      <GridLoader color="#26A65B" size="32px" margin="6px" className="center-horizontal" />
    </div>
  );

  const listItems = props.itemIds.valueSeq().map((id: string, i: number) => {
    return (
      <div key={id} className="list-group-item item-custom">
        <ListRow id={id} index={i + 1} />
      </div>
    );
  });

  const content = props.isFetching ? null : (
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
  );

  return (
    <div className="row">
      <div className="row">
        <div className="col-sm-12 text-center">
          <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
        </div>
      </div>

      <ErrorsContainer errors={props.errors} onDismissError={props.onDismissError} />

      {loader}
      {content}

    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  itemIds: ImmutablePropTypes.orderedSetOf(React.PropTypes.string).isRequired,
  errors: ImmutablePropTypes.orderedMapOf(React.PropTypes.string, React.PropTypes.string).isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  onItemAdd: React.PropTypes.func.isRequired,
  onDismissError: React.PropTypes.func.isRequired,
};

export { List };
