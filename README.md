# 🚀 Performance Management System

Сучасна система управління продуктивністю персоналу з інтеграцією аутентифікації та бази даних.

## ✨ Особливості

- 🔐 **Аутентифікація через Clerk** - безпечний вхід та управління користувачами
- 📊 **Dashboard** - головна панель з метриками та прогресом
- 🎯 **Управління цілями** - створення, відстеження та аналіз SMART-цілей
- 👥 **Командна робота** - управління командами та співпраця
- 📈 **Відгуки продуктивності** - система оцінки та зворотного зв'язку
- 🔄 **Цикли продуктивності** - планування та проведення оцінок
- 📱 **Адаптивний дизайн** - працює на всіх пристроях
- 🎨 **Сучасний UI** - красивий інтерфейс з Tailwind CSS

## 🛠 Технології

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Clerk
- **Database**: Convex
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Швидкий старт

### 1. Клонування репозиторію

```bash
git clone <your-repo-url>
cd management-performance
```

### 2. Встановлення залежностей

```bash
npm install
```

### 3. Налаштування змінних середовища

Створіть файл `.env.local` з наступними змінними:

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOYMENT=your-project-name

# Clerk (отримайте ключі на https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### 4. Налаштування Clerk

1. Зареєструйтесь на [clerk.com](https://clerk.com)
2. Створіть новий проєкт
3. Скопіюйте ключі в `.env.local`
4. Налаштуйте домени в налаштуваннях Clerk

### 5. Налаштування Convex

1. Встановіть Convex CLI: `npm install -g convex`
2. Увійдіть: `npx convex dev --once`
3. Синхронізуйте схему: `npx convex dev`

### 6. Запуск проєкту

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

## 📁 Структура проєкту

```
management-performance/
├── convex/                 # База даних Convex
│   ├── schema.ts          # Схема бази даних
│   ├── users.ts           # Функції користувачів
│   ├── goals.ts           # Функції цілей
│   ├── reviews.ts         # Функції відгуків
│   ├── cycles.ts          # Функції циклів
│   ├── feedback.ts        # Функції відгуків
│   ├── skills.ts          # Функції навичок
│   └── notifications.ts   # Функції сповіщень
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── dashboard/     # Головна панель
│   │   ├── goals/         # Сторінка цілей
│   │   ├── reviews/       # Сторінка відгуків
│   │   └── ...
│   ├── components/        # React компоненти
│   │   ├── Header.tsx     # Заголовок
│   │   ├── Sidebar.tsx    # Бічна панель
│   │   ├── Layout.tsx     # Макет
│   │   └── ...
│   └── lib/               # Утиліти
│       └── convex.ts      # Клієнт Convex
├── public/                # Статичні файли
└── ...
```

## 🎯 Основні функції

### Dashboard
- Огляд продуктивності
- Статистика цілей
- Майбутні відгуки
- Швидкі дії

### Управління цілями
- Створення SMART-цілей
- Відстеження прогресу
- Категорії та пріоритети
- Метрики та KPI

### Відгуки продуктивності
- Самооцінка
- Відгуки менеджера
- 360° відгуки
- Історія оцінок

### Командна робота
- Управління командами
- Розподіл ролей
- Співпраця
- Комунікація

## 🔧 Розробка

### Додавання нових функцій

1. **Схема бази даних**: Оновіть `convex/schema.ts`
2. **Функції**: Створіть нові файли в `convex/`
3. **Компоненти**: Додайте в `src/components/`
4. **Сторінки**: Створіть в `src/app/`

### Стилізація

Проєкт використовує Tailwind CSS з кастомною палітрою кольорів:

```css
/* Основні кольори */
--purple-main: #651FFF
--purple-hover: #5b1de6
--purple-pressed: #5c3FFF
```

## 🚀 Деплой

### Vercel

1. Підключіть репозиторій до Vercel
2. Додайте змінні середовища
3. Деплой автоматичний

### Інші платформи

```bash
npm run build
npm start
```

## 📝 Ліцензія

MIT License

## 🤝 Підтримка

Якщо у вас є питання або пропозиції, створіть issue або pull request.

---

**Performance Management System** - покращуйте продуктивність разом з нами! 🚀
