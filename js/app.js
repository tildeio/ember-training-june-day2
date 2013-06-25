(function() {
"use strict";

window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('album', { path: '/album/:album_id' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.ALBUM_FIXTURES;
  }
});

App.AlbumRoute = Ember.Route.extend({
  model: function(params) {
    return App.ALBUM_FIXTURES.findProperty('id', params.album_id);
  }
});

App.NowPlayingController = Ember.ObjectController.extend();

App.Album = Ember.Object.extend({
  totalDuration: function() {
    return this.get('songs').reduce(function(sum, song) {
      return sum + song.get('duration');
    }, 0);
  }.property('songs.@each.duration')
});

App.Song = Ember.Object.extend();

Ember.Handlebars.helper('format-duration', function(seconds) {
  var minutes = Math.floor(seconds/60);
  var remainingSeconds = seconds % 60;

  var result = '';
  if (remainingSeconds < 10) {
    result = "0";
  }

  result += String(remainingSeconds);

  result = minutes + ":" + result;

  return result;
});

})();
