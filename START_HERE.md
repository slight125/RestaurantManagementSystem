# 🚀 START HERE - Deploy TamuEats to Vercel

**Total Time: ~15 minutes** ⏱️

---

## ✅ What You Need (2 minutes to prepare)

1. **Vercel Account** (free)
   - Go to: https://vercel.com/signup
   - Sign up with GitHub (easiest)

2. **Database** (choose one):
   - **Vercel Postgres** (easiest, free tier)
   - **Supabase** (great free tier)
   - **Neon** (serverless postgres)

3. **Random JWT Secret** (any random string 32+ characters)
   - Example: `my_super_secret_jwt_key_12345678901234567890`

---

## 🎯 Quick Deployment (13 minutes)

### STEP 1: Database (3 min)

#### Option A - Vercel Postgres (Easiest):
1. Go to https://vercel.com/dashboard
2. Click **Storage** → **Create Database** → **Postgres**
3. Name: `tamueats-db` → Click **Create**
4. Copy connection string (starts with `postgres://...`)

#### Option B - Supabase:
1. Go to https://supabase.com → Create project
2. **Settings** → **Database** → Copy connection string
3. Replace `[YOUR-PASSWORD]` with your password

---

### STEP 2: Deploy Frontend (4 min)

1. **Go to**: https://vercel.com/new

2. **Import Repository**:
   - Click "Import Git Repository"
   - Select `RestaurantManagementSystem`
   - Click **Import**

3. **Configure**:
   - Framework: **Vite**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variable**:
   ```
   Name:  VITE_API_URL
   Value: /api
   ```
   Click **Add**

5. Click **Deploy** → Wait 2-3 minutes ⏳

6. **Copy URL**: Your app is at `https://your-project.vercel.app` 🎉

---

### STEP 3: Deploy Backend (4 min)

1. **New Project** on Vercel: https://vercel.com/new

2. **Import Same Repo**:
   - Select `RestaurantManagementSystem`
   - Root Directory: **backend** (important!)

3. **Environment Variables**:
   ```
   DATABASE_URL = paste_your_postgres_url_from_step_1
   JWT_SECRET = my_super_secret_jwt_key_12345678901234567890
   NODE_ENV = production
   ```
   Click **Add** for each

4. Click **Deploy** → Wait 2-3 minutes ⏳

5. **Copy Backend URL**: `https://your-backend.vercel.app`

---

### STEP 4: Connect (2 min)

1. Go to **Frontend Project** on Vercel

2. **Settings** → **Environment Variables**

3. **Edit** `VITE_API_URL`:
   - Change from: `/api`
   - To: `https://your-backend.vercel.app/api`
   - Click **Save**

4. **Deployments** → **Redeploy** latest

---

### STEP 5: Database Setup (Local - One Time)

**On your computer:**

1. Create `backend/.env`:
   ```
   DATABASE_URL=paste_your_production_database_url
   ```

2. Run:
   ```powershell
   cd backend
   npm install
   npm run init-db
   ```

3. Done! ✅

---

## 🎊 You're LIVE!

Visit: `https://your-project.vercel.app`

You should see:
- ✅ Homepage loads
- ✅ Can view restaurants
- ✅ Can register/login
- ✅ Responsive on mobile

---

## 🔧 If Something Breaks

### Frontend loads but no data?
→ Check backend deployed successfully
→ Verify `VITE_API_URL` is correct
→ Redeploy frontend

### Backend errors?
→ Check environment variables are set
→ Verify `DATABASE_URL` is correct
→ Check deployment logs in Vercel

### Database errors?
→ Make sure you ran `npm run init-db`
→ Verify database allows connections
→ Test connection locally first

---

## 📚 More Help?

- **Quick**: `QUICK_DEPLOY.md`
- **Detailed**: `VERCEL_DEPLOYMENT_GUIDE.md`
- **Checklist**: `DEPLOYMENT_CHECKLIST.md`

---

## 🎯 After Deployment

### Automatic Updates
Just push to GitHub:
```powershell
git add .
git commit -m "updates"
git push
```
Vercel will auto-deploy! 🚀

### Custom Domain
1. Vercel Dashboard → Your Project
2. Settings → Domains
3. Add your domain
4. Follow DNS instructions

---

## 🎉 Congratulations!

Your TamuEats food delivery platform is now:
- 🌐 Live on the internet
- 🔒 Secured with HTTPS
- 📱 Responsive on all devices
- 🚀 Auto-deploys on Git push
- 🌍 Available worldwide via CDN

**Share your URL and start taking orders!** 🍕🍔🍣

---

**Questions?** Check the comprehensive guides in this folder!

**Ready?** Let's deploy! → https://vercel.com/new
