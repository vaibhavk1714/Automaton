"use server";

import { db } from "@/lib/db";

export const onCreateNodeEdges = async (
	flowId: string,
	nodes: string,
	edges: string,
	flowPath: string
) => {
	const flow = await db.workflows.update({
		where: {
			id: flowId,
		},
		data: {
			nodes,
			edges,
			flowPath: flowPath,
		},
	});

	if (flow) return { message: "Flow saved" };
};

export const onFlowPublish = async (workflowId: string, state: boolean) => {
	const publish = await db.workflows.update({
		where: {
			id: workflowId,
		},
		data: {
			publish: state,
		},
	});

	if (publish.publish) return "Workflow published";

	return "Workflow unpublished";
};