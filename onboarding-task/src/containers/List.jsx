import * as ReactRedux from 'react-redux';
import ListComponent from '../components/List';

const mapStateToProps = state => state;

const List = ReactRedux.connect(
  mapStateToProps
)(ListComponent);

export default List;
