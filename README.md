# Performance Management System

Система управління продуктивністю для сучасних команд з використанням Next.js, Convex та Clerk.

## 🚀 Швидкий старт

### 1. Встановлення залежностей
```bash
npm install
```

### 2. Налаштування environment variables
Скопіюйте `.env.example` в `.env.local` та заповніть необхідні змінні:

```bash
cp .env.example .env.local
```

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud

# Clerk (замініть на ваші реальні ключі)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### 3. Запуск Convex
```bash
npx convex dev
```

### 4. Запуск додатку
```bash
npm run dev
```

## 🛠️ Технології

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Convex (база даних + API)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📁 Структура проекту

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Головна сторінка
│   ├── goals/            # Управління цілями
│   ├── feedback/         # Система відгуків
│   └── ...
├── components/           # React компоненти
│   ├── dashboard/       # Компоненти дашборду
│   ├── ui/             # UI компоненти
│   └── ...
└── lib/                # Утиліти та конфігурація

convex/
├── schema.ts           # Схема бази даних
├── users.ts           # API для користувачів
├── goals.ts           # API для цілей
├── feedback.ts        # API для відгуків
└── ...
```

## 🔧 Основні функції

### ✅ Реалізовано
- [x] Автентифікація через Clerk
- [x] Автоматичне створення користувача при першому вході
- [x] Дашборд з статистикою
- [x] Система цілей (CRUD операції)
- [x] Система відгуків
- [x] Responsive дизайн
- [x] Темна/світла тема

### 🚧 В розробці
- [ ] Система оцінювання продуктивності
- [ ] Цикли оцінювання
- [ ] Аналітика та звіти
- [ ] Командна структура
- [ ] Налаштування користувача

## 🐛 Виправлені проблеми

### Convex Integration
- ✅ Виправлено дублювання схеми в `users.ts`
- ✅ Синхронізовано типи між схемою та компонентами
- ✅ Додано перевірку environment variables
- ✅ Виправлено рекурсивний рендеринг у Sidebar
- ✅ Додано автоматичне створення користувача

### TypeScript
- ✅ Виправлено типи для Goals та Feedback
- ✅ Додано правильні інтерфейси
- ✅ Синхронізовано з Convex схемою

### UI/UX
- ✅ Виправлено проблеми з responsive дизайном
- ✅ Покращено доступність
- ✅ Додано loading стани

## 🧪 Тестування

### Створення тестових даних
На дашборді є кнопка "Create Test Data" для створення тестових користувачів, цілей та відгуків.

### Перевірка підключення
Компонент `ConvexTest` показує всіх користувачів з бази даних для перевірки підключення.

## 📝 API Endpoints

### Users
- `getUserByClerkId` - отримання користувача за Clerk ID
- `getAllUsers` - всі користувачі
- `createUser` - створення користувача
- `updateUser` - оновлення користувача

### Goals
- `getGoalsByUser` - цілі користувача
- `createGoal` - створення цілі
- `updateGoal` - оновлення цілі
- `deleteGoal` - видалення цілі

### Feedback
- `getFeedbackByUser` - відгуки користувача
- `createFeedback` - створення відгуку
- `updateFeedback` - оновлення відгуку

## 🔒 Безпека

- Всі API endpoints захищені через Clerk
- Перевірка прав доступу на рівні функцій
- Валідація даних через Convex схему

## 🚀 Deployment

### Vercel
1. Підключіть репозиторій до Vercel
2. Налаштуйте environment variables
3. Deploy

### Convex
1. Створіть production deployment
2. Оновіть `NEXT_PUBLIC_CONVEX_URL`

## 📞 Підтримка

При виникненні проблем:
1. Перевірте console браузера
2. Перевірте логи Convex
3. Переконайтеся, що всі environment variables налаштовані

## 📄 Ліцензія

MIT License
