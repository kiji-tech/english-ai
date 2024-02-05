drop index if exists "public"."diaries_targetDate_user_id_key";

alter table "public"."corrections" drop column "resultEn";

alter table "public"."corrections" drop column "resultJa";

alter table "public"."corrections" add column "result_en" text;

alter table "public"."corrections" add column "result_ja" text;

alter table "public"."diaries" drop column "targetDate";

alter table "public"."diaries" add column "target_date" text not null;

alter table "public"."users" drop column "memberShip";

alter table "public"."users" add column "member_ship" "MemberShip" not null default 'Free'::"MemberShip";

CREATE UNIQUE INDEX diaries_target_date_user_id_key ON public.diaries USING btree (target_date, user_id);



