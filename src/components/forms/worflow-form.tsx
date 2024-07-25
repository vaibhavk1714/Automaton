"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { WorkflowFormSchema } from "@/lib/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { onCreateWorkflow } from "@/app/(main)/(pages)/workflows/_actions/workflow-connections";
import { useModal } from "@/providers/modal-provider";

type Props = {
	title: string;
	subTitle: string;
};

const WorkflowForm = ({ title, subTitle }: Props) => {
	const { setClose } = useModal();

	const form = useForm<z.infer<typeof WorkflowFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(WorkflowFormSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const isLoading = form.formState.isLoading;
	const router = useRouter();

	const handleSubmit = async (values: z.infer<typeof WorkflowFormSchema>) => {
		const workflow = await onCreateWorkflow(
			values.name,
			values.description
		);
		if (workflow) {
			toast.message(workflow.message);
			router.refresh();
		}
		setClose();
	};

	return (
		<Card className="w-full max-w-[650px] border-none">
			{title && subTitle && (
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{subTitle}</CardDescription>
				</CardHeader>
			)}
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex flex-col gap-4 text-left"
					>
						<FormField
							disabled={isLoading}
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg">
										Name
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Name"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg">
										Description
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Description"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							className="mt-4"
							disabled={isLoading}
							type="submit"
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
									Saving
								</>
							) : (
								"Save workflow settings"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default WorkflowForm;
