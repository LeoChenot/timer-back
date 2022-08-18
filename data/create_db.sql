BEGIN;

DROP TABLE IF EXISTS "user", "list", "timer";

CREATE TABLE IF NOT EXISTS "user" (
  "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "list" (
  "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "type" varchar(255) NOT NULL,
  "user_id" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "timer" (
  "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "delay" integer NOT NULL,
  "list_id" integer NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz
);

COMMIT;