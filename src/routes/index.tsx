import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";

import { ErrorComponent, NotFoundComponent } from "@/components/routing/RouteBoundaries";
import { HomePage } from "@/pages/HomePage";

const rootRoute = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
