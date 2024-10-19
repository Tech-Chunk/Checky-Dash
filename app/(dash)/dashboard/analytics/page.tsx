"use client"
import { Card, CardHeader} from "@nextui-org/card";
import { BarChart, BarChartHorizontal, LineChart, PieChart } from "lucide-react";



export default function Analytics() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2">
                <Card className="pl-4 pr-10">
                    <CardHeader className="z-10 top-1 flex-col !items-start gap-1">
                        <h1 className="font-bold">Busiest Day</h1>
                        <div className="flex flex-col">
                            <p>5th Oct ‘25</p>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="pl-4 pr-10">
                    <CardHeader className="z-10 top-1 flex-col !items-start gap-1">
                        <h1 className="font-bold">Average Attendance</h1>
                        <div className="flex flex-col">
                            <p>97%</p>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
            <CardHeader>
                <BarChart className="h-6 w-6" />
                Daily Occupancy
            </CardHeader>
                <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                Bar Chart Placeholder
                </div>
            </Card>
            <Card>
            <CardHeader>
                <LineChart className="h-6 w-6" />
                Weekly Trends
            </CardHeader>
                <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                Line Chart Placeholder
                </div>
            </Card>
            <Card>
            <CardHeader>
                <PieChart className="h-6 w-6" />
                Department Distribution
            </CardHeader>
                <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                Pie Chart Placeholder
                </div>
            </Card>
            <Card>
            <CardHeader>
                <BarChartHorizontal className="h-6 w-6" />
                Peak Hours
            </CardHeader>
                <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                Horizontal Bar Chart Placeholder
                </div>
            </Card>
            </div>
        </div>
    )
}
