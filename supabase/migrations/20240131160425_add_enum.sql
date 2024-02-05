create type "public"."MemberShip" as enum ('Free', 'Prime');

create type "public"."Role" as enum ('User', 'Admin');

alter table "public"."users" add column "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP;

alter table "public"."users" add column "updated_at" timestamp(3) without time zone not null;

alter table "public"."users" alter column "memberShip" set default 'Free'::"MemberShip";

alter table "public"."users" alter column "memberShip" set data type "MemberShip" using "memberShip"::"MemberShip";

alter table "public"."users" alter column "role" set default 'User'::"Role";

alter table "public"."users" alter column "role" set data type "Role" using "role"::"Role";



