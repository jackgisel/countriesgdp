CREATE TABLE `yearly_totals` (
	`pk` text PRIMARY KEY NOT NULL,
	`year` text,
	`amount` numeric NOT NULL,
	`country_id` text NOT NULL,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`code`) ON UPDATE no action ON DELETE cascade
);
