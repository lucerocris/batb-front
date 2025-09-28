import AdminPageHeader from "@/components/admin/layout/AdminPageHeader";
import { Button } from "@/components/ui/button"; // adjust path if needed
import {
    Plus,
    Grid2x2,
    TrendingUp,
    ChartArea,
    ListChecks,
    CircleDollarSign,
    ChartPie,
    SquareArrowRight
} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import MonthlyChart from "@/features/admin/dashboard/components/monthly-chart.tsx";
import ClothingBrandsPieChart from "@/features/admin/dashboard/components/pie-chart-brands.tsx";

export default function DashboardPage() {
    return (
        <div className="flex flex-col flex-1 min-h-scren gap-6">
            <AdminPageHeader
                title="Home"
                subtitle="Dashboard overview"
                actions={
                <div className="flex gap-2">
                    <Button>
                        <Grid2x2 className="h-4 w-4 mr-2" />
                        Edit Home
                    </Button>
                    <Button variant={"outline"}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Widget
                    </Button>
                </div>

                }
            />

            <div className="flex-1 grid  grid-cols-2 h-full grid-rows-2 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <TrendingUp className="h-5 w-5"/>
                            <h3 className="font-semibold text-md">Top Selling</h3>
                        </div>
                    </CardHeader>
                </Card>
                <div className="grid grid-rows-2 gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <ListChecks className="h-5 w-5"/>
                                <h3 className="font-semibold text-md">To-do List</h3>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <CircleDollarSign className="h-5 w-5"/>
                                <h3 className="font-semibold text-md">Orders Summary</h3>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <ChartArea className="h-5 w-5"/>
                            <h3 className="font-semibold text-md">Total Sales</h3>
                        </div>

                    </CardHeader>
                    <CardContent>
                        <MonthlyChart/>
                    </CardContent>
                    <CardFooter className="justify-end">

                        <Button>
                            <SquareArrowRight/>
                            <span>View Monthly Data</span>
                            </Button>
                    </CardFooter>
                </Card>
                <div className="grid grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <ChartPie className="h-5 w-5"/>
                                <h3 className="font-semibold text-md">Top Sales</h3>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ClothingBrandsPieChart/>
                        </CardContent>
                    </Card>
                    <div className="grid grid-rows-3 gap-6">
                        <Card  className="py-3">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-5 w-5"/>
                                    <h3 className="font-semibold text-md">Visitors Today</h3>
                                </div>
                            </CardHeader>
                        </Card>
                        <Card  className="py-3">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-5 w-5"/>
                                    <h3 className="font-semibold text-md">Monthly Visitors</h3>
                                </div>
                            </CardHeader>
                        </Card>
                        <Card className="py-3">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-5 w-5"/>
                                    <h3 className="font-semibold text-md">Current Orders</h3>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
