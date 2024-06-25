import { sql } from "drizzle-orm";
import {db} from "@/db";
import { CountriesTable } from "@/components/countries-table";

async function getTopCountries() {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

  const mostRecentRows = await db.run(sql`
    SELECT yt1.*, c.name
    FROM yearly_totals yt1
    INNER JOIN (
      SELECT country_id, MAX(year) as max_year
      FROM yearly_totals
      WHERE amount != ""
      GROUP BY country_id
    ) yt2
    ON yt1.country_id = yt2.country_id AND yt1.year = yt2.max_year
    INNER JOIN countries c
    ON yt1.country_id = c.code
    ORDER BY yt1.amount desc;
  `);
  return mostRecentRows.rows.map(row => ({
    year: row[1] as string,
    amount: USDollar.format(row[2] as number),
    amountValue: row[2] as number,
    countryName: row[4] as string,
    countryCode: row[3] as string
  }))
}

export default async function Home() {
  const data = await getTopCountries();

  return (
      <section className="lg:w-3/5">
        <h3 className="text-2xl font-semibold text-center m-4">All Countries and Regions GDP</h3>
        <ul>
          <CountriesTable rows={data} />
        </ul>
      </section>
  );
}
