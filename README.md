# Learnly

Your AI-powered personal tutor.

## Setup

1. Rename `.env.local.example` to `.env.local`
2. Fill in your three keys:
   - `NEXT_PUBLIC_SUPABASE_URL` — from Supabase > Settings > API
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase > Settings > API
   - `ANTHROPIC_API_KEY` — from console.anthropic.com

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com > New Project > Import your repo
3. Add the 3 environment variables in Vercel's settings
4. Click Deploy

That's it — your app is live!
