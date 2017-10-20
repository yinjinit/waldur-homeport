import template from './ansible-job-checkout-summary.html';

// @ngInject
class SummaryController {
  constructor(
    $q,
    $uibModal,
    currentStateService,
    AnsibleJobsService) {
    this.$q = $q;
    this.$uibModal = $uibModal;
    this.currentStateService = currentStateService;
    this.AnsibleJobsService = AnsibleJobsService;
  }

  $onInit() {
    this.prices = {};
    this.requirements = {};
    this.loading = true;
    this.loadData().then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
      this.error = true;
    });
  }

  loadData() {
    return this.$q.all([
      this.currentStateService.getProject(),
      this.currentStateService.getCustomer(),
      this.getEstimate()
    ]).then(([project, customer, estimate]) => {
      this.project = project;
      this.customer = customer;
      this.estimate = estimate;
    });
  }

  getEstimate() {
    const payload = this.AnsibleJobsService.getPayload(this.job, this.playbook, this.provider);
    return this.AnsibleJobsService.estimate(payload);
  }

  isValid() {
    return !this.error;
  }

  getDailyPrice() {
    if (this.isValid()) {
      return this.estimate.cost;
    } else {
      return 0;
    }
  }

  getMonthlyPrice() {
    return this.getDailyPrice() * 30;
  }

  showExplanation() {
    this.$uibModal.open({
      component: 'ansiblePriceExplanation',
      resolve: {
        estimate: () => this.estimate,
      }
    });
  }
}

const ansibleJobCheckoutSummary = {
  template: template,
  controller: SummaryController,
  bindings: {
    job: '<',
    provider: '<',
    playbook: '<',
  }
};

export default ansibleJobCheckoutSummary;
