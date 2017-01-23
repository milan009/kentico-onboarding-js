import * as ReactRedux from 'react-redux';
import ListComponent from '../components/List';

const mapStateToProps = state => state;

const mapDispatchToProps = () => ({});

const List = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListComponent);

export default List;
