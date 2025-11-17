import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
    Home,
    CheckSquare,
    Package,
    User,
    BarChart3,
} from 'lucide-react';
import React from 'react';

interface NavigationType {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
}

const navigation: NavigationType[] = [
    {
        name: 'Home',
        href: '/admin/dashboard',
        icon: Home,
    },
    {
        name: 'Tasks',
        href: '/admin/tasks',
        icon: CheckSquare,
    },
    {
        name: 'Items',
        href: '/admin/items',
        icon: Package,
    },
    {
        name: 'User',
        href: '/admin/users',
        icon: User,
    },
    {
        name: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
    },
];



const AdminSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarHeader>
                    <div className="flex items-center gap-2 py-2">
                        <div className="flex size-8 items-center justify-center">
                            <img src="/src/assets/BATB%20Logo%201 (1).svg" alt="Logo" className="h-15" />
                        </div>
                        <div className="grid flex-1 text-left group-data-[collapsible=icon]:hidden">
                            <span className="truncate text-xs font-semibold">Boyz at the Back</span>
                            <span className="text-sidebar-foreground/70 truncate text-xs">
                                Admin Dashboard
                            </span>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton asChild tooltip={item.name}>
                                            <a href={item.href}>
                                                <IconComponent size={16} />
                                                <span>{item.name}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    );
};

export default AdminSidebar;