import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

// فقط استخرج المعالجات من better-auth
const authHandlers = toNextJsHandler(auth.handler);

// استرجاع الـ GET و POST مباشرة بدون أي Arcjet Middleware
export const { GET } = authHandlers;

export const POST = async (req: NextRequest) => {
  return authHandlers.POST(req);
};

// import { toNextJsHandler } from "better-auth/next-js";
// import { auth } from "@/lib/auth";
// import aj from "@/lib/arcjet";
// import { ArcjetDecision, slidingWindow, validateEmail } from "@arcjet/next";
// import ip from "@arcjet/ip";
// import { NextRequest } from "next/server";

// const authHandlers = toNextJsHandler(auth.handler);

// // Email Validation -> Block
// const emailValidation = aj.withRule(
//   validateEmail({ mode: "LIVE", block: ["DISPOSABLE", "NO_MX_RECORDS"] })
// );

// // Rate Limit

// const rateLimit = aj.withRule(
//   slidingWindow({
//     mode: "LIVE",
//     interval: "2m",
//     max: 2,
//     characteristics: ["fingerprint"],
//   })
// );

// const protectedAuth = async (req: NextRequest): Promise<ArcjetDecision> => {
//   const session = await auth.api.getSession({ headers: req.headers });
//   let userId: string;
//   if (session?.user?.id) {
//     userId = session.user.id;
//   } else {
//     userId = ip(req) || "127.0.0.1";
//   }

//   if (req.nextUrl.pathname.startsWith("/api/auth/sign-in")) {
//     const body = await req.clone().json();

//     if (typeof body.email === "string") {
//       return emailValidation.protect(req, { email: body.email });
//     }
//   }

//   return rateLimit.protect(req, { fingerprint: userId });
// };

// export const { GET } = authHandlers;

// export const POST = async (req: NextRequest) => {
//   const decision = await protectedAuth(req);

//   if (decision.isDenied()) {
//     if (decision.reason.isEmail()) {
//       throw new Error("Email validation failed");
//     }
//     if (decision.reason.isRateLimit()) {
//       throw new Error("Rate Limit exceeded");
//     }
//     if (decision.reason.isShield()) {
//       throw new Error("Shield turned on, protected against malicios");
//     }
//   }

//   return authHandlers.POST(req);
// };
