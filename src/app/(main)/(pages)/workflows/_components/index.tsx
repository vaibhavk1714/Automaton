import React from "react";
import Workflow from "./workflow";

type Props = {};

const Workflows = (props: Props) => {
	return (
		<div className="relative flex flex-col">
			<section className="flex flex-col gap-4 m-3">
				<Workflow
					name="Test"
					description="Creating a test workflow"
					id="e325nckasd"
					publish={false}
				/>
				<Workflow
					name="Test"
					description="Creating a test workflow"
					id="e325nckasd"
					publish={false}
				/>
				<Workflow
					name="Test"
					description="Creating a test workflow"
					id="e325nckasd"
					publish={false}
				/>
				<Workflow
					name="Test"
					description="Creating a test workflow"
					id="e325nckasd"
					publish={false}
				/>
				<Workflow
					name="Test"
					description="Creating a test workflow"
					id="e325nckasd"
					publish={false}
				/>
			</section>
		</div>
	);
};

export default Workflows;
