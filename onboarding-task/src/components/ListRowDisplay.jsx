import React, {
  PropTypes,
} from 'react';

function ListRowDisplay(props) {
  return (
    <div className="item-active" onClick={props.onItemClick}>
      {props.item.index}. <span>{props.item.text}</span>
    </div>
  );
}

ListRowDisplay.displayName = 'ListRowDisplay';

ListRowDisplay.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export { ListRowDisplay };
