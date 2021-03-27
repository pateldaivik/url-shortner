import "./assets/styles.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Shorten from "./components/Shorten";
import Redirect from "./components/Redirect";
function App() {
  return (
    <div className="container">
      <Router>
        <Route path="/" exact component={Shorten} />
        <Route path="/redirect" component={Redirect} exact />
      </Router>
    </div>
  );
}

export default App;
