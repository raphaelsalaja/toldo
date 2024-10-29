"use client";

import type { AnimationProps } from "framer-motion";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import * as Dialog from "toldo";

export const BasicExample = () => {
	const [open, setOpen] = React.useState(false);

	const variants: { [key: string]: AnimationProps } = {
		overlay: {
			initial: {
				opacity: 0,
				filter: "blur(0px)",
			},
			animate: {
				opacity: 1,
				filter: "blur(2px)",
			},
			exit: {
				opacity: 0,
				filter: "blur(0px)",
			},
			transition: {
				duration: 0.1,
				ease: [0.19, 1, 0.22, 1],
			},
		},
		content: {
			initial: {
				opacity: 0,
				scale: 0.95,
				filter: "blur(2px)",
			},
			animate: {
				opacity: 1,
				scale: 1,
				filter: "blur(0px)",
			},
			exit: {
				opacity: 0,
				scale: 0.95,
				filter: "blur(2px)",
			},
			transition: {
				duration: 0.2,
				ease: [0.19, 1, 0.22, 1],
			},
		},
	};

	return (
		<Dialog.Provider>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger className="h-10 rounded-xl border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-3 transition-all ease-in-out hover:brightness-95">
					Open Dialog
				</Dialog.Trigger>
				<Dialog.Portal forceMount>
					<AnimatePresence>
						{open && (
							<Dialog.Overlay forceMount>
								<motion.div
									className="fixed inset-0 bg-black-a10"
									{...variants.overlay}
								/>
							</Dialog.Overlay>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{open && (
							<Dialog.Content
								className="fixed inset-0 flex items-center justify-center"
								forceMount
							>
								<motion.div
									{...variants.content}
									className="flex w-[512px] flex-col gap-4 overflow-hidden rounded-2xl border border-gray-3 bg-gray-1"
								>
									<Dialog.Title className="px-6 pt-6 font-semibold text-foreground text-large">
										Dialog Title
									</Dialog.Title>
									<Dialog.Subtitle className="-mt-2 px-6 text-default text-muted">
										A window overlaid on either the primary window or another
										dialog window, rendering the content underneath inert.
									</Dialog.Subtitle>
									<Dialog.Description className="mt-0 px-6 text-default">
										A dialog is a type of modal window that appears in front of
										app content to provide critical information or ask for a
										decision. Dialogs disable all app functionality when they
										appear, and remain on screen until confirmed, dismissed, or
										a required action has been taken.
									</Dialog.Description>
									<div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 p-6">
										<Dialog.Close className="!text-white-a12 h-10 max-w-fit rounded-xl border border-red-7 bg-gradient-to-t bg-red-8 from-red-9 to-red-10 px-3 transition-all ease-in-out hover:brightness-95">
											Reject Knowledge
										</Dialog.Close>

										<Dialog.Close className="!text-white-a12 h-10 max-w-fit rounded-xl border border-blue-7 bg-blue-8 bg-gradient-to-t from-blue-9 to-blue-10 px-3 transition-all ease-in-out hover:brightness-95">
											Accept Knowledge
										</Dialog.Close>
									</div>
								</motion.div>
							</Dialog.Content>
						)}
					</AnimatePresence>
				</Dialog.Portal>
			</Dialog.Root>
		</Dialog.Provider>
	);
};
