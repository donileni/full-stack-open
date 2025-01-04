import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "../NotificationContext";
//import { BlogContextProvider } from "../BlogContext";
import { UserContextProvider } from "./UserContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <QueryClientProvider client={queryClient}>
      {/* <BlogContextProvider> */}
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
      {/* </BlogContextProvider> */}
    </QueryClientProvider>
);
