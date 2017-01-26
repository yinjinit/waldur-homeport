import openstackAllocationPool from './openstack-allocation-pool';
import openstackNetworksService from './openstack-networks-service';
import openstackTenantNetworks from './openstack-tenant-networks';
import { openstackNetworkSummary } from './openstack-network-summary';
import { formatAllocationPool } from './filters';
import breadcrumbsConfig from './breadcrumbs';

export default module => {
  module.service('openstackNetworksService', openstackNetworksService);
  module.component('openstackAllocationPool', openstackAllocationPool);
  module.component('openstackTenantNetworks', openstackTenantNetworks);
  module.component('openstackNetworkSummary', openstackNetworkSummary);
  module.filter('formatAllocationPool', formatAllocationPool);
  module.config(actionConfig);
  module.config(tabsConfig);
  module.run(breadcrumbsConfig);
};

// @ngInject
function actionConfig(ActionConfigurationProvider, DEFAULT_EDIT_ACTION) {
  ActionConfigurationProvider.register('OpenStack.Network', {
    order: [
      'edit',
      'pull',
      'create_subnet',
      'destroy'
    ],
    options: {
      edit: angular.merge({}, DEFAULT_EDIT_ACTION, {
        successMessage: 'Network has been updated'
      }),
      pull: {
        title: 'Synchronise'
      },
      create_subnet: {
        title: 'Create subnet',
        fields: angular.extend({}, DEFAULT_EDIT_ACTION.fields, {
          cidr: {
            component: 'openstackSubnet',
            label: 'Internal network mask (CIDR)',
            default_value: 42,
            mask: '192.168.X.0/24',
            serializer: (value, field) => field.mask.replace('X', value)
          },
          allocation_pool: {
            component: 'openstackAllocationPool',
            label: 'Internal network allocation pool',
            range: '192.168.X.10 — 192.168.X.200',
            parentField: 'cidr'
          },
        })
      },
    },
  });
}

// @ngInject
function tabsConfig(ResourceTabsConfigurationProvider, DEFAULT_RESOURCE_TABS) {
  ResourceTabsConfigurationProvider.register('OpenStack.Network', {
    order: [
      ...DEFAULT_RESOURCE_TABS.order,
      'subnets',
    ],
    options: angular.merge({}, DEFAULT_RESOURCE_TABS.options, {
      subnets: {
        heading: 'Subnets',
        component: 'openstackSubnetsList',
      },
    })
  });
}