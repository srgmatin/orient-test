import {FC, PropsWithChildren} from "react";

const PageContainer: FC<PropsWithChildren> = ({children}) => {
    return (
        <main className="container mx-auto max-w-[960px] py-16">
            {children}
        </main>
    );
};

export default PageContainer;
