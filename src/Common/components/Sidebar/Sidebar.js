import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import Brand from "assets/img/brand/ballot.svg";

// reactstrap components
import {
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col,
} from "reactstrap";
import { useSetRecoilState } from "recoil";
import { user } from "Common/recoil/user";
import Switch from "assets/img/icons/common/switch.png";

const Sidebar = (props) => {
	const [collapseOpen, setCollapseOpen] = useState();

	// toggles collapse between opened and closed (true/false)
	const toggleCollapse = () => {
		setCollapseOpen((data) => !data);
	};
	// closes the collapse
	const closeCollapse = () => {
		setCollapseOpen(false);
	};
	// creates the links that appear in the left menu / Sidebar
	const createLinks = (routes) => {
		return routes.map((prop, key) => {
			return (
				<NavItem key={key}>
					<NavLink
						to={prop.layout + prop.path}
						tag={NavLinkRRD}
						onClick={closeCollapse}
						activeclassname="active">
						<i className={prop.icon} />
						{prop.name}
					</NavLink>
				</NavItem>
			);
		});
	};

	const { routes, logo } = props;
	let navbarBrandProps;
	if (logo && logo.innerLink) {
		navbarBrandProps = {
			to: logo.innerLink,
			tag: Link,
		};
	} else if (logo && logo.outterLink) {
		navbarBrandProps = {
			href: logo.outterLink,
			target: "_blank",
		};
	}

	//logout fn
	const setTkn = useSetRecoilState(user);
	const logout = () => {
		setTkn((prev) => "");
	};

	return (
		<Navbar
			className="navbar-vertical fixed-left navbar-light bg-white"
			expand="md"
			id="sidenav-main">
			<Container fluid>
				{/* Toggler */}
				<button
					className="navbar-toggler"
					type="button"
					onClick={toggleCollapse}>
					<span className="navbar-toggler-icon" />
				</button>
				{/* Brand */}
				{logo ? (
					<NavbarBrand className="pt-0" {...navbarBrandProps}>
						<img alt="" className="navbar-brand-img" src={Brand} />
					</NavbarBrand>
				) : null}
				{/* User */}
				<Nav className="align-items-center d-md-none">
					<UncontrolledDropdown nav>
						<DropdownToggle nav>
							<Media className="align-items-center">
								<span className="avatar avatar-sm rounded-circle">
									<img
										alt="..."
										src={
											require("../../../assets/img/theme/team-1-800x800.jpg")
												.default
										}
									/>
								</span>
							</Media>
						</DropdownToggle>
						<DropdownMenu className="dropdown-menu-arrow" right>
							<DropdownItem className="noti-title" header tag="div">
								<h6 className="text-overflow m-0">Welcome!</h6>
							</DropdownItem>
							<DropdownItem onClick={logout}>
								<i className="ni ni-single-02" />
								<span>Logout</span>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>
				{/* Collapse */}
				<Collapse navbar isOpen={collapseOpen}>
					{/* Collapse header */}
					<div className="navbar-collapse-header d-md-none">
						<Row>
							{logo ? (
								<Col className="collapse-brand" xs="6">
									{logo.innerLink ? (
										<Link to={logo.innerLink}>
											<img alt="" src={Brand} />
										</Link>
									) : (
										<a href={logo.outterLink}>
											<img alt="" src={Brand} />
										</a>
									)}
								</Col>
							) : null}
							<Col className="collapse-close" xs="6">
								<button
									className="navbar-toggler"
									type="button"
									onClick={toggleCollapse}>
									<span />
									<span />
								</button>
							</Col>
						</Row>
					</div>
					{/* Navigation */}
					<Nav navbar>
						{createLinks(routes)}
						<NavItem>
							<NavLink
								// to={prop.layout + prop.path}
								// tag={NavLinkRRD}
								onClick={closeCollapse}
								activeclassname="active">
								<i className={Switch} />
								Logout
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
};

Sidebar.defaultProps = {
	routes: [{}],
};

Sidebar.propTypes = {
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired,
	}),
};

export default Sidebar;
