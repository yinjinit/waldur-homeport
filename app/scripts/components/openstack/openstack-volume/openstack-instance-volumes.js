const instanceVolumes = {
  templateUrl: 'views/partials/filtered-list.html',
  controller: OpenstackVolumesList,
  controllerAs: 'ListController',
  bindings: {
    resource: '<'
  }
};

export default instanceVolumes;

// @ngInject
function OpenstackVolumesList(
  baseResourceListController,
  $scope,
  $filter,
  $timeout,
  openstackVolumesService) {
  var controllerScope = this;
  var ResourceController = baseResourceListController.extend({
    init: function() {
      this.controllerScope = controllerScope;
      this._super();
      this.service = openstackVolumesService;
      this.rowFields.push('size');
      this.rowFields.push('device');

      $scope.$on('actionApplied', function(event, name) {
        if (name === 'volume') {
          $timeout(function() {
            controllerScope.resetCache();
          });
        }
      });
    },
    getTableOptions: function() {
      var options = this._super();
      options.noDataText = 'You have no volumes yet';
      options.noMatchesText = 'No volumes found matching filter.';
      options.columns = [
        {
          title: 'Name',
          className: 'all',
          render: row => this.renderResourceName(row)
        },
        {
          title: 'Size',
          render: row => $filter('filesize')(row.size)
        },
        {
          title: 'Attached to',
          render: row => row.device || 'N/A'
        },
        {
          title: 'State',
          className: 'min-tablet-l',
          render: row => this.renderResourceState(row)
        },
      ];
      return options;
    },
    getFilter: function() {
      return {
        instance_uuid: controllerScope.resource.uuid
      };
    }
  });
  controllerScope.__proto__ = new ResourceController();
}