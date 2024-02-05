


## DB
### 準備
```
$ supabase login
$ supabase start   # Docker started
$ supabase link --project-ref {project id}
$ supabase db pull # remote project db to local db
```

### 更新
prisma -> supabase

```
$ npx prisma db push
$ supabase db diff -f {migration file name}
$ supabase db push
```

### 修正切り戻し
```
$ supabase db reset # migrations file 
```

