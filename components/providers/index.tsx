import { AppThemeProvider } from "@/components/theme";

import * as Dialog from "@/components/toldo";
import { ViewTransitions } from "next-view-transitions";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ViewTransitions>
      <AppThemeProvider>
        <Dialog.Provider>{children}</Dialog.Provider>
      </AppThemeProvider>
    </ViewTransitions>
  );
};
