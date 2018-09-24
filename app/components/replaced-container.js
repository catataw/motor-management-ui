import Component from '@ember/component';
import {connect} from 'ember-redux';
import {
  getLoading,
  getReplacedListByPage,
  getReplacedListPageCount,
  getReplacedListPageSize,
  getReplacedListPageIndex,
} from '../redux/selectors/replace'
import {gotoReplacedListPage} from '../redux/actions/replace'

class ReplacedContainer extends Component {}

const stateToComputed = state => {
  return {
    replacedList: getReplacedListByPage(state),
    isLoading: getLoading(state),
    pageCount: getReplacedListPageCount(state),
    pageIndex: getReplacedListPageIndex(state),
    pageSize: getReplacedListPageSize(state)
  }
};

const dispatchToActions = dispatch => {
  return {
    gotoPage: (pageIndex) => dispatch(gotoReplacedListPage(pageIndex)),
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(ReplacedContainer);
