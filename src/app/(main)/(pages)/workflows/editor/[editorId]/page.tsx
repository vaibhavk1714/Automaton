import React from "react";

import EditorCanvas from "./_components/editor-canvas";
import EditorProvider from "@/providers/editor-provider";
import ConnectionProvider from "@/providers/connection-provider";

type Props = {};

const EditorPage = (props: Props) => {
	return (
		<div className="h-full">
			<EditorProvider>
				<ConnectionProvider>
					<EditorCanvas />
				</ConnectionProvider>
			</EditorProvider>
		</div>
	);
};

export default EditorPage;
