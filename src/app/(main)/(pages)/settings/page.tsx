import React from "react";
import { currentUser } from "@clerk/nextjs/server";

import ProfileForm from "@/components/forms/profile-form";
import { PageHeader } from "@/components/global/page-header";

import { db } from "@/lib/db";
import ProfilePicture from "./_components/profile-picture";

type Props = {};

const Settings = async (props: Props) => {
	const authUser = await currentUser();

	if (!authUser)
		return null;

	const user = await db.user.findUnique({
		where: {
			clerkId: authUser.id
		}
	})

	const removeProfileImage = async () => {
		"use server";

		const response = await db.user.update({
			where: {
				clerkId: authUser.id,
			},
			data: {
				profileImage: "",
			},
		});

		return response;
	};

	const uploadProfileImage = async (image: string) => {
		"use server";

		const response = await db.user.update({
			where: {
				clerkId: authUser.id,
			},
			data: {
				profileImage: image,
			},
		});

		return response;
	};

	const updateUserInfo = async (name: string) => {
		"use server";

		const response = await db.user.update({
			where: {
				clerkId: authUser.id
			},
			data: {
				name,
			}
		})

		return response;
	}

	return (
		<div className="flex flex-col gap-4 relative">
			<PageHeader heading="Settings" />
			<div className="flex flex-col gap-10 p-6">
				<h2 className="text-2xl font-bold">User Profile</h2>
				<p className="text-base text-white/50">
					Add or update your information
				</p>
				<ProfilePicture
					onDelete={removeProfileImage}
					userImage={user?.profileImage || ''}
					onUpload={uploadProfileImage}>
				</ProfilePicture>
				<ProfileForm user={user} onUpdate={updateUserInfo} />
			</div>
		</div>
	);
};

export default Settings;
