import { AnalyticsProvider } from "@powerhousedao/reactor-browser";

export interface ReactorAnalyticsProviderProps {
  children: React.ReactNode;
}

export const ReactorAnalyticsProvider: React.FC<
  ReactorAnalyticsProviderProps
> = (props) => {
  const { children } = props;

  return (
    <AnalyticsProvider databaseName="/:analytics">{children}</AnalyticsProvider>
  );
};
