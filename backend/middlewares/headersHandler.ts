import helmet, { HelmetOptions } from "helmet";
import { ContentSecurityPolicyOptions } from "helmet/dist/types/middlewares/content-security-policy";
import { ReferrerPolicyOptions } from "helmet/dist/types/middlewares/referrer-policy";
import { StrictTransportSecurityOptions } from "helmet/dist/types/middlewares/strict-transport-security";
import { XDnsPrefetchControlOptions } from "helmet/dist/types/middlewares/x-dns-prefetch-control";
import { XFrameOptionsOptions } from "helmet/dist/types/middlewares/x-frame-options";

const headersHandler = () => {
  // Allow only trusted sources to load resources //
  const contentSecurityPolicy: ContentSecurityPolicyOptions = {
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"],
    },
  };

  const referrerPolicy: ReferrerPolicyOptions = {
    policy: "no-referrer",
  };

  // Tell browser to prefer https over http //
  // IMPORTANT //
  // Before setting preload to true :
  // check this out : https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security#preloading_strict_transport_security
  const hsts: StrictTransportSecurityOptions = {
    maxAge: 15552000,
    includeSubDomains: true,
    preload: false,
  };

  // May change in future
  // before allowing
  // Check here : https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  const dnsPrefetchControl: XDnsPrefetchControlOptions = {
    allow: false,
  };

  // Helps mitigate clickjacking attacks.
  // This header is superseded by the frame-ancestors in Content Security Policy directive
  // But useful on old browsers, which may not support CSP.
  const frameguard: XFrameOptionsOptions = {
    action: "deny",
  };

  // Removes X-Powered-By header, which is not highly useful from security point of view
  // Read this discussion to decide for yourself :  https://github.com/expressjs/express/pull/2813#issuecomment-159270428
  const hidePoweredBy = true;

  const helmetOptions: HelmetOptions = {
    contentSecurityPolicy,
    referrerPolicy,
    hsts,
    dnsPrefetchControl,
    frameguard,
    hidePoweredBy,
  };

  return helmet(helmetOptions);
};

export default headersHandler;
