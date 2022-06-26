import { BrowserRouter, Route } from "react-router-dom";

import { Header, Alert } from "./components/components-index";
import { HomePage, CoinPage } from "./pages/pages-index";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="root">
        <Header />
        <Route path="/" component={HomePage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
