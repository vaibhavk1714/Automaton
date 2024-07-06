import React from "react";
import { PageHeader } from "@/components/global/page-header";
import { CONNECTIONS } from "@/lib/constants";
import ConnectionCard from "./_components/connection-card";

type Props = {
	searchParams: {
		[key: string]: string | undefined
	}
}

const ConnectionsPage = ({ searchParams }: Props) => {
	return (
		<div className="flex flex-col gap-4 relative">
			<PageHeader heading="Connections" />
			<div className="relative flex flex-col gap-4">
				<section className="flex flex-col gap-4 p-6 text-muted-foreground">
					Connect all your apps directly from here. You may need to connect these apps regularly to refresh credentials
					{CONNECTIONS.map((connection) =>
						<ConnectionCard
							key={connection.title}
							title={connection.title}
							icon={connection.image}
							description={connection.description}
							type={connection.title}
						/>
					)}
				</section>
			</div>
		</div>)
};

export default ConnectionsPage;
