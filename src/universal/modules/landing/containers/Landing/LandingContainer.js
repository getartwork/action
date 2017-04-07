import React, {Component, PropTypes} from 'react';
import Landing from 'universal/modules/landing/components/Landing/Landing';
import Helmet from 'react-helmet';
import {showLock} from 'universal/components/Auth0ShowLock/Auth0ShowLock';
import loginWithToken from 'universal/decorators/loginWithToken/loginWithToken';
import injectGlobals from 'universal/styles/hepha';
import auth0Overrides from 'universal/styles/theme/auth0Overrides';
import {showInfo} from 'universal/modules/toast/ducks/toastDuck';
import {
  APP_UPGRADE_PENDING_KEY,
  APP_UPGRADE_PENDING_FALSE,
  APP_UPGRADE_PENDING_RELOAD,
  APP_UPGRADE_PENDING_DONE
} from 'universal/utils/constants';

@loginWithToken
export default class LandingContainer extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.shape({
      email: PropTypes.string,
      id: PropTypes.string,
      picture: PropTypes.string,
      preferredName: PropTypes.string
    }),
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {refreshNeeded: false};
  }

  componentWillMount() {
    injectGlobals(auth0Overrides);
    if (typeof window !== 'undefined' &&
        window.sessionStorage.getItem(APP_UPGRADE_PENDING_KEY) ===
          APP_UPGRADE_PENDING_RELOAD) {
      this.setState({refreshNeeded: true});
    }
  }

  componentDidMount() {
    const {
      dispatch,
      location: { pathname }
    } = this.props;
    if (pathname === '/login') {
      showLock(dispatch);
    }
    const upgradePendingState = window.sessionStorage.getItem(APP_UPGRADE_PENDING_KEY);
    if (upgradePendingState === APP_UPGRADE_PENDING_RELOAD) {
      window.sessionStorage.setItem(APP_UPGRADE_PENDING_KEY,
        APP_UPGRADE_PENDING_DONE);
      window.location.reload();
    } else if (upgradePendingState === APP_UPGRADE_PENDING_DONE) {
      window.sessionStorage.setItem(APP_UPGRADE_PENDING_KEY,
        APP_UPGRADE_PENDING_FALSE);
      dispatch(showInfo({
        title: 'New stuff!',
        message: 'Action has been upgraded, log in to see what\'s new.',
        action: {
          label: 'Ok'
        },
        autoDismiss: 0
      }));
    }
  }

  render() {
    let loginClickHandler;
    if (this.state.refreshNeeded) {
      loginClickHandler = () => window.location.reload();
    } else {
      const {dispatch} = this.props;
      loginClickHandler = () => showLock(dispatch);
    }
    return (
      <div>
        <Helmet title="Welcome to Action by Parabol" />
        <Landing handleLoginClick={loginClickHandler} {...this.props} />
      </div>
    );
  }
}
