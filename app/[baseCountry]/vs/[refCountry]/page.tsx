import { Chart } from "@/components/chart";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import Link from "next/link";

async function getData(countryData: Props["params"]) {
    return [countryData.baseCountry, countryData.refCountry].map(async (countryCode) => {
        const USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        const deadValue = "";
        const stmt = sql`
        SELECT 
            pk,
            year,
            amount,
            country_id,
            name
        FROM yearly_totals
        JOIN countries c
        ON country_id = c.code
        WHERE country_id = ${countryCode} and amount != ${deadValue}
        ORDER BY year
        `;
        const countryRows = await db.run(stmt);
        return countryRows.rows.map(row => ({
            year: row[1] as string,
            amount: USDollar.format(row[2] as number),
            amountValue: row[2] as number,
            countryName: row[4] as string,
            countryCode: row[3] as string
        }));
    })
}

function ArrowLeftIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
    )
}

type Props = {
    params: { 
        baseCountry: string;
        refCountry: string;
    }
}

export default async function Page({
    params
}: Props) {
    const countries = await getData(params)
    const base = await countries[0]
    const ref = await countries[1]

    if (base.length === 0 || ref.length === 0) {
        return <div className="p-24 flex flex-col items-center">
            <h1 className="text-3xl text-center"><b>{params.baseCountry}</b> is not supported!</h1>
            <Link
                href="/"
                className="m-4 p-4 inline-flex items-center justify-center rounded-md bg-[rgba(0,0,0,0.2)] px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-[rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
            >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Return to Home
            </Link>
        </div>
    }

    return (
        <section className="w-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center p-4">{base[0].countryName}</h1>
            <Chart rows={base} secondaryRows={[ref]} />            
        </section>
    )
}