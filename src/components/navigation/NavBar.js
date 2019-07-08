import {
    Greetings,
    NavBar,
    Nav,
    NavRight,
    NavItem,
    AmplifyTheme
} from 'aws-amplify-react';
import React from 'react';
import { Settings } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { Hub } from '@aws-amplify/core';


class CustomNavBar extends Greetings {
    constructor(props) {
        super(props);
        this.state = {};
        Hub.listen('auth', this.onHubCapsule);
        this._validAuthStates = ['signedIn'];
    }

    render() {
        const authState = this.props.authState || this.state.authState;
        const signedIn = (authState === 'signedIn');

        const theme = this.props.theme || AmplifyTheme;
        const greeting = signedIn ? this.userGreetings(theme) : this.noUserGreetings(theme);
        if (!greeting) { return null; }
        
        return (
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">Cheff</strong>
                </MDBNavbarBrand>

                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <span className="mr-2">Location</span>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem href="#!">Location 1</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBFormInline waves>
                                <div className="md-form my-0">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                </div>
                            </MDBFormInline>
                        </MDBNavItem>
                        <MDBNavItem>
                            <button type="button" class="btn-floating btn-sm" onClick={() => {
                                this.props.history.push("/settings");
                            }}>
                                <Settings />
                            </button>
                        </MDBNavItem>
                        <MDBNavItem style={{ paddingTop:"5px" }}>
                            {greeting}
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default withRouter(CustomNavBar);