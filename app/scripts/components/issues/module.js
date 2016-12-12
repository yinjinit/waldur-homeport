import issuesService from './issues-service';
import issueCommentsService from './issue-comments-service';
import IssueFilterService from './issue-filter-service';
import FakeIssueCommentsService from './fake-issue-comments-service';

import issueCreate from './create';
import issueDetail from './issue-detail';
import issuesList from './issues-list';
import issueRoutes from './routes';
import issuesWorkspace from './issues-workspace';
import issuesDashboard from './issues-dashboard';
import issuesShortList from './issues-short-list';
import issueQuickCreate from './issue-quick-create';
import issuesActivityStream from './issues-activity-stream';
import issuesListFiltered from './issues-list-filtered';
import issuesHelpdesk from './issues-helpdesk';
import issueRegistration from './issue-registration';

export default module => {
  module.service('issuesService', issuesService);
  module.service('issueCommentsService', issueCommentsService);
  module.service('IssueFilterService', IssueFilterService);
  module.service('FakeIssueCommentsService', FakeIssueCommentsService);

  module.directive('issuesList', issuesList);
  module.directive('issueCreate', issueCreate);
  module.directive('issueDetail', issueDetail);
  module.directive('issuesWorkspace', issuesWorkspace);
  module.directive('issuesDashboard', issuesDashboard);
  module.directive('issuesShortList', issuesShortList);
  module.directive('issueQuickCreate', issueQuickCreate);
  module.directive('issuesActivityStream', issuesActivityStream);
  module.directive('issuesListFiltered', issuesListFiltered);
  module.directive('issuesHelpdesk', issuesHelpdesk);
  module.directive('issueRegistration', issueRegistration);
  module.config(issueRoutes);
}
