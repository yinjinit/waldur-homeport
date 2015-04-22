'use strict';

(function() {
  angular.module('ncsaas')
    .controller('ServiceListController',
      ['$state', 'servicesService', 'customerPermissionsService', 'usersService', ServiceListController]);

  function ServiceListController($state, servicesService, customerPermissionsService, usersService) {
    var vm = this;

    servicesService.getList().then(function(response) {
      vm.list = response;
    });
    vm.remove = remove;

    function activate() {
      // init canUserAddService
      usersService.getCurrentUser().then(function(user) {
        /*jshint camelcase: false */
        if (user.is_staff) {
          vm.canUserAddService = true;
        }
        customerPermissionsService.userHasCustomerRole(user, 'owner').then(function(hasRole) {
          vm.canUserAddService = hasRole;
        });

      });
    }

    function remove(service) {
      var index = vm.list.indexOf(service);

      service.$delete(function() {
        vm.list.splice(index, 1);
      });
    }

    activate();

  }

})();

(function() {
  angular.module('ncsaas')
    .controller('ServiceAddController',
      ['servicesService', '$state', 'currentStateService', '$rootScope', ServiceAddController]);

  function ServiceAddController(servicesService, $state, currentStateService, $rootScope) {
    var vm = this;
    vm.service = servicesService.$create();
    vm.save = save;
    vm.cancel = cancel;
    vm.projectList = {};
    vm.custumersList = {};

    function activate() {
      currentStateService.getCustomer().then(function(customer) {
        vm.service.customer = customer.url;
      });
      /*jshint camelcase: false */
      if (vm.service.auth_url || vm.service.name) {
        if (confirm('Clean all fields?')) {
          vm.service.auth_url = '';
          vm.service.name = '';
        }
      }
    }

    $rootScope.$on('currentCustomerUpdated', activate);

    function save() {
      vm.service.$save(success, error);

      function success() {
        $state.go('services.list');
      }

      function error(response) {
        vm.errors = response.data;
      }
    }

    function cancel() {
      $state.go('services.list');
    }

    activate();

  }

})();
