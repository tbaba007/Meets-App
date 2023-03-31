import React from "react";
import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import CreateSport from "./components/admin/sports/createsport";
import EditSports from "./components/admin/sports/edit";
import SportsList from "./components/admin/sports/";
import Edit from "./components/admin/user/edituser";
import UserList from "./components/admin/user";
import Overview from "./components/admin/Overview";
import Login from "./components/user/login";
import Register from "./components/user/register";
import Dashboard from "./components/dashboard";
import { getMessage } from "./helper/common";
import CreateEvent from "./components/marketplace/createevent";
import Availableevent from "./components/marketplace/availableevent";
import SentRequestList from "./components/requests/sentRequests";
import EventDetails from "./components/marketplace/availableevent/Details";
import ReceivedRequestList from "./components/requests/receivedRequests/ReceivedRequestList";
import Requestlist from "./components/requests/allrequests/RequestList";

interface IRouteProps {
    Children: JSX.Element | JSX.Element[];
    role?: string | string[];
}

const RouteGuard = ({ Children, role }: IRouteProps): any => {
    const isUserLoggedIn = getMessage("user");
    if (!isUserLoggedIn) {
        return <Navigate to="/" replace />;
    }
    const userRole = JSON.parse(isUserLoggedIn).role;
    if (isUserLoggedIn && role !== userRole) {
        if (userRole === "user") {
            return <Navigate to="/dashboard" replace />;
        }
        return <Navigate to="/overview" replace />;
    } else {
        return Children;
    }
};

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/overview",
        element: <RouteGuard Children={<Overview />} role="admin" />,
    },
    {
        path: "/users",
        element: <RouteGuard Children={<UserList />} role="admin" />,
    },
    {
        path: "/edituser/:id",
        element: <RouteGuard Children={<Edit />} role="admin" />,
    },
    {
        path: "/sports",
        element: <RouteGuard Children={<SportsList />} role="admin" />,
    },
    {
        path: "/editSport/:id",
        element: <RouteGuard Children={<EditSports />} role="admin" />,
    },
    {
        path: "/createsport",
        element: <RouteGuard Children={<CreateSport />} role="admin" />,
    },
    {
        path: "/dashboard",
        element: <RouteGuard Children={<Dashboard />} role="user" />,
    },
    {
        path: "/createevent",
        element: <RouteGuard Children={<CreateEvent />} role="user" />,
    },
    {
        path: "/availableevent",
        element: <RouteGuard Children={<Availableevent />} role="user" />,
    },
    {
        path: "/sentrequestlist",
        element: <RouteGuard Children={<SentRequestList />} role="user" />,
    },
    {
        path: "/receivedrequestlist",
        element: <RouteGuard Children={<ReceivedRequestList />} role="user" />,
    },
    {
        path: "/availableevents",
        element: <RouteGuard Children={<Availableevent />} role="user" />,
    },
    {
        path: "/eventDetails",
        element: <RouteGuard Children={<EventDetails />} role="user" />,
    },
    {
        path: "/allevents",
        element: <RouteGuard Children={<Requestlist />} role="admin" />,
    },

    {
        path: "*",
        element: (
            <p>
                Route not found. Please click <Link to="/">Here</Link> to login
            </p>
        ),
    },
]);

export default Routes;
