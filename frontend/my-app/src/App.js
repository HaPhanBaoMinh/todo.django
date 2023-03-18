import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { DefaultLayout } from "./components/layout/defaultLayout/DefaultLayout";
import { authRouter, publicRouter } from "./routers";
import { useContext } from "react";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { Auth } = useContext(AuthContext);

  return (
    <div className="App m-auto">
        <Routes>
          {authRouter.map((router, index) => {
            let Page = router.component;
            let Layout = DefaultLayout;
            if (router.layout) {
              Layout = router.layout;
            }

            return (
              <Route
                path={router.path}
                key={index}
                element={
                  !Auth ? (
                    <Navigate to="/login" />
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}

          {publicRouter.map((router, index) => {
            const Page = router.component;
            let Layout = DefaultLayout;

            if (router.layout) {
              Layout = router.layout;
            }

            return (
              <Route
                path={router.path}
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
