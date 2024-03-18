These are the steps to create this project:

```bash
mkdir express-boilerplate
pnpm init
pnpm i typescript -D
npx tsc --init
# modify tsconfig.json -> src, outDir
pnpm i express cors bcrypt jsonwebtoken
pnpm i @types/express @types/cors @types/bcrypt @types/jsonwebtoken tsc-watch -D
# modify package.json
# create devcontainer.json
```
