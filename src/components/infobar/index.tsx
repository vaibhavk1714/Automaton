import React from "react";

import { UserButton } from "@clerk/nextjs";
import { Book, Headphones, Search } from "lucide-react";

import Templates from "@/components/icons/cloud_download";
import { ModeToggle } from "@/components/global/mode-toggle";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

const Infobar = () => {
    return (
        <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
            <span className="flex items-center bg-muted px-4 rounded-full">
                <Search />
                <Input
                    placeholder="Quick Search"
                    className="border-none bg-transparent"
                />
            </span>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Headphones />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Contact Support</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Book />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Guide</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <UserButton />
        </div>
    )
}

export default Infobar