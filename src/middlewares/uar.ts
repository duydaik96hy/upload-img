import { NextFunction, Request, RequestHandler, Response } from "express";
import { getAuthToken } from "../libs/auth";
import { hashIP } from "../libs/hash";

export const uar = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authCode = getAuthToken(req);
    /**
     * Operations, that don't need authentications
     */
    if (req.method === "OPTIONS") {
      next();
      return;
    }
    if (
      req.path === "/login" ||
      req.path.search("/register") !== -1 ||
      req.path === "/logout" ||
      // req.body.accessToken ==
      //   "eyJhbGciOiJzaGE1MTIiLCJ0eXAiOiJKV1QifQ==.eyJyb2xlIjoicHJpdmF0ZSJ9.Y2Y0NWMyYWYtMjhmNS00NWM1LWFkY2QtY2NlMjY1MjA3ZmEw"
      // req.path.search("socket.io") !== -1 ||
      req.headers.accesstoken ==
        "eyJhbGciOiJzaGE1MTIiLCJ0eXAiOiJKV1QifQ==.eyJyb2xlIjoicHJpdmF0ZSJ9.Y2Y0NWMyYWYtMjhmNS00NWM1LWFkY2QtY2NlMjY1MjA3ZmEw"
      // || req.path === "/settings/getCookie"
      // || req.path === "/min-price/editMinPrice"
      // || req.path.search("/auction-log") !== -1
    ) {
      next();
      return;
    }
    /**
     * Check JWT Authentications
     */

    /**
     * Check Authorizations: REST-object permissions
     */
    const object = req.path.split("/")?.[1]?.toLocaleString();
    const operation = req.method.toLowerCase() as
      | "get"
      | "post"
      | "put"
      | "delete";
    // console.info(`${object} - ${operation}`, UserRolePermissions[tokenCache[authCode].user?.role]?.[object]?.[operation]);

    next();
  };
};
