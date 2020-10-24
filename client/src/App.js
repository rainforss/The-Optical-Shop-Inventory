import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, Route } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "./components/common/Head";
import ItemsPage from "./components/pages/ItemsPage";
import SpecsPage from "./components/pages/SpecsPage";

//Evaluated and no further optimization is worth implementing, deploy first production builld, need to implement 1. resend activation link, 2. Style the activation email.
//3. Redirect to login page upon activation link is successful. 4. Notification bar using Toastify when actions (registration, login, item added, deleted, updated) are completed
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <Head />
        <AppNavBar />

        <Container>
          <ToastContainer
            position="top-left"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Switch>
            <Route exact path="/" component={ItemsPage} />
            <Route path="/specs" component={SpecsPage} />
          </Switch>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
