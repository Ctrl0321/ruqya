'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const revenueData = [
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 2500 },
    { month: 'Mar', revenue: 3000 },
    { month: 'Apr', revenue: 3500 },
    { month: 'May', revenue: 4000 },
    { month: 'Jun', revenue: 4500 },
]

const classData = [
    { month: 'Jan', classes: 50 },
    { month: 'Feb', classes: 60 },
    { month: 'Mar', classes: 70 },
    { month: 'Apr', classes: 80 },
    { month: 'May', classes: 90 },
    { month: 'Jun', classes: 100 },
]

export default function AdminDashboard() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-secondary-50">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-secondary-50">Monthly Revenue</CardTitle>
                        <CardDescription className="text-secondary-50">Revenue for the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                revenue: {
                                    label: "Revenue",
                                    color: "hsl(var(--primary-100))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={revenueData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="revenue" fill="var(--color-revenue)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-secondary-50">Monthly Classes</CardTitle>
                        <CardDescription className="text-secondary-50">Number of classes for the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                classes: {
                                    label: "Classes",
                                    color: "hsl(var(--secondary-500))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={classData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="classes" fill="var(--color-classes)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

