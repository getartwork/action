import React, {PropTypes} from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import ui from 'universal/styles/ui';
import appTheme from 'universal/styles/theme/appTheme';
import {cashay} from 'cashay';
import makeHref from 'universal/utils/makeHref';
import Button from 'universal/components/Button/Button';
import CopyShortLink from 'universal/modules/meeting/components/CopyShortLink/CopyShortLink';
import MeetingMain from 'universal/modules/meeting/components/MeetingMain/MeetingMain';
import MeetingPhaseHeading from 'universal/modules/meeting/components/MeetingPhaseHeading/MeetingPhaseHeading';

const createStartMeetingHandler = (members) => () => {
  const self = members.find((member) => member.isSelf);
  if (!self) {
    throw new Error('You are not a member! How can that be?');
  }
  const options = {variables: {facilitatorId: self.id}};
  cashay.mutate('startMeeting', options);
};

const MeetingLobby = (props) => {
  const {members, team, styles} = props;
  const {id: teamId, name: teamName} = team;
  const onStartMeetingClick = createStartMeetingHandler(members);
  const shortUrl = makeHref(`/team/${teamId}`);
  return (
    <MeetingMain>
      {/* */}
      <div className={css(styles.root)}>
        <MeetingPhaseHeading>Hi, {teamName} Team!</MeetingPhaseHeading>
        <div className={css(styles.helpText)}>Is the whole team here?</div>
        <div className={css(styles.prompt)}>
          The person who presses “Start Meeting” will facilitate the meeting.<br />
          Everyone’s display automatically follows the Facilitator.
        </div>
        <div className={css(styles.helpText)}>
          <b>Today’s Facilitator</b>: begin the Check-In Round!
        </div>
        <div className={css(styles.buttonBlock)}>
          <Button
            buttonStyle="solid"
            colorPalette="cool"
            label="Start Meeting"
            onClick={onStartMeetingClick}
            raised
            size="largest"
            textTransform="uppercase"
          />
        </div>
        <p className={css(styles.label)}>MEETING LINK:</p>
        <div className={css(styles.urlBlock)}>
          <CopyShortLink url={shortUrl} />
        </div>
      </div>
      {/* */}
    </MeetingMain>
  );
};

MeetingLobby.propTypes = {
  members: PropTypes.array,
  params: PropTypes.shape({
    teamId: PropTypes.string
  }),
  styles: PropTypes.object,
  team: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  teamId: PropTypes.string,
  teamName: PropTypes.string,
};

const styleThunk = () => ({
  root: {
    paddingTop: '2rem',
    textAlign: 'center',

    [ui.breakpoint.wide]: {
      paddingTop: '3rem'
    },
    [ui.breakpoint.wider]: {
      paddingTop: '4rem'
    },
    [ui.breakpoint.widest]: {
      paddingTop: '6rem'
    }
  },

  helpText: {
    color: appTheme.palette.dark,
    fontSize: appTheme.typography.s5,
    fontWeight: 400,
    lineHeight: 1.5,
    margin: '1.75rem 0 0'
  },

  prompt: {
    color: appTheme.palette.dark,
    fontSize: appTheme.typography.s5,
    fontWeight: 700,
    margin: '2rem 0'
  },

  buttonBlock: {
    paddingTop: '2.25rem'
  },

  label: {
    color: appTheme.palette.dark,
    fontSize: appTheme.typography.s3,
    fontWeight: 700,
    margin: '4rem 0 0',
    textTransform: 'uppercase'
  },

  urlBlock: {
    margin: '.5rem 0 0',
    verticalAlign: 'middle'
  },
});

export default withStyles(styleThunk)(MeetingLobby);
