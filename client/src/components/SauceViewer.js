import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ScovilleMeter from './ScovilleMeter';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    color: 'yellow',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0.5em',
    fontFamily: '\'Allerta Stencil\', sans-serif',
    textShadow: '0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00',
    // flexWrap: 'wrap',
  },
  bottle: {
    height: '280px',
  },
  containerItem: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  containerItemRight: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
    padding: '2em',
  },
  name: {
    color: 'red',
  },
  info: {
    textAlign: 'right',
    fontSize: '2em',
    '& a': {
      textDecoration: 'none',
      color: 'lightblue',
    },
  },
};

const SauceViewer = ({ classes, sauce }) => (
  <div className={classes.container}>
    {
        sauce
          ? (
            <>
              <ReactCSSTransitionGroup
                className={classes.containerItemRight}
                transitionName="sauce"
                transitionAppear
                transitionAppearTimeout={800}
                transitionEnterTimeout={800}
                transitionLeaveTimeout={800}
              >
                <img className={classes.bottle} src={sauce.img_url} alt={sauce.name} />
                <p className={classes.info}>
                  <span className={classes.name}>{sauce.name}</span>
                  <br />
                  <small>
                    By:
                    {' '}
                    <a href={sauce.website} target="_blank" rel="noopener noreferrer">{sauce.maker}</a>
                  </small>
                </p>
              </ReactCSSTransitionGroup>
              <div className={classes.containerItem}>
                <ScovilleMeter height={400} scovilles={sauce.scovilles} />
              </div>
            </>
          )
          : (
            <h3>Sauce not found!</h3>
          )
      }
  </div>
);

SauceViewer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  sauce: PropTypes.shape({}).isRequired,
};

export default injectSheet(styles)(SauceViewer);
