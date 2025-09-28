import type { ReactNode } from "react";
import {
    Command,
    CommandInput,
    CommandEmpty,
    CommandItem,
    CommandSeparator,
    CommandGroup,
    CommandList
} from "@/components/ui/command.tsx";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import {BarChart3, CheckSquare,  Home, Package,  User} from "lucide-react";

interface AdminHeaderProps {
    trigger: ReactNode; // sidebar trigger
}

const AdminHeader = ({ trigger }: AdminHeaderProps) => {
    return (
        <div className="sticky top-0 z-50 flex justify-center items-center h-[75px] w-full p-5 border-b bg-[#ffffff]">
            <div className="flex items-center w-full gap-4">
                <div className="flex gap-3">{trigger}</div>
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:text-accent-foreground px-4 py-2 bg-muted/25 text-muted-foreground hover:bg-muted/50 relative h-8 w-full justify-start rounded-md text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute top-1/2 left-1.5 -translate-y-1/2"
                                aria-hidden="true"
                            >
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>
                            <span className="ml-3">Search</span>
                        </button>
                    </DialogTrigger>

                    {/* Search Command in dialog */}
                    <DialogContent className="p-0 max-w-lg border-none shadow-xl">
                        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                            <CommandInput placeholder="Type a command or search..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandSeparator />
                                <CommandGroup heading="Pages">
                                    <CommandItem>
                                        <Home />
                                        <span>Home</span>
                                    </CommandItem>

                                    <CommandItem>
                                        <CheckSquare />
                                        <span>Tasks</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <Package />
                                        <span>Items</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <BarChart3 />
                                        <span>Analytics</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <User />
                                        <span>User</span>
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AdminHeader;
