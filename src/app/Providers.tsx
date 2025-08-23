"use client";

import { ApolloProvider } from "@apollo/client/react";

import client from "./lib/apolloClient";
import { ToastProvider } from "./context/ToastContext";
import { CartProvider } from "./context/CartContext";


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={client}>
            <ToastProvider>
                <CartProvider>{children}</CartProvider>
            </ToastProvider>
        </ApolloProvider>
    );
}
