import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {cashay} from 'cashay';
import fromNow from 'universal/utils/fromNow';
import getRefreshPeriod from 'universal/utils/getRefreshPeriod';
import Ellipsis from 'universal/components/Ellipsis/Ellipsis';
import EditingStatus from 'universal/components/EditingStatus/EditingStatus';

const editingStatusContainer = `
query {
  presence(teamId: $teamId) @live {
    id
    userId
    editing
    teamMember @cached(type: "TeamMember") {
      preferredName
    }
  }
}
`;

const makeEditingStatus = (editors, active, updatedAt) => {
  let editingStatus = null;
  // no one else is editing
  if (editors.length === 0) {
    editingStatus = active ? <span>editing<Ellipsis /></span> :
      fromNow(updatedAt);
  } else {
    const editorNames = editors.map((e) => e.teamMember.preferredName);
    // one other is editing
    if (editors.length === 1) {
      const editor = editorNames[0];
      editingStatus = <span>{editor} editing{active ? 'too' : ''}<Ellipsis /></span>;
    } else if (editors.length === 2) {
      editingStatus = active ?
        <span>several are editing<Ellipsis /></span> :
        <span>{`${editorNames[0]} and ${editorNames[1]} editing`}<Ellipsis /></span>;
    } else {
      editingStatus = <span>several are editing<Ellipsis /></span>;
    }
  }
  return editingStatus;
};

const mapStateToProps = (state, props) => {
  const {form, outcomeId} = props;
  const {presence: editors} = cashay.query(editingStatusContainer, {
    op: 'editingStatusContainer',
    variables: {
      teamId: outcomeId.split('::')[0]
    },
    key: outcomeId,
    filter: {
      presence: (presence) => presence.editing === `Task::${outcomeId}`
    },
    resolveCached: {
      teamMember: (source) => {
        if (!source.editing) {
          return undefined;
        }
        const [, teamId] = source.editing.split('::');
        const {userId} = source;
        return `${userId}::${teamId}`;
      }
    }
  }).data;
  const formState = state.form[form];
  const active = formState && formState.active === outcomeId;
  return {
    active,
    editors
  };
};

@connect(mapStateToProps)
export default class EditingStatusContainer extends Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.object,
    editors: PropTypes.any,
    outcomeId: PropTypes.string,
    updatedAt: PropTypes.instanceOf(Date)
  };

  constructor(props) {
    super(props);
    const {active, editors, updatedAt} = this.props;
    this.state = {
      editingStatus: makeEditingStatus(editors, active, updatedAt)
    };
  }

  componentWillReceiveProps(nextProps) {
    const {active, editors, updatedAt} = nextProps;
    if (this.props.active !== active || this.props.editors !== editors) {
      this.setState({
        editingStatus: makeEditingStatus(editors, active, updatedAt)
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTimer);
  }

  render() {
    const {active, editors, updatedAt} = this.props;
    const {editingStatus} = this.state;
    clearTimeout(this.refreshTimer);
    const refreshPeriod = getRefreshPeriod(updatedAt);
    this.refreshTimer = setTimeout(() => {
      this.setState({
        editingStatus: makeEditingStatus(editors, active, updatedAt)
      });
    }, refreshPeriod);
    return <EditingStatus status={editingStatus} />;
  }
}
