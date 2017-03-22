import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TsComponent from './TsComponent.tsx';
import { CreateItem } from './CreateItem.jsx';
import { ListRowContainer } from '../containers/ListRowContainer.js';

class List extends PureComponent {
  static displayName = 'List';
  static propTypes = {
    items: ImmutablePropTypes.map,
  };

  render() {
    const listItems = this.props.items.valueSeq().map((item, i) => {
      return (
        <div key={item.id} className="list-group-item item-custom">
          <ListRowContainer index={i + 1} id={item.id} />
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
                <CreateItem onItemAdd={this.props.onItemAdd} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { List };
