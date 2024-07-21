"use client";

import React from "react";

import { EditorState } from "@/providers/editor-provider";
import { ConnectionProviderProps } from "@/providers/connection-provider";
import { useAutomatonStore } from "@/store";
import ContentBasedOnTitle from "./content-based-on-title";

type Props = {
	state: EditorState;
	nodeConnection: ConnectionProviderProps;
};

const RenderOutputAccordion = ({ state, nodeConnection }: Props) => {
	const {
		googleFile,
		setGoogleFile,
		selectedSlackChannels,
		setSelectedSlackChannels,
	} = useAutomatonStore();

	return (
		<ContentBasedOnTitle
			nodeConnection={nodeConnection}
			newState={state}
			file={googleFile}
			setFile={setGoogleFile}
			selectedSlackChannels={selectedSlackChannels}
			setSelectedSlackChannels={setSelectedSlackChannels}
		></ContentBasedOnTitle>
	);
};

export default RenderOutputAccordion;
