import { createBrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
// import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import Sidebar from "./components/Sidebar";
import ContactForm from "./components/Contact";
import CreateContact from "./components/CreateContact";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./components/Charts";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <CreateContact />,
      },
      {
        path: "/contact-form",
        element: <ContactForm />,
      },

      {
        path: "/contacts",
        element: <ContactList />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <Header />
        <div className="flex w-full mx-3 h-full  bg-slate-100">
          <Sidebar />
          <div className="w-full mt-[5%]">
            <Outlet />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
