import React, { useState, useEffect } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';

import SauceViewer from './SauceViewer';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    color: 'yellow',
    flexDirection: 'column',
  },
  selectedSauce: {
    height: '70%',
  },
  bottles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxHeight: '410px',
    overflow: 'auto',
    '& img': {
      height: '230px',
      cursor: 'pointer',
      '&:hover': {
        background: 'yellow',
        boxShadow: '0 0 8px 8px black inset',
      },
    },
  },
  selected: {
    background: 'red !important',
    boxShadow: '0 0 8px 8px black inset !important',
  },
};

const SeasonViewer = ({ classes, match, history }) => {
  const { season, sauce_id } = match.params;
  const [sauces, setSauces] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState(null);
  useEffect(() => {
    // eslint-disable-next-line
    const sauces = require(`../sauces/season_${season}.json`);
    setSauces(sauces);
    const { sauce_id } = match.params;
    if (sauce_id) {
      // eslint-disable-next-line
      setSelectedSauce(sauces.find(sauce => sauce.id == sauce_id));
    }
  }, [season, match.params]);
  return (
    <div className={classes.container}>
      <div className={classes.selectedSauce}>
        <Switch>
          <Route
            path="*/sauces/:sauce_id"
            component={props => (
              <SauceViewer {...props} sauce={selectedSauce || null} />
            )}
          />
        </Switch>
      </div>
      <div className={classes.bottles}>
        {
          sauces.map(sauce => (
            <img
              key={sauce.id}
              src={sauce.img_url}
              alt={sauce.name}
              className={sauce.id == sauce_id ? classes.selected : ''}
              onClick={() => history.push(`/seasons/${season}/sauces/${sauce.id}`)}
            />
          ))
        }
      </div>
    </div>
  );
};

SeasonViewer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default withRouter(injectSheet(styles)(SeasonViewer));
