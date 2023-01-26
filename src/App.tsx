import {
  HashRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

import { ReactNotifications } from 'react-notifications-component'
import AboutUs from "./components/about-us/AboutUsComponent";
import Blog from "./components/blog/BlogComponent";
import Home from "./components/home/HomeComponent";
import PageNotFound from "./components/page-not-found/PageNotFoundComponent";
import Profile from "./components/profile/ProfileComponent";
import DyDxComponent from "./components/trade/dydx/DyDxComponent";
import Trade from "./components/trade/TradeComponent";

import 'react-notifications-component/dist/theme.css'


function App() {
  return (
    <div>
      <ReactNotifications />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/trade/dydx" element={<DyDxComponent />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
