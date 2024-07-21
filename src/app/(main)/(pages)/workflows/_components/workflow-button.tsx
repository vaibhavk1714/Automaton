"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "@/components/global/custom-modal";
import WorkflowForm from "@/components/forms/worflow-form";

type Props = {};

const WorkflowButton = (props: Props) => {
	const { setOpen, setClose } = useModal();

	const handleClick = () => {
		setOpen(
			<CustomModal
				title="Create a workflow automation"
				subheading="Worflows are powerfull tools that help you automate stuff"
			>
				<WorkflowForm
					title=""
					subTitle=""
				/>
			</CustomModal>
		);
	};

	return (
		<Button
			size={"icon"}
			onClick={handleClick}
		>
			<Plus />
		</Button>
	);
};

export default WorkflowButton;
