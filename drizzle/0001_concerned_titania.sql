CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"imagekit_id" text NOT NULL,
	"imagekit_url" text NOT NULL,
	"file_path" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "creadit" integer DEFAULT 10 NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "projects_userId_idx" ON "projects" USING btree ("user_id");