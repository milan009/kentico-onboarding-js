import { connect } from 'react-redux';

import { updateListItem, switchFormVisibilityForListItem, deleteListItem } from '../actionCreators/actionCreators';
import { ListItemForm } from '../components/ListItemForm';
import { IAppState } from '../interfaces/IAppState';
import { IAction } from '../interfaces/IAction';

interface IOwnProps {
  item: { id: string; text: string; formDisplayed: boolean; index: number; };
}

const mapStateToProps = (_state: IAppState, ownProps: IOwnProps) => {
  return {
    inputValue: ownProps.item.text,
    index: ownProps.item.index,
  };
};

type DispatchType = (action: IAction) => IAction;

const mapDispatchToProps = (dispatch: DispatchType, ownProps: IOwnProps) => {
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
