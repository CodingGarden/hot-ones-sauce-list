import React, { useState, useEffect } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    minHeight: '60%',
  },
  bottles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  messageText: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontSize: '4em',
    fontFamily: '\'Allerta Stencil\', sans-serif',
    textShadow: '0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00',
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
            exact
            path="/seasons/:season"
            component={() => (
              <h3 className={classes.messageText}>Select a sauce</h3>
            )}
          />
          <Route
            path="*/sauces/:sauce_id"
            component={props => (
              <SauceViewer {...props} sauce={selectedSauce || null} />
            )}
          />
        </Switch>
      </div>
      <ReactCSSTransitionGroup
        className={classes.bottles}
        transitionName="sauce"
        transitionAppear
        transitionAppearTimeout={800}
        transitionEnterTimeout={800}
        transitionLeaveTimeout={800}
      >
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
      </ReactCSSTransitionGroup>
    </div>
  );
};

SeasonViewer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default withRouter(injectSheet(styles)(SeasonViewer));
