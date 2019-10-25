import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  scrollable: {
    overflowY: 'auto',
    height: 'auto',
    maxHeight: '80vh'
  },
  tableHead: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'white'
  },
  sumTextCell: {
    fontWeight: 'bold'
  },
  sumCell: {
    fontSize: '1rem',
    fontWeight: 'bold'
  }
};

const Scoresheet = ({
  classes,
  players,
  upperScores,
  lowerScores,
  scoreSums,
  upperSection,
  lowerSection,
  changeScoreValue,
  uiLabels: { SUM, TOTAL_SUM }
}) => {
  return (
    <div className={classes.scrollable}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="default" className={classes.tableHead}>
              <Icon style={{ marginLeft: '8px' }}>casino</Icon>
            </TableCell>
            {players.map(player => (
              <TableCell
                key={player}
                padding="none"
                className={classes.tableHead}
              >
                {player}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {upperSection.map((combination, index) => (
            <TableRow key={combination}>
              <TableCell component="th" scope="row" padding="default">
                {combination}
              </TableCell>
              {Object.keys(upperScores).map(player => (
                <TableCell key={player} padding="none">
                  <InputBase
                    name={player}
                    value={upperScores[player][index]}
                    onChange={event =>
                      changeScoreValue('upperScore', index, event)
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              padding="default"
              className={classes.sumTextCell}
            >
              {SUM}
            </TableCell>
            {Object.keys(scoreSums).map(player => (
              <TableCell
                key={player}
                padding="none"
                className={classes.sumCell}
              >
                {scoreSums[player].upperScoreSum}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              padding="default"
              className={classes.sumTextCell}
            >
              Bonus
            </TableCell>
            {Object.keys(scoreSums).map(player => (
              <TableCell
                key={player}
                padding="none"
                className={classes.sumCell}
              >
                {scoreSums[player].upperScoreSum > 62 ? 50 : 0}
              </TableCell>
            ))}
          </TableRow>
          {lowerSection.map((combination, index) => (
            <TableRow key={combination}>
              <TableCell component="th" scope="row" padding="default">
                {combination}
              </TableCell>
              {Object.keys(lowerScores).map(player => (
                <TableCell key={player} padding="none">
                  <InputBase
                    name={player}
                    value={lowerScores[player][index]}
                    onChange={event =>
                      changeScoreValue('lowerScore', index, event)
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              padding="default"
              className={classes.sumTextCell}
            >
              {TOTAL_SUM}
            </TableCell>
            {Object.keys(scoreSums).map(player => (
              <TableCell
                key={player}
                padding="none"
                className={classes.sumCell}
              >
                {scoreSums[player].upperScoreSum +
                  scoreSums[player].lowerScoreSum +
                  (scoreSums[player].upperScoreSum > 62 ? 50 : 0)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

Scoresheet.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  upperScores: PropTypes.object.isRequired,
  lowerScores: PropTypes.object.isRequired,
  scoreSums: PropTypes.object.isRequired,
  upperSection: PropTypes.array.isRequired,
  lowerSection: PropTypes.array.isRequired,
  changeScoreValue: PropTypes.func.isRequired,
  uiLabels: PropTypes.object.isRequired
};

export default withStyles(styles)(Scoresheet);
