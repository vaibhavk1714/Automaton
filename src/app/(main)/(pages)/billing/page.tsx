import React from "react";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { PageHeader } from "@/components/global/page-header";
import BillingDashboard from "./_components/billing-dashboard";

type Props = {
	searchParams?: { [key: string]: string | undefined };
};

const BillingPage = async ({ searchParams }: Props) => {
	const { session_id } = searchParams ?? { session_id: "" };

	if (session_id) {
		const stripe = new Stripe(process.env.STRIPE_SECRET!, {
			typescript: true,
			apiVersion: "2024-06-20",
		});

		const session =
			await stripe.checkout.sessions.listLineItems(session_id);

		const user = await currentUser();
		if (user) {
			await db.user.update({
				where: { clerkId: user.id },
				data: {
					tier: session.data[0].description,
					credits:
						session.data[0].description == "Unlimited"
							? "Unlimited"
							: session.data[0].description == "Pro"
								? "100"
								: "10",
				},
			});
		}
	}

	return (
		<>
			<PageHeader heading="Billing" />
			<BillingDashboard />
		</>
	);
};

export default BillingPage;
