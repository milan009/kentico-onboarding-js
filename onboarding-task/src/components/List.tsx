import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { ListItem } from '../containers/ListItem';
import { AddItem } from './AddItem';
import { Set } from 'immutable';
import { ErrorBox } from './ErrorBox';
const Loader = require('react-loader');

interface IListProps {
  itemsOrder: Set<string>;
  onAddItem: (text: string) => Promise<any>;
  fetchItems: () => Promise<any>;
  loaded: boolean;
  errors: Set<any>;
}

class List extends React.PureComponent<IListProps, undefined> {
  static displayName = 'List';
  static propTypes = {
    itemsOrder: ImmutablePropTypes.orderedSet.isRequired,
    onAddItem: React.PropTypes.func.isRequired,
    fetchItems: React.PropTypes.func.isRequired,
    loaded: React.PropTypes.bool.isRequired,
    errors: ImmutablePropTypes.set.isRequired,
  };

  constructor(props: IListProps) {
    super(props);

    this._addItem = this._addItem.bind(this);
  }

  componentWillMount() {
    this.props.fetchItems();
  }

  _addItem(text: string) {
    this.props.onAddItem(text);
  }

  render() {
    const items = this.props.itemsOrder.valueSeq();
    const errors = this.props.errors;
    return (
    <div className="row">
      {errors.map((error, index) =>
          <ErrorBox error={error} key={index} />
        )}
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <Loader loaded={this.props.loaded}>
          <table className="table table-bordered">
            <tbody>
            {items.map((guid, index) =>
              <ListItem guid={guid} key={guid} index={index + 1} />
            )}
            <AddItem onItemAdd={this._addItem} />
            </tbody>
          </table>
        </Loader>
      </div>
    </div>
  );
  }
}

export { List };
