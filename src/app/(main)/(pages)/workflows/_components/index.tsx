import React from "react";
import Workflow from "./workflow";
import { onGetWorkflows } from "../_actions/workflow-connections";

type Props = {};

const Workflows = async (props: Props) => {
	const workflows = await onGetWorkflows();

	return (
		<div className="relative flex flex-col">
			<section className="flex flex-col gap-4 m-3">
				{workflows?.length ? (
					workflows.map((workflow) => (
						<Workflow
							key={workflow.id}
							{...workflow}
						/>
					))
				) : (
					<div className="flex items-center justify-center mt-28 text-muted-foreground">
						No Workflows
					</div>
				)}
			</section>
		</div>
	);
};

export default Workflows;
