import { type IAnalyticsStore } from "@powerhousedao/reactor-browser/analytics";
import { AnalyticsProvider } from '@powerhousedao/reactor-browser/analytics/context';

export interface ReactorAnalyticsProviderProps {
    children: React.ReactNode;
    store?: IAnalyticsStore;
}

export const ReactorAnalyticsProvider: React.FC<ReactorAnalyticsProviderProps> = (props) => {
    const { children, store } = props;

    return store ? (
        <AnalyticsProvider store={store}>{children}</AnalyticsProvider>
    ) : (
        children
    );
};