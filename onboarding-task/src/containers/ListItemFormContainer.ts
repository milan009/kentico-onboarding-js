import { connect } from 'react-redux';

import { updateListItem, switchFormVisibilityForListItem, deleteListItem } from '../actionCreators/actionCreators';
import { ListItemForm, IListItemFormDataProps, IListItemFormCallbacksProps } from '../components/ListItemForm';
import { IAppState } from '../interfaces/IAppState';
import { dispatchType } from '../utils/dispatchType';
import { IItemViewModel } from '../interfaces/IItemViewModel';

interface IOwnProps {
  readonly item: IItemViewModel;
}

const mapStateToProps = (_state: IAppState, ownProps: IOwnProps): IListItemFormDataProps => {
  return {
    inputValue: ownProps.item.text,
    index: ownProps.item.index,
    savedOnServer: ownProps.item.savedOnServer,
  };
};

const mapDispatchToProps = (dispatch: dispatchType, ownProps: IOwnProps): IListItemFormCallbacksProps => {
  return {
    onFormSubmit: (text: string) => {
      dispatch(updateListItem(ownProps.item.id, text));
      return dispatch(switchFormVisibilityForListItem(ownProps.item.id));
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
