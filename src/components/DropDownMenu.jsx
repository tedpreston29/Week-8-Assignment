"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddNewCheat from "./AddNewCheat";
import Link from "next/link";
export function DropDownMenu({ HandleSavedSub }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowAddCheatModal(true)}>
            Add Cheat?
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/game-library"}>Back to All Games?</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
