import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddPlayerDialog = ({
  dialogOpen,
  error,
  handleDialogClose,
  playerName,
  handleInputChange,
  handleSubmit,
  uiLabels: { ADD_PLAYER, PLAYER, ADD, CANCEL, ERROR }
}) => (
  <Dialog
    fullWidth
    open={dialogOpen}
    onClose={handleDialogClose}
    aria-labelledby="add-player-dialog"
  >
    <DialogTitle id="add-player-title">{ADD_PLAYER}</DialogTitle>
    <DialogContent>
      <FormControl fullWidth>
        <InputLabel htmlFor="playerName">Name</InputLabel>
        <Input
          autoFocus
          margin="dense"
          id="playerName"
          label={PLAYER}
          value={playerName}
          onChange={handleInputChange}
          fullWidth
          aria-describedby="error-text"
        />
        <FormHelperText error id="error-text">
          {error ? ERROR : null}
        </FormHelperText>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDialogClose} color="primary">
        {CANCEL}
      </Button>
      <Button onClick={handleSubmit} color="primary">
        {ADD}
      </Button>
    </DialogActions>
  </Dialog>
);

AddPlayerDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  uiLabels: PropTypes.object.isRequired
};

export default AddPlayerDialog;
