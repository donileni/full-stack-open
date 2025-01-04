import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "../NotificationContext";
//import { BlogContextProvider } from "../BlogContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <QueryClientProvider client={queryClient}>
      {/* <BlogContextProvider> */}
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      {/* </BlogContextProvider> */}
    </QueryClientProvider>
);
