import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TsComponent from './TsComponent.tsx';
import { CreateItem } from './CreateItem.jsx';
import { ListRowContainer } from '../containers/ListRowContainer.js';


function List(props) {
  const listItems = props.items.valueSeq().map((item, i) => {
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
              <CreateItem onItemAdd={props.onItemAdd} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

List.displayName = 'List';

List.propTypes = {
  items: ImmutablePropTypes.map.isRequired,
  onItemAdd: PropTypes.func.isRequired,
};

export { List };
