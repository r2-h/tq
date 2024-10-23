import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="p-5 flex justify-center items-center gap-5 bg-gray-300">
        <Link to="/" activeProps={{ className: "font-bold" }}>
          main
        </Link>

        <Link
          search={{ page: 1 }}
          to="/paginated"
          activeProps={{ className: "font-bold" }}
        >
          paginated
        </Link>

        <Link to="/virtualization" activeProps={{ className: "font-bold" }}>
          virtualization
        </Link>

        <Link
          search={{ page: 1 }}
          to="/rickmorty-paginated"
          activeProps={{ className: "font-bold" }}
        >
          rickmorty-paginated
        </Link>
      </nav>
      <main className="w-full ">
        <Outlet />
      </main>

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
});
