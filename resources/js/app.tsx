import "./bootstrap";
import "../css/app.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { PrimeReactProvider } from "primereact/api";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const appName = import.meta.env.VITE_APP_NAME || "Sineverse";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

createInertiaApp({
    title: (title) => `${appName} - ${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <PrimeReactProvider>
                    <QueryClientProvider client={queryClient}>
                        <App {...props} />
                    </QueryClientProvider>
                </PrimeReactProvider>
            </StrictMode>
        );
    },
});
