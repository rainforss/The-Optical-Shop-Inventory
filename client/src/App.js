import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import AppNavBar from "./components/AppNavBar";
import ItemList from "./components/ItemList";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";

//Evaluated and no further optimization is worth implementing, deploy first production builld, need to implement 1. resend activation link, 2. Style the activation email.
//3. Redirect to login page upon activation link is successful. 4. Notification bar using Toastify when actions (registration, login, item added, deleted, updated) are completed
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container>
          <ItemModal />
          <ItemList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
