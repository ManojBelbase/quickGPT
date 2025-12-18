// src/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 2 * 60 * 1000, // 2 minutes
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,
        },
        mutations: {
            retry: 1,
        },
    },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);