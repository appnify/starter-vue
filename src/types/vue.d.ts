import { Router, RouteLocationNormalizedLoaded } from "vue-router";

declare module "vue" {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteLocationNormalizedLoaded;
  }
}
