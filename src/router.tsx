import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Loading from "./components/Spinner";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        async lazy() {
          let { default: Home } = await import("./pages/home/Home");
          return { Component: Home };
        },
      },
      {
        path: "/roster",
        async lazy() {
          let { default: NumberRoster } = await import(
            "./pages/number-roster/NumberRoster"
          );
          return { Component: NumberRoster };
        },
      },
      {
        path: "/logs",
        async lazy() {
          let { default: Logs } = await import("./pages/Logs");
          return { Component: Logs };
        },
      },
      {
        path: "/did-mapping",
        async lazy() {
          let { default: DidMapping } = await import("./pages/DidMapping");
          return { Component: DidMapping };
        },
      },
      {
        path: "/contact",
        async lazy() {
          let { default: Contact } = await import("./pages/Contact");
          return { Component: Contact };
        },
      },
    ],
  },

  {
    path: "*",
    async lazy() {
      let { default: NotExist } = await import("./pages/NotExist");
      return { Component: NotExist };
    },
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
