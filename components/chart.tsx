"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Row } from "./countries-table"
import { formatNumber, parseNumberFromDb } from "@/lib/utils"

type DataObject = {
  year: string
  amount: number
}

const colors = ["#0000FF", "#FFD700", "#40E0D0"]

export function Chart({ rows, secondaryRows }: { rows: Row[], secondaryRows?: Row[][] }) {
  const formattedRows: DataObject[] = rows.map(row => ({
    year: row.year,
    amount: parseNumberFromDb(row.amount)
  }))
  const latestRow = formattedRows[formattedRows.length - 1]
  const secondToLatestRow = formattedRows[formattedRows.length - 2]
  const growth = (((latestRow.amount - secondToLatestRow.amount) / latestRow.amount) * 100)
  
  return (
    <div className="w-5/6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Gross Domestic Product</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="text-2xl font-bold">{rows[rows.length - 1].amount}</div>
          <p className="text-xs text-muted-foreground">
            +{growth.toFixed(3)}% from last recorded date ({secondToLatestRow.year})
          </p>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedRows}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="amount"
                  activeDot={{
                    r: 6,
                    style: { fill: "#00FF00", opacity: 0.25 },
                  }}
                  style={
                    {
                      stroke: "#00FF00",
                    } as React.CSSProperties
                  }
                />
                <YAxis type="number" dataKey="amount" tickFormatter={v => formatNumber(String(v), 0)} />
                <XAxis type="category" dataKey="year" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}