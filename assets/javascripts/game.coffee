Bad = window.Bad = Ember.Application.create()

Bad.ApplicationController = Ember.Controller.extend()

Bad.Router.map ->
  @route 'main'

Bad.MainController = Ember.Controller.extend()
Bad.MainRoute = Ember.Route.extend()
