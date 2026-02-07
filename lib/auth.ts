import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { Polar } from "@polar-sh/sdk";
import { checkout, portal, polar, usage, webhooks } from "@polar-sh/better-auth";
import { eq, sql } from "drizzle-orm";
import { user } from "@/db/schema";

const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    server: 'sandbox'
});

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies(), polar({
        client: polarClient,
        createCustomerOnSignUp: true,
        use: [
            checkout({
                products: [
                    {
                        productId: "5c98fa24-6775-4211-bde3-afd62b3aa124", // ID of Product from Polar Dashboard
                        slug: "Regular" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                    },
                    {
                        productId: "eaaed45a-d03e-44c9-ae1e-cec5378fbd0d", // ID of Product from Polar Dashboard
                        slug: "Pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                    },
                    {
                        productId: "82b0ebbe-abeb-4929-a565-562f69506eb8", // ID of Product from Polar Dashboard
                        slug: "Ultra" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                    },
                ],
                successUrl: "/success?checkout_id={CHECKOUT_ID}",
                authenticatedUsersOnly: true
            }),
            portal(),
            usage(),
            webhooks({
                secret: process.env.POLAR_WEBHOOK_SECRET!,
                onOrderPaid: async (order) => {
                    const externalId = order.data.customer.externalId;
                    if (!externalId) {
                        console.log("No externalId found")
                        throw new Error("No externalId found")
                    };

                    const productId = order.data.productId;

                    let addCredit = 0;

                    if (productId === "5c98fa24-6775-4211-bde3-afd62b3aa124") {
                        addCredit = 50;
                    } else if (productId === "eaaed45a-d03e-44c9-ae1e-cec5378fbd0d") {
                        addCredit = 200;
                    } else if (productId === "82b0ebbe-abeb-4929-a565-562f69506eb8") {
                        addCredit = 400;
                    }

                    await db.update(user).set({
                        credit: sql`${user.credit} + ${addCredit}`
                    }).where(eq(user.id, externalId));
                }
            })]


    })]

});