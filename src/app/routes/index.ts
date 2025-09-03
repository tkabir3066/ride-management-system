import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { usersRoutes } from "../modules/user/user.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: usersRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
