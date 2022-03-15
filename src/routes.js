import Login from "Modules/Auth/components/Login";
import Maps from "Modules/Dashboard/components/Map";


var routes = [
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
//   {
//     path: "/login",
//     name: "Login",
//     icon: "ni ni-key-25 text-info",
//     component: Login,
//     layout: "/auth",
//   },
];
export default routes;
