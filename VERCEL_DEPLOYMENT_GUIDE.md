# 🚀 TamuEats - Vercel Deployment Guide

Complete step-by-step guide to deploy your TamuEats Restaurant Management System on Vercel.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ A [Vercel account](https://vercel.com/signup) (free tier works!)
- ✅ [Vercel CLI](https://vercel.com/docs/cli) installed (optional but recommended)
- ✅ A PostgreSQL database (Vercel Postgres, Supabase, or Neon)
- ✅ Your GitHub repository pushed and up-to-date
- ✅ Cloudinary account (if using image uploads)

---

## 🎯 Deployment Strategy

Your project has two parts:
1. **Frontend** (React + Vite) → Deploy as Static Site
2. **Backend** (Node.js + Express) → Deploy as Serverless Functions

### Option 1: Monorepo Deployment (Recommended)
Deploy both frontend and backend from a single repository.

### Option 2: Separate Deployments
Deploy frontend and backend as separate Vercel projects.

---

## 🚀 Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Set Up PostgreSQL Database

#### Option A: Use Vercel Postgres (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Name it `tamueats-db`
6. Choose a region close to your users
7. Click **Create**
8. Copy the connection string from the `.env.local` tab

#### Option B: Use Supabase (Free Alternative)

1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Go to **Settings** → **Database**
4. Copy **Connection String** (URI mode)
5. Replace `[YOUR-PASSWORD]` with your database password

#### Option C: Use Neon (Free Alternative)

1. Go to [Neon](https://neon.tech)
2. Create new project
3. Copy the connection string

### Step 2: Import GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **Import Project**
3. Select **Import Git Repository**
4. Choose **GitHub** and authorize Vercel
5. Select `RestaurantManagementSystem` repository
6. Click **Import**

### Step 3: Configure Project Settings

#### Framework Preset
- **Framework**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables

Click **Environment Variables** and add:

#### For Frontend:
```
VITE_API_URL = /api
```

#### For Backend (if deploying as serverless):
```
DATABASE_URL = postgresql://user:password@host:5432/database
JWT_SECRET = your_super_secret_jwt_key_minimum_32_characters
NODE_ENV = production
CLOUDINARY_CLOUD_NAME = your_cloud_name (optional)
CLOUDINARY_API_KEY = your_api_key (optional)
CLOUDINARY_API_SECRET = your_api_secret (optional)
```

**Important**: 
- ✅ Click **Add** after each variable
- ✅ Select all environments (Production, Preview, Development)

### Step 5: Deploy Frontend

1. Click **Deploy**
2. Wait for build to complete (2-5 minutes)
3. Your frontend will be live at `https://your-project.vercel.app`

### Step 6: Deploy Backend (Serverless Function)

Since your backend needs to run continuously, you have two options:

#### Option A: Backend as Serverless API Routes (Recommended for Vercel)

1. Create a new Vercel project for the backend
2. **Root Directory**: `backend`
3. Add the same environment variables
4. The backend will be available at `https://your-backend.vercel.app`

#### Option B: Use Vercel Functions

Create `api/` folder in root and move backend routes there (requires restructuring)

---

## 🚀 Method 2: Deploy via Vercel CLI (Advanced)

### Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

### Step 2: Login to Vercel

```powershell
vercel login
```

Follow the browser authentication.

### Step 3: Deploy Frontend

```powershell
cd frontend
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your username
- **Link to existing project?** → No
- **Project name?** → tamueats-frontend
- **Directory?** → ./
- **Override settings?** → No

### Step 4: Deploy Backend

```powershell
cd ../backend
vercel --prod
```

Follow the same prompts but use project name `tamueats-backend`

### Step 5: Configure Environment Variables via CLI

```powershell
# For frontend
cd frontend
vercel env add VITE_API_URL production
# Enter: https://tamueats-backend.vercel.app/api

# For backend
cd ../backend
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
vercel env add NODE_ENV production
```

---

## 🗄️ Database Setup

### Initialize Database Schema

After deploying, you need to set up your database tables:

#### Option 1: Run Locally Against Production DB

1. Copy your production `DATABASE_URL`
2. Create local `.env` file:
```
DATABASE_URL=your_production_database_url
```

3. Run initialization:
```powershell
cd backend
npm run init-db
```

#### Option 2: Use Vercel Dashboard Terminal

1. Go to your backend project in Vercel
2. Click **Settings** → **Functions**
3. Create an API route to initialize database (temporary)

#### Option 3: Use Database GUI

1. Connect to your database using:
   - [pgAdmin](https://www.pgadmin.org/) (PostgreSQL)
   - [TablePlus](https://tableplus.com/)
   - [Postico](https://eggerapps.at/postico/)

2. Run SQL from `backend/src/db/schema.sql`

---

## 🔧 Important Configuration Updates

### Update Frontend API Calls

Ensure your frontend API calls use environment variables:

**File**: `frontend/src/services/api.ts`

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Update Backend CORS Settings

**File**: `backend/src/index.ts`

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app',
    'https://*.vercel.app' // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

### Update Vite Config for Production

**File**: `frontend/vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})
```

---

## 🎯 Monorepo Deployment (Both Frontend & Backend Together)

For a unified deployment, use the `vercel.json` configuration already created:

### Step 1: Update `vercel.json`

The file is already created with proper configuration.

### Step 2: Deploy from Root

```powershell
vercel --prod
```

This will deploy both frontend and backend together!

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Frontend loads at your Vercel URL
- [ ] API endpoints respond correctly
- [ ] Database connection works
- [ ] User authentication works
- [ ] Image uploads work (if using Cloudinary)
- [ ] All pages are responsive
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly
- [ ] SSL/HTTPS is enabled (Vercel does this automatically)

---

## 🧪 Testing Your Deployment

### Test Frontend
```
Visit: https://your-project.vercel.app
```

Check:
- Home page loads
- Navigation works
- All pages are accessible

### Test Backend
```
Visit: https://your-backend.vercel.app/api/health
```

Or use curl:
```powershell
curl https://your-backend.vercel.app/api/health
```

Should return: `{"status": "ok"}`

### Test Database Connection

```powershell
curl https://your-backend.vercel.app/api/restaurants
```

Should return restaurant data.

---

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ **NEVER** commit `.env` files to Git
- ✅ Use Vercel's environment variables for secrets
- ✅ Rotate JWT secrets regularly
- ✅ Use strong database passwords

### 2. CORS Configuration
```typescript
// Only allow your frontend domain
app.use(cors({
  origin: 'https://your-frontend.vercel.app',
  credentials: true
}));
```

### 3. Rate Limiting
Add rate limiting to prevent abuse:

```powershell
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Error**: `Module not found`
**Solution**: Check `package.json` has all dependencies

```powershell
npm install
npm run build
```

### Issue: API Returns 404

**Error**: API endpoints not found
**Solution**: 
1. Check `vercel.json` routes configuration
2. Verify backend is deployed separately
3. Update `VITE_API_URL` environment variable

### Issue: Database Connection Failed

**Error**: `Cannot connect to database`
**Solution**:
1. Verify `DATABASE_URL` is set correctly
2. Check database is accessible from internet
3. Verify IP whitelist (if applicable)
4. Test connection locally first

### Issue: CORS Errors

**Error**: `Access-Control-Allow-Origin`
**Solution**:
1. Update CORS configuration in backend
2. Add frontend URL to allowed origins
3. Enable credentials if needed

### Issue: Environment Variables Not Working

**Solution**:
1. Redeploy after adding variables
2. Check variable names match exactly
3. Select correct environment (Production/Preview)

---

## 🔄 Continuous Deployment

Vercel automatically deploys on Git push!

### Automatic Deployments

1. **Push to `main` branch** → Production deployment
2. **Push to any branch** → Preview deployment
3. **Pull requests** → Preview deployment with unique URL

### Manual Deployment

```powershell
vercel --prod
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Free)

1. Go to **Project Settings**
2. Click **Analytics**
3. Enable **Web Analytics**

This gives you:
- Page views
- Unique visitors
- Top pages
- Performance metrics

### Vercel Logs

View deployment and function logs:
1. Go to **Deployments**
2. Click on any deployment
3. View **Function Logs** tab

---

## 💰 Pricing Considerations

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Serverless functions (100 GB-hours)
- ✅ SSL certificates
- ✅ Custom domains
- ✅ Preview deployments

### Vercel Postgres Free Tier:
- ✅ 256 MB storage
- ✅ 60 hours compute/month
- ✅ 256 MB RAM

**For production use**, consider:
- Pro plan ($20/month) for better limits
- External database (Supabase/Neon free tier is generous)

---

## 🎉 You're Live!

Once deployed, your TamuEats application will be accessible at:

- **Frontend**: `https://tamueats.vercel.app`
- **Backend**: `https://tamueats-api.vercel.app`

Share your link and start taking orders! 🍕🍔🍣

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)

---

## 🆘 Need Help?

If you encounter issues:

1. Check [Vercel Discussions](https://github.com/vercel/vercel/discussions)
2. Review deployment logs in Vercel Dashboard
3. Test locally first: `npm run build && npm run preview`
4. Verify all environment variables are set

---

**Good luck with your deployment! 🚀**
