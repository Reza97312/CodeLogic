import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./router/router";
import { Provider } from "react-redux";
import { store } from "../utils/redux/store/store";
import ChatBot from "../components/Chatbot/Chatbot";

const queryClient = new QueryClient();
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-center" toastClassName="font-toast" />
        <ChatBot />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
