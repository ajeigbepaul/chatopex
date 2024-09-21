// "use client";
// import { ReactNode } from "react";
// import { ConvexReactClient } from "convex/react";
// import { ClerkProvider, useAuth } from "@clerk/nextjs";
// import { ConvexProviderWithClerk } from "convex/react-clerk";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export default function ConvexClientProvider({ children }: { children: ReactNode }) {
// 	return (
// 		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
// 			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
// 				{children}
// 			</ConvexProviderWithClerk>
// 		</ClerkProvider>
// 	);
// }
"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// NEXT_PUBLIC_CONVEX_URL
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
  <ClerkProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    appearance={{
      layout: {
        socialButtonsVariant: "iconButton",
        logoImageUrl: "/opexlogo.png",
      },
      elements: {
        formButtonPrimary:
          "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
      },
      variables: {
        colorBackground: "#03254c",
        colorPrimary: "",
        colorText: "white",
        colorInputBackground: "#d0efff",
        colorInputText: "#000000",
      },
    }}
  >
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export default ConvexClerkProvider;
