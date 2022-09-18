import helmet, { HelmetOptions } from "helmet";
import { ContentSecurityPolicyOptions } from "helmet/dist/types/middlewares/content-security-policy";
import { ReferrerPolicyOptions } from "helmet/dist/types/middlewares/referrer-policy";
import { StrictTransportSecurityOptions } from "helmet/dist/types/middlewares/strict-transport-security";
import { XDnsPrefetchControlOptions } from "helmet/dist/types/middlewares/x-dns-prefetch-control";

const headersHandler = () => {
  //
  //
  console.log("In http headers handler");
  // MOVE OUT CONTENT SECURITY POLICY TO CONSTANTS from .env //
  // Allow only trusted sources to load resources //
  const contentSecurityPolicy: ContentSecurityPolicyOptions = {
    directives: {
      "script-src": ["'self'", "example.com"],
      "style-src": null,
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

  const helmetOptions: HelmetOptions = {
    contentSecurityPolicy,
    referrerPolicy,
    hsts,
    dnsPrefetchControl,
  };

  //
  //
  console.log("REturnign");
  return helmet(helmetOptions);
};

export default headersHandler;
