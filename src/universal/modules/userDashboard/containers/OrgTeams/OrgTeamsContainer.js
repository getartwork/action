import React, {PropTypes} from 'react';
import {cashay} from 'cashay';
import {connect} from 'react-redux';
import LoadingView from 'universal/components/LoadingView/LoadingView';
import OrgTeams from 'universal/modules/userDashboard/components/OrgTeams/OrgTeams';

export const organizationContainerQuery = `
query {
  teams @cached(type: "[Team]") {
    id
    isPaid
    name
    meetingId
  }
}
`;

const mapStateToProps = (state, props) => {
  const {teams} = cashay.query(organizationContainerQuery, {
    op: 'organizationContainerQuery',
    resolveCached: {
      teams: () => () => true
    },
    sort: {
      teams: (a, b) => a.name > b.name ? 1 : -1
    }
  }).data;
  return {
    teams
  };
};

const OrgTeamsContainer = (props) => {
  const {teams} = props;
  return (
    <OrgTeams
      teams={teams}
    />
  );
};

OrgTeamsContainer.propTypes = {
};

export default connect(mapStateToProps)(OrgTeamsContainer);
