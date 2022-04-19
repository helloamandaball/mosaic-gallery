import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { UserProfileContext } from "../../providers/UserProfileProvider";
import './Layout.css'

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar >
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
              <Navbar color="light" light expand="md" className="navBarDiv">
                  <div className="spacer25"></div>
                <NavbarBrand tag={RRNavLink} to="/">Mosaic Gallery</NavbarBrand>

                <div className="navBarLinks">
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>

                            {/* <NavItem>
                                    <NavLink tag={RRNavLink} to="/">Home</NavLink>
                                </NavItem> */}

                            <NavItem>
                                <NavLink tag={RRNavLink} to="/mygallery" className="navLinkName goldLink">my gallery</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={RRNavLink} to="/favorites" className="navLinkName aquaLink">favorites</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={RRNavLink} to="/discover" className="navLinkName sageLink">discover</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={RRNavLink} to="/categories" className="navLinkName brickLink">categories</NavLink>
                            </NavItem>

                            {/* <NavItem>
                                <NavLink tag={RRNavLink} to="/admin">
                                    <UncontrolledDropdown>
                                        <DropdownToggle size="sm" caret>
                                            admin
                                        </DropdownToggle>
                                        <DropdownMenu> */}
                            {/* <DropdownItem header>Admin</DropdownItem> */}
                            {/* <DropdownItem disabled>categories</DropdownItem> */}
                            {/* <DropdownItem divider /> */}
                            {/* <DropdownItem disabled>tags</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavLink>
                            </NavItem> */}

                        </Nav>
                        <Nav navbar>
                            {isLoggedIn &&
                                <>
                                    <NavItem>
                                        <button aria-current="page" className="nav-link logoutBtn"
                                            style={{ cursor: "pointer" }} onClick={logout}>Logout</button>
                                    </NavItem>
                                </>
                            }

                            {/* {!isLoggedIn &&
                        <>
                            <NavItem>
                            <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                            </NavItem>
                        </>
                        } */}
                        </Nav>
                    </Collapse>
                </div>
                <div className="spacer25"></div>
                </Navbar>
              </>
            }
        </Navbar>
    );
}
