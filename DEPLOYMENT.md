# DEPLOYMENT CHECKLIST

## Render Backend Setup:
1. Go to Render Dashboard -> Your Service -> Environment
2. Add these environment variables:
   - GEMINI_API_KEY=AIzaSyDEwDVS2Ox6g7upby7x0FueIlQ_pWHFs5c
   - PORT=5000
   - NODE_ENV=production

## Vercel Frontend Setup:
1. Go to Vercel Dashboard -> Project Settings -> Environment Variables
2. Add this environment variable:
   - VITE_API_BASE_URL=https://myformatterfriend.onrender.com/api

## Test URLs:
- Backend Health: https://myformatterfriend.onrender.com/api/health
- Model Status: https://myformatterfriend.onrender.com/api/document/model-status
- Frontend: https://formatterfriend.vercel.app

## Current Status:
- Backend deployed ✅
- Frontend deployed ✅
- Environment variables needed ❌ (Render shows 0 env vars)
- CORS configured ✅