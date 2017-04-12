import { connect } from 'react-redux';
import { List } from '../components/List';
import { addItem } from '../actionCreators/actionCreators';
import { IAppState } from '../stores/IAppState';
import { Dispatch } from '../stores/Dispatch';

const mapStateToProps = (state: IAppState) => ({
  itemIds: state.itemIds,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddItem: (text: string) => dispatch(addItem(text)),
});


const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer };
