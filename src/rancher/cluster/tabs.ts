import { translate } from '@waldur/i18n';
import { ClusterUsersList } from '@waldur/rancher/cluster/users/ClusterUsersList';
import { getDefaultResourceTabs } from '@waldur/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@waldur/resource/tabs/ResourceTabsConfiguration';

import { ClusterCatalogList } from '../catalog/ClusterCatalogList';
import { ClusterProjectList } from '../ClusterProjectList';
import { ClusterNodesList } from '../node/ClusterNodesList';
import { ClusterTemplatesList } from '../template/ClusterTemplateList';

import { ClusterApplicationsList } from './apps/ClusterApplicationsList';
import { ClusterHPAList } from './ClusterHPAList';
import { ClusterWorkloadsList } from './ClusterWorkloadsList';

ResourceTabsConfiguration.register('Rancher.Cluster', () => [
  {
    key: 'nodes',
    title: translate('Nodes'),
    component: ClusterNodesList,
  },
  {
    key: 'catalogs',
    title: translate('Catalogues'),
    component: ClusterCatalogList,
  },
  {
    key: 'projects',
    title: translate('Projects'),
    component: ClusterProjectList,
  },
  {
    key: 'templates',
    title: translate('Application templates'),
    component: ClusterTemplatesList,
  },
  {
    key: 'applications',
    title: translate('Applications'),
    component: ClusterApplicationsList,
  },
  {
    key: 'workloads',
    title: translate('Workloads'),
    component: ClusterWorkloadsList,
  },
  {
    key: 'users',
    title: translate('Users'),
    component: ClusterUsersList,
  },
  {
    key: 'hpas',
    title: translate('Horizontal pod autoscalers'),
    component: ClusterHPAList,
  },
  ...getDefaultResourceTabs(),
]);
