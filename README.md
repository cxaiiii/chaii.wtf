# chaii.wtf

## Routes

- `/` — Chaitanya Saxena portfolio
- `/vasudha` — standalone product landing page
- `/studio` — password-protected image library
- `/photonica` — Photonica product page (optics simulator)
- `/photonica/docs` — Photonica documentation

## Launch on Vercel

1. Import this folder as a Git repository in Vercel and deploy.
2. Add `chaii.wtf` and `www.chaii.wtf` in **Project → Settings → Domains**. Set `www` to redirect to the root domain.
3. In **Storage**, create a **Vercel Blob** store and connect it to this project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
4. Add these environment variables for Production, Preview, and Development:
   - `STUDIO_PASSWORD` — a long, unique password for `/studio`
   - `STUDIO_SECRET` — a separate long random value (for example `openssl rand -hex 32`)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — optional digits-only international WhatsApp number, such as `919876543210`
5. Redeploy. Visit `/studio`, sign in, and upload JPEG, PNG, WebP, or GIF images. The dashboard lets you copy URLs or delete them.

The Studio upload and delete endpoints verify the signed, httpOnly Studio cookie server-side. Do not commit a real `.env.local`.
