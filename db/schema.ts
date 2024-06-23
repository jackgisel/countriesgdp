import { numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const countriesTable = sqliteTable('countries', {
  code: text('code').primaryKey(),
  name: text('name').notNull(),
});

export const yearlyTotalTable = sqliteTable('yearly_totals', {
  pk: text("pk").primaryKey(),
  year: text('year'),
  amount: numeric('amount').notNull(),
  countryId: text('country_id')
    .notNull()
    .references(() => countriesTable.code, { onDelete: 'cascade' })
});

export type InsertCountry = typeof countriesTable.$inferInsert;
export type SelectCountry = typeof countriesTable.$inferSelect;

export type InsertYear = typeof yearlyTotalTable.$inferInsert;
export type SelectYear = typeof yearlyTotalTable.$inferSelect;