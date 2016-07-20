angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.welcomeToMonopoly', {
    url: '/index',
    views: {
      'tab1': {
        templateUrl: 'templates/welcomeToMonopoly.html',
        controller: 'welcomeToMonopolyCtrl'
      }
    }
  })

  .state('tabsController.bank', {
    url: '/bank',
    views: {
      'tab2': {
        templateUrl: 'templates/bank.html',
        controller: 'bankCtrl'
      }
    }
  })

  .state('tabsController.rating', {
    url: '/rating',
    views: {
      'tab3': {
        templateUrl: 'templates/rating.html',
        controller: 'ratingCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.about', {
    url: '/About',
    views: {
      'tab4': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      }
    }
  })

  .state('tabsController.welcomeMari', {
    url: '/player',
    views: {
      'tab1': {
        templateUrl: 'templates/welcomeMari.html',
        controller: 'welcomeMariCtrl'
      }
    }
  })

  .state('tabsController.bank2', {
    url: '/bank_log',
    views: {
      'tab2': {
        templateUrl: 'templates/bank2.html',
        controller: 'bank2Ctrl'
      }
    }
  })

  .state('tabsController.bankNewPlayers', {
    url: '/bank_new',
    views: {
      'tab2': {
        templateUrl: 'templates/bankNewPlayers.html',
        controller: 'bankNewPlayersCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('//index')

  

});