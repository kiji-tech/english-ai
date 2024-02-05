create table "public"."corrections" (
    "uid" text not null,
    "diary_id" text not null,
    "ja" text,
    "en" text,
    "resultJa" text,
    "resultEn" text,
    "points" text,
    "score" integer,
    "delete_flag" boolean not null default false
);


create table "public"."diaries" (
    "uid" text not null,
    "targetDate" text not null,
    "user_id" text not null,
    "ja" text,
    "en" text,
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) without time zone not null,
    "delete_flag" boolean not null default false
);


create table "public"."users" (
    "uid" text not null,
    "delete_flag" boolean not null default false,
    "memberShip" text not null default 'Free'::text,
    "name" text not null,
    "role" text not null default 'User'::text
);


create table "public"."words" (
    "uid" text not null,
    "diary_id" text not null,
    "word" text not null,
    "mean" text not null,
    "delete_flag" boolean not null default false,
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) without time zone not null
);


CREATE UNIQUE INDEX corrections_pkey ON public.corrections USING btree (uid);

CREATE UNIQUE INDEX diaries_pkey ON public.diaries USING btree (uid);

CREATE UNIQUE INDEX "diaries_targetDate_user_id_key" ON public.diaries USING btree ("targetDate", user_id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (uid);

CREATE UNIQUE INDEX words_pkey ON public.words USING btree (uid);

alter table "public"."corrections" add constraint "corrections_pkey" PRIMARY KEY using index "corrections_pkey";

alter table "public"."diaries" add constraint "diaries_pkey" PRIMARY KEY using index "diaries_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."words" add constraint "words_pkey" PRIMARY KEY using index "words_pkey";

alter table "public"."corrections" add constraint "corrections_diary_id_fkey" FOREIGN KEY (diary_id) REFERENCES diaries(uid) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."corrections" validate constraint "corrections_diary_id_fkey";

alter table "public"."diaries" add constraint "diaries_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(uid) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."diaries" validate constraint "diaries_user_id_fkey";

alter table "public"."words" add constraint "words_diary_id_fkey" FOREIGN KEY (diary_id) REFERENCES diaries(uid) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."words" validate constraint "words_diary_id_fkey";

grant delete on table "public"."corrections" to "anon";

grant insert on table "public"."corrections" to "anon";

grant references on table "public"."corrections" to "anon";

grant select on table "public"."corrections" to "anon";

grant trigger on table "public"."corrections" to "anon";

grant truncate on table "public"."corrections" to "anon";

grant update on table "public"."corrections" to "anon";

grant delete on table "public"."corrections" to "authenticated";

grant insert on table "public"."corrections" to "authenticated";

grant references on table "public"."corrections" to "authenticated";

grant select on table "public"."corrections" to "authenticated";

grant trigger on table "public"."corrections" to "authenticated";

grant truncate on table "public"."corrections" to "authenticated";

grant update on table "public"."corrections" to "authenticated";

grant delete on table "public"."corrections" to "service_role";

grant insert on table "public"."corrections" to "service_role";

grant references on table "public"."corrections" to "service_role";

grant select on table "public"."corrections" to "service_role";

grant trigger on table "public"."corrections" to "service_role";

grant truncate on table "public"."corrections" to "service_role";

grant update on table "public"."corrections" to "service_role";

grant delete on table "public"."diaries" to "anon";

grant insert on table "public"."diaries" to "anon";

grant references on table "public"."diaries" to "anon";

grant select on table "public"."diaries" to "anon";

grant trigger on table "public"."diaries" to "anon";

grant truncate on table "public"."diaries" to "anon";

grant update on table "public"."diaries" to "anon";

grant delete on table "public"."diaries" to "authenticated";

grant insert on table "public"."diaries" to "authenticated";

grant references on table "public"."diaries" to "authenticated";

grant select on table "public"."diaries" to "authenticated";

grant trigger on table "public"."diaries" to "authenticated";

grant truncate on table "public"."diaries" to "authenticated";

grant update on table "public"."diaries" to "authenticated";

grant delete on table "public"."diaries" to "service_role";

grant insert on table "public"."diaries" to "service_role";

grant references on table "public"."diaries" to "service_role";

grant select on table "public"."diaries" to "service_role";

grant trigger on table "public"."diaries" to "service_role";

grant truncate on table "public"."diaries" to "service_role";

grant update on table "public"."diaries" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

grant delete on table "public"."words" to "anon";

grant insert on table "public"."words" to "anon";

grant references on table "public"."words" to "anon";

grant select on table "public"."words" to "anon";

grant trigger on table "public"."words" to "anon";

grant truncate on table "public"."words" to "anon";

grant update on table "public"."words" to "anon";

grant delete on table "public"."words" to "authenticated";

grant insert on table "public"."words" to "authenticated";

grant references on table "public"."words" to "authenticated";

grant select on table "public"."words" to "authenticated";

grant trigger on table "public"."words" to "authenticated";

grant truncate on table "public"."words" to "authenticated";

grant update on table "public"."words" to "authenticated";

grant delete on table "public"."words" to "service_role";

grant insert on table "public"."words" to "service_role";

grant references on table "public"."words" to "service_role";

grant select on table "public"."words" to "service_role";

grant trigger on table "public"."words" to "service_role";

grant truncate on table "public"."words" to "service_role";

grant update on table "public"."words" to "service_role";



