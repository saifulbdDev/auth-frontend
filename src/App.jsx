import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <ToastContainer />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
