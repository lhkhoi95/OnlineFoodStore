import { ReactNode } from "react";

type AboutLayout = {
    children: ReactNode;
}

export const metadata = {
    title: 'About Page',
}

const AboutLayout = ({ children }: AboutLayout) => {
    return (
        <div>
            <h1>This is AboutLayout</h1>
            {children}
        </div>
    )
}

export default AboutLayout