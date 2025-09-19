import {
  type DriveEditorProps,
  DriveContextProvider,
  useAppConfig,
} from "@powerhousedao/reactor-browser";
import { AnalyticsProvider } from "@powerhousedao/reactor-browser";
import { WagmiContext } from "@powerhousedao/design-system";
import { DriveExplorer } from "./components/DriveExplorer.js";

export function BaseEditor() {
  return (
    <div className="new-drive-explorer" style={{ height: "100%" }}>
      <DriveExplorer />
    </div>
  );
}

export default function Editor(props: DriveEditorProps) {
  // const appConfig = useAppConfig();
  return (
    <DriveContextProvider value={props.context}>
      <WagmiContext>
        <AnalyticsProvider databaseName={"test"}>
          <BaseEditor />
        </AnalyticsProvider>
      </WagmiContext>
    </DriveContextProvider>
  );
}
