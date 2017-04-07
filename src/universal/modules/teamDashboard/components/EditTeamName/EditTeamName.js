import React, {PropTypes} from 'react';
import Editable from 'universal/components/Editable/Editable';
import {cashay} from 'cashay';
import {reduxForm, Field} from 'redux-form';
import ui from 'universal/styles/ui';
import appTheme from 'universal/styles/theme/appTheme';
import editTeamNameValidation from './editTeamNameValidation';

const fieldStyles = {
  ...ui.dashHeaderTitleStyles,
  placeholderColor: appTheme.palette.mid70l
};

const validate = (values) => {
  const schema = editTeamNameValidation();
  return schema(values).errors;
};

const EditTeamName = (props) => {
  const {teamName, teamId, handleSubmit} = props;
  const updateEditable = async (submissionData) => {
    const schema = editTeamNameValidation();
    const {data: {teamName: validTeamName}} = schema(submissionData);

    const variables = {
      updatedTeam: {
        id: teamId,
        name: validTeamName
      }
    };
    cashay.mutate('updateTeamName', {variables});
  };
  return (
    <Field
      component={Editable}
      initialValue={teamName}
      name="teamName"
      placeholder="Team Name"
      submitOnBlur
      typeStyles={fieldStyles}
      handleSubmit={handleSubmit(updateEditable)}
    />
  );
};

EditTeamName.propTypes = {
  teamName: PropTypes.string,
  teamId: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({form: 'teamName', enableReinitialize: true, validate})(EditTeamName);
