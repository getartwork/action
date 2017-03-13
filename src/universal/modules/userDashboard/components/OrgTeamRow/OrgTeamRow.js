import React, {PropTypes} from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import appTheme from 'universal/styles/theme/appTheme';
import Avatar from 'universal/components/Avatar/Avatar';
import Row from 'universal/components/Row/Row';
import Tag from 'universal/components/Tag/Tag';
import AvatarPlaceholder from 'universal/components/AvatarPlaceholder/AvatarPlaceholder';

const OrgTeamRow = (props) => {
  const {
    orgTeam: {
      name
    },
    styles
  } = props;
  return (
    <Row>
      <div className={css(styles.userInfo)}>
        <div className={css(styles.nameAndTags)}>
          {name}
        </div>
      </div>
    </Row>
  );
};

OrgTeamRow.propTypes = {
  orgTeam: PropTypes.shape({
    name: PropTypes.string,
  }),
  styles: PropTypes.object
};

const styleThunk = () => ({
  userAvatar: {
    // Define
  },

  userInfo: {
    paddingLeft: '1rem'
  },

  userActions: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },

  nameAndTags: {
    // Define
  },

  preferredName: {
    color: appTheme.palette.dark,
    display: 'inline-block',
    fontSize: appTheme.typography.s4,
    lineHeight: '1.625rem',
    verticalAlign: 'middle'
  },

  invitedAt: {
    color: appTheme.palette.mid,
    fontSize: appTheme.typography.s2,
    fontWeight: 700,
    lineHeight: appTheme.typography.s4,
  },

  infoLink: {
    color: appTheme.palette.mid,
    fontSize: appTheme.typography.s2,
    fontWeight: 700,
    lineHeight: appTheme.typography.s4,

    ':hover': {
      color: appTheme.palette.mid,
      textDecoration: 'underline'
    },
    ':focus': {
      color: appTheme.palette.mid,
      textDecoration: 'underline'
    }
  }
});

export default withStyles(styleThunk)(OrgTeamRow);
