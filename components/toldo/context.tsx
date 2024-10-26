import { createContext, ReactNode, useContext } from "react";
import type * as Dialog from "@/components/toldo";

interface DialogContextProps {
  dialogs: Dialog.Props[];
  pushDialog: (dialog: Dialog.Props) => void;
  popDialog: (id: string) => void;
  clearDialogs: () => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const useDialogContext = (): DialogContextProps => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const { dialogs, pushDialog, popDialog, clearDialogs } = useDialogStack();

  return <DialogContext.Provider value={{ dialogs, pushDialog, popDialog, clearDialogs }}>{children}</DialogContext.Provider>;
};
