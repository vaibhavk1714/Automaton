"use client";

import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { EditUserPofileSchema } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
	user: any;
	onUpdate: any;
};

const ProfileForm = ({ user, onUpdate }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof EditUserPofileSchema>>({
		mode: "onChange",
		resolver: zodResolver(EditUserPofileSchema),
		defaultValues: {
			name: user ? user?.name : "",
			email: user ? user?.email : "",
		},
	});

	const handleSubmit = async (
		values: z.infer<typeof EditUserPofileSchema>
	) => {
		setIsLoading(true);
		await onUpdate(values.name);
		setIsLoading(false);
	};

	useEffect(() => {
		form.reset({ name: user?.name, email: user?.email });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-6 max-w-80"
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">
								User full name
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Name"
									disabled={isLoading}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Email</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Mail"
									type="email"
									disabled={true}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="self-start hover:bg-[#2F006B] hover:text-white"
				>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Saving
						</>
					) : (
						"Save user settings"
					)}
				</Button>
			</form>
		</Form>
	);
};

export default ProfileForm;
