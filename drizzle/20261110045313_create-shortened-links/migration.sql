CREATE TABLE "shortened_links" (
	"short_code" text PRIMARY KEY,
	"clerk_user_id" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
