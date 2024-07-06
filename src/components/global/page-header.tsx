import React from "react";

export const PageHeader = ({ heading }: { heading: string }) => {
	return (
		<h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
			{heading}
		</h1>
	);
};
