import React from "react";
import { useLocation, Route} from "react-router-dom";
import Sidebar from "Common/components/Sidebar/Sidebar.js";
import routes from "routes.js";
import Maps from "../components/Map";

const Admin = (props) => {
	const mainContent = React.useRef(null);
	const location = useLocation();

	React.useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContent.current.scrollTop = 0;
	}, [location]);

	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === "/admin") {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};

	return (
		<>
			<Sidebar
				{...props}
				routes={routes}
				logo={{
					innerLink: "/admin/index",
					imgSrc: require("../../../assets/img/brand/argon-react.png").default,
					imgAlt: "...",
				}}
			/>
			<div className="main-content pb-8" ref={mainContent}>
				<Maps />
			</div>
		</>
	);
};

export default Admin;
