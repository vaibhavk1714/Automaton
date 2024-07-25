import { ConnectionProviderProps } from "@/providers/connection-provider";
import { EditorState } from "@/providers/editor-provider";
import { useAutomatonStore } from "@/store";
import React from "react";
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
		/>
	);
};

export default RenderOutputAccordion;
