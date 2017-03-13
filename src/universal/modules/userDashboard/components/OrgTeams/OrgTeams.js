import React, {PropTypes} from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import ui from 'universal/styles/ui';
import OrgTeamRow from '../OrgTeamRow/OrgTeamRow';
import Button from 'universal/components/Button/Button';
import Panel from 'universal/components/Panel/Panel';
import Toggle from 'universal/components/Toggle/Toggle';
import RemoveFromOrgModal from 'universal/modules/userDashboard/components/RemoveFromOrgModal/RemoveFromOrgModal';
import LeaveOrgModal from 'universal/modules/userDashboard/components/LeaveOrgModal/LeaveOrgModal';
import {Menu, MenuItem} from 'universal/modules/menu';
import {cashay} from 'cashay';
import {BILLING_LEADER} from 'universal/utils/constants';
import {showError, showInfo} from 'universal/modules/toast/ducks/toastDuck';

const originAnchor = {
  vertical: 'top',
  horizontal: 'right'
};

const targetAnchor = {
  vertical: 'top',
  horizontal: 'left'
};

const OrgTeams = (props) => {
  const {
    teams,
    styles
  } = props;
  return (
    <Panel label="Organization Teams">
      <div className={css(styles.listOfAdmins)}>
        {teams.map((orgTeam, idx) => {
          return (
            <OrgTeamRow
              key={idx}
              orgTeam={orgTeam}
            />
          );
        })}
      </div>
    </Panel>
  );
};

OrgTeams.propTypes = {
  teams: PropTypes.array,
  styles: PropTypes.object
};

const styleThunk = () => ({
  actionLinkBlock: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  menuToggleBlock: {
    marginLeft: ui.rowGutter,
    width: '1.5rem'
  },

  toggleBlock: {
    marginLeft: ui.rowGutter,
    width: '100px'
  }
});

export default withStyles(styleThunk)(OrgTeams);
