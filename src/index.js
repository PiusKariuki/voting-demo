import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Auth from "Modules/Auth/views/Auth";
import { RecoilRoot } from "recoil";
import Dashboard from "Modules/Dashboard/views/Dashboard";
import { RequireAuth, AuthStatus } from "Common/RouteProtection/Protector";

ReactDOM.render(
	<RecoilRoot>
		<BrowserRouter>
			<Switch>
				<AuthStatus>
					<Route path="/" component={Dashboard} />
				</AuthStatus>

				<RequireAuth>
					<Route path="/admin/maps" component={Dashboard} />
				</RequireAuth>
			</Switch>
		</BrowserRouter>
	</RecoilRoot>,
	document.getElementById("root")
);
