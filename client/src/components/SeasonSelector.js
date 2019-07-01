import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const seasons = [];
for (let i = 1; i <= 9; i += 1) {
  // eslint-disable-next-line
  const sauces = require(`../sauces/season_${i}.json`);
  seasons.push(sauces);
}

const styles = {
  sideBar: {
    height: '100%',
    minWidth: '300px',
    overflowY: 'scroll',
  },
  seasonButton: {
    minWidth: '100px',
    fontSize: '2em',
    margin: '1em',
    padding: '0.25em',
    color: 'yellow',
    outline: '2px solid red',
    textAlign: 'center',
    cursor: 'pointer',
    fontFamily: '\'Allerta Stencil\', sans-serif',
    textTransform: 'uppercase',
    '&:hover': {
      background: 'yellow',
      color: 'black',
    },
  },
  selected: {
    background: 'yellow',
    color: 'black',
  },
};

const SeasonSelector = ({ classes, history, match }) => {
  const { season } = match.params;
  return (
    <div className={classes.sideBar}>
      {
        seasons.map((_, i) => (
          <div
            key={i}
            className={`${classes.seasonButton} ${season == (i + 1) ? classes.selected : ''}`}
            onClick={() => history.push(`/seasons/${i + 1}`)}
          >
            Season
            {' '}
            {i + 1}
          </div>
        ))
      }
    </div>
  );
};

SeasonSelector.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withRouter(injectSheet(styles)(SeasonSelector));
