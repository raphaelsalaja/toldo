"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "toldo";

export const BasicExample = () => {
	return (
		<Dialog.Provider>
			<Dialog.Root>
				<Dialog.Trigger className="rounded-xl border border-gray-3 bg-gradient-to-t bg-gray-1 from-gray-1 to-gray-2 px-4 py-2 transition-all ease-in-out hover:brightness-95">
					Open Dialog
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 bg-gray-a2" />
					<Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 flex flex-col bg-gray-1 border-gray-3 border rounded-xl p-4">
						<Dialog.Title className="font-semibold text-lg">
							Dialog Title
						</Dialog.Title>
						<Dialog.Description className="mt-1 text-base">
							Enim sint quis eu culpa amet ea reprehenderit proident sit laboris
							adipisicing pariatur nulla sunt. Excepteur mollit fugiat mollit
							tempor nisi nostrud amet Lorem est voluptate fugiat aliqua.
							Occaecat consequat est pariatur consequat fugiat non est amet
							nulla consequat minim minim minim ad eiusmod. Amet velit elit
							aliqua eu minim id proident. Sint est reprehenderit adipisicing
							nisi.
						</Dialog.Description>
						<Dialog.Close className="rounded-xl border border-red-3 bg-gradient-to-t bg-red-3 from-red-1 to-red-2 px-4 py-2 transition-all ease-in-out hover:brightness-95">
							Cancel
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</Dialog.Provider>
	);
};
