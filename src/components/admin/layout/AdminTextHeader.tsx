import type { ReactNode } from 'react';
import {Home} from "lucide-react";

interface AdminTextHeaderProps {
    title: string;
    subtitle?: string | ReactNode;
}

const AdminTextHeader = ({ title, subtitle }: AdminTextHeaderProps) => {
    return (
        <div>
            <div className="flex gap-2 items-center">
                <Home className="h-5 w-5"/>
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            </div>

            {subtitle ? <p className="text-muted-foreground">{subtitle}</p> : null}
        </div>
    );
};

export default AdminTextHeader;
