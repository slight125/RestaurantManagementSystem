# ✅ Vercel Deployment Checklist

Quick checklist to ensure smooth deployment of TamuEats on Vercel.

---

## Pre-Deployment Checklist

- [ ] **GitHub Repository**
  - [ ] All code committed and pushed
  - [ ] `.env` files are in `.gitignore`
  - [ ] Build scripts work locally (`npm run build`)
  
- [ ] **Database Setup**
  - [ ] PostgreSQL database created (Vercel Postgres / Supabase / Neon)
  - [ ] Database connection string ready
  - [ ] Database schema initialized
  - [ ] Test data seeded (optional)

- [ ] **Accounts Created**
  - [ ] Vercel account created
  - [ ] Cloudinary account (if using image uploads)
  - [ ] Database provider account

- [ ] **Environment Variables Ready**
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET` (minimum 32 characters)
  - [ ] `CLOUDINARY_CLOUD_NAME` (optional)
  - [ ] `CLOUDINARY_API_KEY` (optional)
  - [ ] `CLOUDINARY_API_SECRET` (optional)

---

## Deployment Steps

### 1. Frontend Deployment

- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Import `RestaurantManagementSystem` repository
- [ ] Configure settings:
  - [ ] Framework Preset: **Vite**
  - [ ] Root Directory: **frontend**
  - [ ] Build Command: **npm run build**
  - [ ] Output Directory: **dist**
- [ ] Add environment variable:
  - [ ] `VITE_API_URL` = `/api` (or backend URL)
- [ ] Click **Deploy**
- [ ] Wait for deployment to complete
- [ ] Copy deployment URL

### 2. Backend Deployment

- [ ] Create new Vercel project
- [ ] Import same repository or deploy separately
- [ ] Configure settings:
  - [ ] Root Directory: **backend**
  - [ ] Build Command: **npm run build**
- [ ] Add environment variables:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV` = `production`
  - [ ] Cloudinary variables (if needed)
- [ ] Click **Deploy**
- [ ] Copy backend URL

### 3. Connect Frontend to Backend

- [ ] Update frontend environment variable `VITE_API_URL` with backend URL
- [ ] Redeploy frontend
- [ ] Update backend CORS to allow frontend URL

### 4. Database Initialization

- [ ] Connect to production database
- [ ] Run schema initialization:
  ```powershell
  cd backend
  npm run init-db
  ```
- [ ] Seed initial data (optional):
  ```powershell
  npm run seed
  ```

---

## Post-Deployment Verification

- [ ] **Frontend Tests**
  - [ ] Home page loads
  - [ ] Navigation works
  - [ ] All pages accessible
  - [ ] Responsive design works on mobile

- [ ] **Backend Tests**
  - [ ] API health check: `/api/health`
  - [ ] Get restaurants: `/api/restaurants`
  - [ ] User registration works
  - [ ] User login works

- [ ] **Database Tests**
  - [ ] Data is retrieved correctly
  - [ ] Data can be created
  - [ ] Data can be updated
  - [ ] Data can be deleted

- [ ] **Security Checks**
  - [ ] HTTPS enabled (automatic on Vercel)
  - [ ] CORS configured correctly
  - [ ] Environment variables not exposed
  - [ ] JWT authentication works

---

## Configuration Files Checklist

- [x] `vercel.json` (created)
- [x] `frontend/.env.production` (created)
- [x] `backend/.env.example` (created)
- [x] `frontend/package.json` (updated with vercel-build)
- [x] `backend/package.json` (updated with build scripts)

---

## Quick Commands

### Test Build Locally (Frontend)
```powershell
cd frontend
npm install
npm run build
npm run preview
```

### Test Build Locally (Backend)
```powershell
cd backend
npm install
npm run build
npm start
```

### Deploy with Vercel CLI
```powershell
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy frontend
cd frontend
vercel --prod

# Deploy backend
cd ../backend
vercel --prod
```

---

## Environment Variables Template

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.vercel.app/api
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

---

## Common Issues & Quick Fixes

### Build Fails
```powershell
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API 404 Error
- Check `VITE_API_URL` is set correctly
- Verify backend is deployed
- Check `vercel.json` routes

### CORS Error
- Add frontend URL to backend CORS whitelist
- Enable credentials if needed
- Redeploy backend

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check database is publicly accessible
- Test connection locally first

---

## Success Metrics

After deployment, you should have:

✅ Frontend accessible at: `https://tamueats.vercel.app`
✅ Backend API at: `https://tamueats-api.vercel.app/api`
✅ Database connected and operational
✅ User authentication working
✅ All CRUD operations functional
✅ Responsive design on all devices
✅ HTTPS enabled
✅ Automatic deployments on Git push

---

## Next Steps

1. **Custom Domain** (Optional)
   - Add your custom domain in Vercel settings
   - Update DNS records
   - SSL automatically configured

2. **Monitoring**
   - Enable Vercel Analytics
   - Set up error tracking
   - Monitor function logs

3. **Optimization**
   - Enable caching headers
   - Optimize images
   - Implement CDN for assets

4. **Testing**
   - Test on multiple devices
   - Check all user flows
   - Verify payment integration (if applicable)

---

**Deployment Date**: _____________
**Frontend URL**: _____________
**Backend URL**: _____________
**Database**: _____________

---

🎉 **Congratulations on your deployment!**
