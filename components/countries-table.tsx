/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/5vuvoh23Q7A
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Link from "next/link"
import { parseNumberFromDb } from "@/lib/utils"


export type Row = {
  year: string
  amount: string
  countryName: string
  countryCode: string
}

function formatNumber(value: string) {
  const decimalPlaces = 2;
  
  let num = parseNumberFromDb(value);
  
  // Determine the appropriate suffix and format the number
  if (num >= 1e12) {
      return '$' + (num / 1e12).toFixed(decimalPlaces) + 'T';
  } else if (num >= 1e9) {
      return '$' + (num / 1e9).toFixed(decimalPlaces) + 'B';
  } else if (num >= 1e6) {
      return '$' + (num / 1e6).toFixed(decimalPlaces) + 'M';
  } else if (num >= 1e3) {
      return '$' + (num / 1e3).toFixed(decimalPlaces) + 'K';
  } else {
      return '$' + num.toFixed(2);
  }
}

export function CountriesTable({ rows, searchable = true }: { rows: Row[], searchable: boolean }) {
  const [search, setSearch] = useState("")
  const handleSearch = (e: any) => setSearch(e.target.value)
  const [sort, setSort] = useState({ key: "countryCode", order: "asc" })
  const handleSort = (key: string) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" })
    } else {
      setSort({ key, order: "asc" })
    }
  }
  const data = useMemo(
    () =>
      rows
        .filter((item) => {
          const searchValue = search.toLowerCase()
          return (
            item.countryCode.toLowerCase().includes(searchValue) ||
            item.countryName.toLowerCase().includes(searchValue) ||
            item.amount.toString().includes(searchValue) ||
            item.year.toString().includes(searchValue)
          )
        })
        .sort((a: any, b: any) => {
          if (sort.order === "asc") {
            return a[sort.key] > b[sort.key] ? 1 : -1
          } else {
            return a[sort.key] < b[sort.key] ? 1 : -1
          }
        }),
    [rows, search, sort.key, sort.order],
  )
  return (
    <div className="flex flex-col gap-4">
      {searchable && <div className="flex items-center gap-2">
        <Input placeholder="Search..." className="light:bg-white dark:bg-gray-400" value={search} onChange={handleSearch} />
      </div>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("code")}>
              Code
              {sort.key === "code" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Name
              {sort.key === "name" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="text-right cursor-pointer" onClick={() => handleSort("gdp")}>
              Total GDP
              {sort.key === "gdp" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="text-right cursor-pointer" onClick={() => handleSort("year")}>
              Year Recorded
              {sort.key === "year" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.countryCode}>
              <TableCell>
                <Link href={"/" + item.countryCode}>{item.countryCode}</Link>
              </TableCell>
              <TableCell>
                <Link href={"/" + item.countryCode}>{item.countryName}</Link>
              </TableCell>
              <TableCell className="text-right">{formatNumber(item.amount)}</TableCell>
              <TableCell className="text-right">{item.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
