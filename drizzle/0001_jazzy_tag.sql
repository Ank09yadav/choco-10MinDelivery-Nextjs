CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
