import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddPlayerDialog from './AddPlayerDialog';

const styles = theme => ({
  topBarContainer: {
    marginBottom: theme.spacing.unit * 10
  },
  topBar: {
    backgroundColor: 'grey'
  },
  topBarButton: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    color: 'white',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  appHeading: {
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2
  }
});

const GameControls = ({
  classes,
  players,
  addPlayer,
  clearScores,
  clearPlayers,
  toggleLanguage,
  uiLabels,
  uiLabels: { ADD_PLAYER, CLEAR_SCORES, CLEAR_PLAYERS, LANGUAGE }
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState(false);

  const handleDialogOpen = () => {
    setAnchorEl(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setPlayerName('');
    setError(false);
  };

  const handleSubmit = () => {
    const existingPlayerName = players.find(player => player === playerName);
    if (!existingPlayerName && playerName.length > 0) {
      addPlayer(playerName);
      handleDialogClose();
    } else {
      setError(true);
    }
  };

  const handleInputChange = ({ target: { value } }) => {
    setPlayerName(value);
  };

  const handleClearScores = () => {
    setAnchorEl(null);
    clearScores();
  };

  const handleClearPlayers = () => {
    setAnchorEl(null);
    clearPlayers();
  };

  const handleToggleLanguage = () => {
    setAnchorEl(null);
    toggleLanguage();
  };

  const handleMenuOpen = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={classes.topBarContainer}>
        <AppBar className={classes.topBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu button"
              aria-owns={anchorEl ? 'menu' : undefined}
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDialogOpen}>{ADD_PLAYER}</MenuItem>
              <MenuItem onClick={handleClearScores}>{CLEAR_SCORES}</MenuItem>
              <MenuItem onClick={handleClearPlayers}>{CLEAR_PLAYERS}</MenuItem>
              <MenuItem onClick={handleToggleLanguage}>{LANGUAGE}</MenuItem>
            </Menu>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.appHeading}
            >
              Yatzy
            </Typography>
            <Button className={classes.topBarButton} onClick={handleDialogOpen}>
              {ADD_PLAYER}
            </Button>
            <Button
              className={classes.topBarButton}
              onClick={handleClearScores}
            >
              {CLEAR_SCORES}
            </Button>
            <Button
              className={classes.topBarButton}
              onClick={handleClearPlayers}
            >
              {CLEAR_PLAYERS}
            </Button>
            <Button
              className={classes.topBarButton}
              onClick={handleToggleLanguage}
            >
              {LANGUAGE}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <AddPlayerDialog
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        playerName={playerName}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        uiLabels={uiLabels}
        error={error}
      />
    </div>
  );
};

GameControls.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  addPlayer: PropTypes.func.isRequired,
  clearScores: PropTypes.func.isRequired,
  clearPlayers: PropTypes.func.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
  uiLabels: PropTypes.object.isRequired
};

export default withStyles(styles)(GameControls);
