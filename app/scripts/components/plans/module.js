import plansService from './plans-service';
import plansList from './plans-list';
import planAgreementApprove from './plan-agreement-approve';
import planAgreementCancel from './plan-agreement-cancel';
import planRoutes from './routes';

export default module => {
  module.service('plansService', plansService);
  module.component('plansList', plansList);
  module.component('planAgreementApprove', planAgreementApprove);
  module.component('planAgreementCancel', planAgreementCancel);
  module.config(planRoutes);
};