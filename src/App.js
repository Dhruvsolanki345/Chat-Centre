import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import db from "./firebase";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    async function validateUser() {
      const userRef = db.collection("Users").doc(user.email);

      userRef.get()
      .then(docSnapshot => {
        if(!docSnapshot.exists){
          userRef.set({});
        }
      });
    }

    if(user)
      validateUser();
  }, [user]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/chat/:chatId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
