import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import "./firebaseConfig";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
          padding: "16px",
          fontSize: "16px",
          borderRadius: "10px",
          maxWidth: "500px",
        },
      }}
    />
  </>
);
