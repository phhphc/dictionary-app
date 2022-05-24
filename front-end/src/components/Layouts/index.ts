import { ReactNode } from "react";

import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";
import NoLayout from "./NoLayout";

export interface LayoutProps {
    children: ReactNode;
}

export { AppLayout, AuthLayout, NoLayout };