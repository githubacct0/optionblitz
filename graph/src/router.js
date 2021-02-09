import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Alert from "./pages/alert/alert";
import Home from "./pages/home/home";
import HotAssets from "./pages/hotAssets/hotAssets";
import Notifications from "./pages/notifications/notifications";
import News from "./pages/news/news";
import Trades from "./pages/trades/trades";
import Chat from "./pages/chat/chat";
import Trendings from "./pages/trendings/trendings";
const Router = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Route
                path="/"
                exact
                render={(props) => <Home {...props} />}
            />

            <Route
                path="/notifications"

                render={(props) => <Notifications {...props} />}
            />
            <Route
                path="/alerts"
                render={(props => <Alert {...props} />)}
            />
            <Route
                path="/hot-assets"
                render={(props => <HotAssets {...props} />)}
            />

            <Route
                path="/news"
                render={(props => <News {...props} />)}
            />
            <Route
                path="/trades"
                render={(props => <Trades {...props} />)}
            />
            <Route
                path="/chat"
                render={(props => <Chat {...props} />)}
            />
            <Route
                path="/trendings"
                render={(props => <Trendings {...props} />)}
            />
        </BrowserRouter>
    );
};

export default Router;