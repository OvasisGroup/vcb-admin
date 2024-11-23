"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", IB_Users: 186},
  { month: "February", IB_Users: 305 },
  { month: "March", IB_Users: 237 },
  { month: "April", IB_Users: 73 },
  { month: "May", IB_Users: 209 },
  { month: "June", IB_Users: 214 },
  { month: "July", IB_Users: 186 },
  { month: "August", IB_Users: 305 },
  { month: "September", IB_Users: 237 },
  { month: "October", IB_Users: 73 },
  { month: "November", IB_Users: 209 },
  { month: "December", IB_Users: 214 },
]

const chartConfig = {
    IB_Users: {
    label: "IB_Users",
    color: "#A38526",
  }
} satisfies ChartConfig

export function Userchat() {
  return (
    < div className="bg-white p-4 rounded-2xl">
    <p className="my-6 text-vcblue text-2xl font-light px-4">Internet Banking Users</p>
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
      <CartesianGrid vertical={false} />
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="IB_Users" fill="var(--color-IB_Users)" radius={8} />
      </BarChart>
    </ChartContainer>
    </div>
  )
}
