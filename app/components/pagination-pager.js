import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class PaginationPagerComponent extends Component {

  @action
  gotoPageAction(pageIndex) {
    if(this.gotoPage) {
      this.gotoPage(pageIndex);
    }
  }
}
