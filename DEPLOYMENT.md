# Deployment Instructions

## 🚀 Vercel Deployment

### 1. Підготовка Convex

1. **Створіть production deployment Convex:**
   ```bash
   npx convex deploy --prod
   ```

2. **Отримайте production URL** з Convex dashboard

### 2. Налаштування Vercel

1. **Підключіть репозиторій до Vercel**

2. **Налаштуйте Environment Variables в Vercel Dashboard:**
   ```
   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   ```

3. **Налаштуйте Build Command:**
   ```
   npm run build:vercel
   ```

### 3. Налаштування Clerk

1. **Додайте домен Vercel в Clerk Dashboard:**
   - Production: `https://your-project.vercel.app`
   - Development: `https://your-project-git-main-your-team.vercel.app`

2. **Налаштуйте OAuth providers** (Google, GitHub, etc.)

### 4. Troubleshooting

#### Помилка "Module not found: Can't resolve '../../convex/_generated/api'"
- Переконайтеся, що `convex codegen` виконується під час build
- Перевірте, що `NEXT_PUBLIC_CONVEX_URL` встановлений правильно

#### Помилка "NEXT_PUBLIC_CONVEX_URL is not set"
- Додайте змінну в Vercel Environment Variables
- Перезапустіть deployment

#### Помилка автентифікації
- Перевірте Clerk ключі
- Додайте домен Vercel в Clerk Dashboard

### 5. Production Checklist

- [ ] Convex production deployment створений
- [ ] Environment variables налаштовані
- [ ] Clerk домени додані
- [ ] Build проходить успішно
- [ ] Тестовані основні функції
- [ ] SSL сертифікат активний

## 🔧 Local Development

```bash
# Встановлення залежностей
npm install

# Запуск Convex
npx convex dev

# Запуск додатку
npm run dev
```

## 📝 Environment Variables

### Required
- `NEXT_PUBLIC_CONVEX_URL` - URL вашого Convex deployment
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key

### Optional
- `CONVEX_DEPLOYMENT` - Convex deployment name
- `VERCEL_URL` - Vercel URL (автоматично)

## 🐛 Common Issues

### Build Fails
1. Перевірте, що всі environment variables встановлені
2. Переконайтеся, що Convex deployment існує
3. Перевірте логи build в Vercel

### Runtime Errors
1. Перевірте console браузера
2. Перевірте Convex logs
3. Переконайтеся, що домени налаштовані правильно
