import { connect } from 'react-redux';

import { updateListItem, switchFormVisibilityForListItem, deleteListItem } from '../actionCreators/actionCreators';
import { ListItemForm } from '../components/ListItemForm';
import { IAppState } from '../interfaces/IAppState';
import { dispatchType } from '../utils/dispatchType';
import { IItemViewModel } from '../interfaces/IItemViewModel';

interface IOwnProps {
  readonly item: IItemViewModel;
}

const mapStateToProps = (_state: IAppState, ownProps: IOwnProps) => {
  return {
    inputValue: ownProps.item.text,
    index: ownProps.item.index,
    savedOnServer: ownProps.item.savedOnServer,
  };
};

const mapDispatchToProps = (dispatch: dispatchType, ownProps: IOwnProps) => {
  return {
    onFormSubmit: (text: string) => {
      dispatch(updateListItem(ownProps.item.id, text));
      dispatch(switchFormVisibilityForListItem(ownProps.item.id));
    },
    onFormCancelClick: () => dispatch(switchFormVisibilityForListItem(ownProps.item.id)),
    onFormDeleteClick: () => dispatch(deleteListItem(ownProps.item.id)),
  };
};

const ListItemFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemForm);

export { ListItemFormContainer };
