import {Button} from "@/components/ui/button.tsx";

import AdminPageHeader from "@/components/admin/layout/AdminPageHeader.tsx";
import {ProductsDataTable} from "@/features/admin/items/components/products-data-table.tsx";

import { OrdersDataTable } from "@/features/admin/orders/components/orders-data-table.tsx";
import { orderColumns } from "@/features/admin/orders/components/order-columns.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import {userTableHeaders} from  "@/features/admin/users/pages/data/tableHeader";
import {users} from  "@/features/admin/users/pages/data/sample-users";

export default function UsersPage() {
    const tableHeader = userTableHeaders;

    return (
        
     <div className="flex flex-col flex-1 min-h-screen gap-6">
            <AdminPageHeader
                title="Users"
                subtitle="Monitor current users and their total history"
                actions={
                    <div className="flex gap-2">
                        <Button >Export</Button>
                        {/*<Button variant="outline">Create Order</Button>
                        */}
                    </div>
                }
            />
            
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 flex-1">
                <Card className="xl:col-span-2 p-4">
                    <table>
                        <thead>
                            <tr>

                                {userTableHeaders.map((header, index) => (
                                    <th key = {index}>
                                        <span>{header.LABEL}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((row, index) => (
                                <tr key = {index}>
                                    {userTableHeaders.map((header, index) => {
                                        return(
                                             <td key={index}>
                                                {header.KEY === "ISORDERING"
                                                    ? row.ISORDERING ? "Yes" : "No"
                                                    : row[header.KEY]}
                                                </td>
                                        )

                                    })}
                                </tr>


                            ))}


                        </tbody>
                    </table>
               </Card>
            </div>



        </div>



    )
}