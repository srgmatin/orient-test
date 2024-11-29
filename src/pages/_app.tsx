import "@/styles/globals.css";
import dynamic from "next/dynamic";
import type {AppProps} from "next/app";
import {NextTopLoaderProps} from "nextjs-toploader";
import {SearchContextProvider} from "@/shared/SearchContext";

const PagesTopLoader = dynamic<NextTopLoaderProps>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    () => import("nextjs-toploader/pages").then((mod) => mod.PagesTopLoader),
    {ssr: false},
);

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <PagesTopLoader />
            <SearchContextProvider>
                <Component {...pageProps} />
            </SearchContextProvider>
        </>
    );
}
