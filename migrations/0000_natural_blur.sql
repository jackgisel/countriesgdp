CREATE TABLE `countries` (
	`code` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `yearly_totals` (
	`year` text PRIMARY KEY NOT NULL,
	`amount` numeric NOT NULL,
	`country_id` text NOT NULL,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`code`) ON UPDATE no action ON DELETE cascade
);
