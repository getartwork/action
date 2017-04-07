import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import InputField from 'universal/components/InputField/InputField';
import Button from 'universal/components/Button/Button';

const ArchiveTeam = (props) => {
  const {
    teamName,
    handleSubmit,
    handleClick,
    handleFormBlur,
    handleFormSubmit,
    showConfirmationField,
    submitting
  } = props;

  const archiveTeamClick = () => {
    if (!submitting) handleClick();
  };

  const validate = (value) => {
    return value !== teamName && 'The team name entered was incorrect';
  };

  return (
    <div>
      {!showConfirmationField ?
        <Button
          colorPalette="warm"
          label="Archive Team"
          size="smallest"
          onClick={archiveTeamClick}
        /> :
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Field
            autoFocus
            onBlur={handleFormBlur}
            colorPalette="gray"
            component={InputField}
            name="archivedTeamName"
            placeholder="Type the team name to confirm"
            type="text"
            validate={validate}
          />
        </form>
      }
    </div>
  );
};

ArchiveTeam.propTypes = {
  teamName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleFormBlur: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  showConfirmationField: PropTypes.bool.isRequired
};

export default reduxForm({form: 'archiveTeamConfirmation'})(ArchiveTeam);
