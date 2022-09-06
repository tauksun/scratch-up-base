import { Response } from "express";

/**
 *
 * @description
 * Recieves **res** & an array of objects in params to set cookie/s, \
 * Passing multiple objects sets multiple cookies
 */
const setCookie = (params: {
  res: Response;
  cookies: {
    /**
     * @description
     * Name of cookie
     */
    cookieName: string;
    /**
     * @description
     * Value of cookie
     */
    cookieValue: string;
    /**
     * @description
     * when set to true, browser javascript cannot access this cookie, \
     * which help prevent [XSS](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) attacks
     *
     */
    httpOnly: boolean;
    /**
     * @description
     * when set to true, browser only sends this cookie over https (except for localhost)
     */
    secure: boolean;
    /**
     * @description
     * Defines the host to which the cookie will be sent. \
     *  If omitted, this attribute defaults to the host of the current document URL, not including subdomains.
     *
     * When a domain is set, then subdomains are always included.
     */
    domain?: string;
    /**
     * @description
     * Indicates the path that must exist in the requested URL for the browser to send the Cookie header.
     */
    path?: string;
    /**
     * @description
     *  Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks (CSRF). \
     *  Defaults to Lax.
     *
     * **Strict** means that the browser sends the cookie only for same-site requests, that is, requests originating from the same site that set the cookie.
     *
     * **Lax** means that the cookie is not sent on cross-site requests, such as on requests to load images or frames, but is sent when a user is navigating to the origin site from an external site (for example, when following a link)
     *
     * **None** means that the browser sends the cookie with both cross-site and same-site requests. \
     * Cookies with SameSite=None must now also specify the Secure attribute
     *
     * __Cookies from the same domain are no longer considered to be from the same site if sent using a different scheme (http: or https:)__
     */
    SameSite?: "Strict" | "Lax" | "None";
    /**
     * @description
     * Indicates the number of seconds until the cookie expires. A zero or negative number will expire the cookie immediately.
     *
     * If both Expires and Max-Age are set, Max-Age has precedence.
     */
    maxAge?: number;
    /**
     * @description
     * Indicates the maximum lifetime of the cookie as an HTTP-date timestamp. \
     * If unspecified, the cookie becomes a session cookie.
     *
     * When an Expires date is set, the deadline is relative to the client the cookie is being set on, not the server.
     */
    expires?: Date;
  }[];
}): boolean => {
  try {
    const res = params.res;
    const cookies = params.cookies;

    const cookieArray = [];

    for (let cookieData of cookies) {
      const {
        cookieName,
        cookieValue,
        httpOnly,
        secure,
        expires,
        maxAge,
        domain,
        SameSite,
        path,
      } = cookieData;
      let cookie = `${cookieName}=${cookieValue}; HttpOnly=${httpOnly}; Secure=${secure};${
        expires ? "Expires=" + expires + ";" : ""
      }${maxAge ? "Max-Age=" + maxAge + ";" : ""}${
        domain ? "Domain=" + domain + ";" : ""
      }${path ? "Path=" + path + ";" : ""}${
        SameSite ? "SameSite=" + SameSite : ""
      }`;

      cookieArray.push(cookie);
    }

    res.setHeader("set-cookie", cookieArray);

    return true;
  } catch (error) {
    console.log("\n Error occured while setting cookie : ", error);
    return false;
  }
};

export default setCookie;
