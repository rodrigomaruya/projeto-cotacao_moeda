import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { Home } from "./pages/home";
import { Detalhes } from "./pages/detalhes";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detalhes/:searchMoeda",
        element: <Detalhes />,
      },
    ],
  },
]);

export { router };
