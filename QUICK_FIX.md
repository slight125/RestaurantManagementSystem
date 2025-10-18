# ⚡ QUICK FIX - Vercel Deployment Error

## 🎯 The Issue
Vercel is trying to build admin panel files instead of your frontend customer app.

## ✅ The Fix (30 seconds)

### In Vercel Dashboard:

1. **Go to**: https://vercel.com/dashboard
2. **Click**: Your project (restaurant-management-system)
3. **Click**: Settings → General
4. **Find**: "Root Directory" section
5. **Click**: Edit button
6. **Type**: `frontend`
7. **Click**: Save
8. **Go to**: Deployments tab
9. **Click**: "..." menu on latest deployment
10. **Click**: Redeploy

**Done!** ✅ Your next deployment will work!

---

## 🔄 Or Start Fresh (Recommended)

### Delete & Re-import:

1. **Delete failed project** in Vercel
2. **Go to**: https://vercel.com/new
3. **Import**: RestaurantManagementSystem
4. **Set these values**:

```
┌─────────────────────────────────────────┐
│ Framework: Vite                         │
│ Root Directory: frontend  ← THE FIX!    │
│ Build Command: pnpm run build           │
│ Output Directory: dist                  │
│ Install Command: pnpm install           │
│                                         │
│ Environment Variable:                   │
│ VITE_API_URL = /api                     │
└─────────────────────────────────────────┘
```

5. **Click Deploy**

---

## ❌ What Went Wrong

```
Your Repo:
├── frontend/        ← Should deploy THIS
│   └── src/
│       └── pages/
│           └── Home.tsx ✅
│
├── admin/           ← Vercel tried THIS (wrong!)
│   └── src/
│       └── AdminAnalytics.tsx ❌ (has missing deps)
│
└── backend/         ← Deploy separately
```

**Root Directory tells Vercel which folder to build!**

---

## ✨ After Fix

You'll see:
```
✅ Installing dependencies from frontend/package.json
✅ Building with Vite
✅ Build completed successfully
✅ Deployment ready
```

No more errors! 🎉

---

## 📱 Then Continue With:

1. ✅ Frontend deployed successfully
2. Next: Deploy backend (also set Root Directory: `backend`)
3. Next: Connect them together
4. Done: Your app is live!

---

**Remember**: Always set **Root Directory** when deploying monorepos!

- Frontend: Root = `frontend`
- Backend: Root = `backend`
