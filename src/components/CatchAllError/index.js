/* eslint-disable */ // TODO: Should enable linter
import React from "react";
import { withRouter } from "react-router-dom";
// import Header from "components/Header";
import { routes } from "../Root/AppRoutes/routes";

// import { sumoLogger } from 'sumoLogger';

const Common = ({ goHome, children }) => {
  return (
    <>
      {/* <Header onErrorPage={true} /> */}
      {children}
      <div
        style={{
          display: "block",
          marginTop: 40,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <button clickHandler={goHome}>Retry</button>
      </div>
    </>
  );
};

class CatchAllErrors extends React.Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
    this.state = {
      error: null,
      errorInfo: null,
      securityErrorCode: 18, // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
    };
  }

  /**
   * @param error
   * @param errorInfo
   */
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // sumoLogger.log({
    // 	level: 'fatal',
    // 	error: { message: error.message, stack: error.stack },
    // 	errorInfo,
    // 	userAgent: window.location.userAgent
    // });
  }

  goHome(event) {
    event.preventDefault();
    this.props.history.push(routes.HOME);
    window.location.reload();
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    if (!window.navigator.onLine) {
      return (
        <Common goHome={this.goHome}>
          <div className="trx-error-container">
            <p className="trx-error-p">
              <b>
                Please make sure you're connected to the internet and click{" "}
                <i>Retry.</i>
              </b>
            </p>
          </div>
        </Common>
      );
    }

    if (this.state.error.code === this.state.securityErrorCode) {
      return (
        <Common goHome={this.goHome}>
          <div className="trx-error-container">
            <p className="trx-error-p">
              Looks like you've blocked third-party cookies!
            </p>
            <p className="trx-error-p">
              The TextRecruit extension requires access to browser cookies.
            </p>
            <p className="trx-error-p">
              To unblock third-party cookies access please follow below
              instructions:{" "}
            </p>
            <p className="trx-error-p">
              <ol>
                <li>Go to your Chrome’s Settings</li>
                <li>
                  Click <b>Advanced</b>
                </li>
                <li>
                  Select <b>Content Settings</b>
                </li>
                <li>
                  Select <b>Cookies</b>
                </li>
                <li>
                  Make sure <b>Block third-party cookies</b> is disabled.
                </li>
                <li>
                  Make sure the website you’re using the extension on is not
                  whitelisted in the <b>Block</b> section.
                </li>
                <li>Reload the page and continue.</li>
              </ol>
            </p>
          </div>
        </Common>
      );
    }

    return (
      <Common goHome={this.goHome}>
        <div className="trx-error-container">
          <p className="trx-error-p">We're sorry - something went wrong.</p>
          <p className="trx-error-p">
            Our team has been notified with the source of the error.
          </p>
        </div>
      </Common>
    );
  }
}

export default withRouter(CatchAllErrors);
