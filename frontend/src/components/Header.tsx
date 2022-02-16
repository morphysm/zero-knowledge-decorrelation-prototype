import { Nav, Navbar, NavDropdown, NavItem, NavLink } from 'react-bootstrap';


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
                            <Navbar.Brand href="/">ZEKO BADGES</Navbar.Brand>
                        </li>
                    </ul>
                </div>
                <div className="mx-auto order-0 ">
                    {/* not sure why these botch formatting if they're nav.link */}
                    <Navbar.Brand className="navbar-brand mx-auto" style={{ padding: '50px' }} href="/mint">Mint NFTs</Navbar.Brand>
                    <Navbar.Brand className="navbar-brand mx-auto" href="/search">Search</Navbar.Brand>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink href="/about">About Us</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </Nav>
    );
}

export { Header }