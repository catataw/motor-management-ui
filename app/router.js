import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('storage', function() {
    this.route('detail',{path: '/:id'});
    this.route('new');
  });
  this.route('motor-replace', function() {
    this.route('replace-form');
    this.route('detail',{path: '/:id'});
  });
  this.route('motor-repair', function() {});
});

export default Router;
