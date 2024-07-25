import React from "react";
import { currentUser } from "@clerk/nextjs/server";

import { CONNECTIONS } from "@/lib/constants";
import { PageHeader } from "@/components/global/page-header";

import ConnectionCard from "./_components/connection-card";
import { getUserData } from "./_actions/get-user";
import { onSlackConnect } from "./_actions/slack-connections";
import { onNotionConnect } from "./_actions/notion-connections";
import { onDiscordConnect } from "./_actions/discord-connections";

type Props = {
	searchParams: {
		[key: string]: string | undefined;
	};
};

const ConnectionsPage = async ({ searchParams }: Props) => {
	const {
		webhook_id,
		webhook_name,
		webhook_url,
		guild_id,
		guild_name,
		channel_id,
		access_token,
		workspace_name,
		workspace_icon,
		workspace_id,
		database_id,
		app_id,
		authed_user_id,
		authed_user_token,
		slack_access_token,
		bot_user_id,
		team_id,
		team_name,
	} = searchParams ?? {
		webhook_id: "",
		webhook_name: "",
		webhook_url: "",
		guild_id: "",
		guild_name: "",
		channel_id: "",
		access_token: "",
		workspace_name: "",
		workspace_icon: "",
		workspace_id: "",
		database_id: "",
		app_id: "",
		authed_user_id: "",
		authed_user_token: "",
		slack_access_token: "",
		bot_user_id: "",
		team_id: "",
		team_name: "",
	};

	const user = await currentUser();
	if (!user) return null;

	const onUserConnections = async () => {
		await onDiscordConnect(
			channel_id!,
			webhook_id!,
			webhook_name!,
			webhook_url!,
			user.id,
			guild_name!,
			guild_id!
		);
		await onNotionConnect(
			access_token!,
			workspace_id!,
			workspace_icon!,
			workspace_name!,
			database_id!,
			user.id
		);
		await onSlackConnect(
			app_id!,
			authed_user_id!,
			authed_user_token!,
			slack_access_token!,
			bot_user_id!,
			team_id!,
			team_name!,
			user.id
		);

		const connections = {};

		const userInfo = await getUserData(user.id);

		userInfo?.Connections.map((connection) => {
			//@ts-ignore
			connections[connection.type] = true;
			//@ts-ignore
			return (connections[connection.type] = true);
		});

		//NOTE: Google drive connections will always be true, as it is present in consent form during login
		return { ...connections, "Google Drive": true };
	};

	const connections = await onUserConnections();

	return (
		<div className="flex flex-col gap-4 relative">
			<PageHeader heading="Connections" />
			<div className="relative flex flex-col gap-4">
				<section className="flex flex-col gap-4 p-6 text-muted-foreground">
					Connect all your apps directly from here. You may need to
					connect these apps regularly to refresh credentials
					{CONNECTIONS.map((connection) => (
						<ConnectionCard
							key={connection.title}
							title={connection.title}
							icon={connection.image}
							description={connection.description}
							type={connection.title}
							connected={connections}
						/>
					))}
				</section>
			</div>
		</div>
	);
};

export default ConnectionsPage;
