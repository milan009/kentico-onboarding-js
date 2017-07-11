import { connect } from 'react-redux';
import { ViewItemComponent } from '../components/ViewItem';
import * as ActionCreators from '../actions/actionCreators';

const mapDispatchToProps = (dispatch) => ({
  onClick: (id) =>
    dispatch(ActionCreators.makeEditable(id)),
});

const ViewItemContainer = connect(null, mapDispatchToProps)(ViewItemComponent);
export { ViewItemContainer as ViewItem };
