import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            // asyncronous request to google server to initialise client
            // no callback within init - returns promise instead. Use then().
            window.gapi.client.init({
                clientId: '275771135552-hraufleqj7s64tc2cgntbt6v9t6iqg57.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                // wait for status to change in future
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    // callback -> bind context to component with arrow function
    // called when auth status changes according to GAPI
    onAuthChange = (isSignedIn) => {
        // update state and rerender component
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null){
            return null;
        } else if (this.props.isSignedIn){
            return(
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return(
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            )
        }
    }
    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    // value of auth.isSignedIn may be null, true or false
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    { signIn, signOut}
)(GoogleAuth);