import { Nav, Navbar, NavDropdown, NavItem, NavLink } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Badges } from './Badges';
import { LinkContainer } from 'react-router-bootstrap';


interface IHeaderProps {
    // any props that come into the component
}

//https://www.codeply.com/p/P0KN7DNsEq
const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    return (
        <Nav className="navbar navbar-expand-md navbar-dark bg-dark w-100">
            <div className="container-fluid">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active">
                            <LinkContainer to="/">
                                <Navbar.Brand>ZEKO BADGES</Navbar.Brand>
                            </LinkContainer>
                        </li>
                    </ul>
                </div>
                <div className="mx-auto order-0 " >
                    {/* LinkContainer botched formatting, added padding of*/}
                    <LinkContainer className='p-4' to="/mint">
                        <Navbar.Brand className="navbar-brand mx-auto" >Mint NFTs</Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer className='p-4' to="/search">
                        <Navbar.Brand className="navbar-brand mx-auto">Search</Navbar.Brand>
                    </LinkContainer>
                    {/* I can't get a non link in the header. strangely weird... */}
                    {/* <Navbar.Brand onSelect={onSelect} className="navbar-brand mx-auto">Connect Metamask</Navbar.Brand> */}
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <LinkContainer to="/about">
                                <NavLink>About Us</NavLink>
                            </LinkContainer>
                        </li>
                    </ul>
                </div>
            </div>
        </Nav>
    );
}

export { Header }