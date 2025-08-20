// Реальні дані команди Cieden з https://cieden.com/about
export const mockUsers = [
  {
    _id: "user1",
    clerkId: "clerk_user1",
    email: "yuriy@cieden.com",
    firstName: "Yuriy",
    lastName: "Mykhasyak",
    role: "admin" as const,
    department: "Leadership",
    position: "CEO & co-founder",
    hireDate: "2020-01-01",
    managerId: undefined,
    avatar: "",
    isActive: true,
    createdAt: 1577836800000,
    updatedAt: 1577836800000,
  },
  {
    _id: "user2",
    clerkId: "clerk_user2",
    email: "iryna@cieden.com",
    firstName: "Iryna",
    lastName: "Serednia",
    role: "admin" as const,
    department: "Design",
    position: "Design Director, co-founder",
    hireDate: "2020-01-01",
    managerId: undefined,
    avatar: "",
    isActive: true,
    createdAt: 1577836800000,
    updatedAt: 1577836800000,
  },
  {
    _id: "user3",
    clerkId: "clerk_user3",
    email: "kateryna@cieden.com",
    firstName: "Kateryna",
    lastName: "Zavertailo",
    role: "manager" as const,
    department: "Sales",
    position: "Sales Manager",
    hireDate: "2021-03-15",
    managerId: "user1",
    avatar: "",
    isActive: true,
    createdAt: 1615766400000,
    updatedAt: 1615766400000,
  },
  {
    _id: "user4",
    clerkId: "clerk_user4",
    email: "roman@cieden.com",
    firstName: "Roman",
    lastName: "Kaminechny",
    role: "manager" as const,
    department: "Design",
    position: "Head of Design Department",
    hireDate: "2021-06-01",
    managerId: "user2",
    avatar: "",
    isActive: true,
    createdAt: 1622505600000,
    updatedAt: 1622505600000,
  },
  {
    _id: "user5",
    clerkId: "clerk_user5",
    email: "anastasiya@cieden.com",
    firstName: "Anastasiya",
    lastName: "Mudryk",
    role: "manager" as const,
    department: "PM/BA",
    position: "Head of PM/BA",
    hireDate: "2021-08-01",
    managerId: "user1",
    avatar: "",
    isActive: true,
    createdAt: 1627776000000,
    updatedAt: 1627776000000,
  },
  {
    _id: "user6",
    clerkId: "clerk_user6",
    email: "olesia@cieden.com",
    firstName: "Olesia",
    lastName: "Havryshko",
    role: "employee" as const,
    department: "PM/BA",
    position: "Product Manager/Business Analyst",
    hireDate: "2022-01-15",
    managerId: "user5",
    avatar: "",
    isActive: true,
    createdAt: 1642204800000,
    updatedAt: 1642204800000,
  },
  {
    _id: "user7",
    clerkId: "clerk_user7",
    email: "tetiana@cieden.com",
    firstName: "Tetiana",
    lastName: "Bondarchuk",
    role: "employee" as const,
    department: "PM/BA",
    position: "Product Manager/Business Analyst",
    hireDate: "2022-02-01",
    managerId: "user5",
    avatar: "",
    isActive: true,
    createdAt: 1643673600000,
    updatedAt: 1643673600000,
  },
  {
    _id: "user8",
    clerkId: "clerk_user8",
    email: "yulia@cieden.com",
    firstName: "Yulia",
    lastName: "Mahera",
    role: "employee" as const,
    department: "PM/BA",
    position: "Product Manager/Business Analyst",
    hireDate: "2022-03-01",
    managerId: "user5",
    avatar: "",
    isActive: true,
    createdAt: 1646092800000,
    updatedAt: 1646092800000,
  },
  {
    _id: "user9",
    clerkId: "clerk_user9",
    email: "andrew@cieden.com",
    firstName: "Andrew",
    lastName: "Sapkowski",
    role: "employee" as const,
    department: "Design",
    position: "Product Designer",
    hireDate: "2022-04-01",
    managerId: "user4",
    avatar: "",
    isActive: true,
    createdAt: 1648771200000,
    updatedAt: 1648771200000,
  },
  {
    _id: "user10",
    clerkId: "clerk_user10",
    email: "denis@cieden.com",
    firstName: "Denis",
    lastName: "Dudar",
    role: "employee" as const,
    department: "Design",
    position: "Product Designer",
    hireDate: "2022-05-01",
    managerId: "user4",
    avatar: "",
    isActive: true,
    createdAt: 1651363200000,
    updatedAt: 1651363200000,
  },
  {
    _id: "user11",
    clerkId: "clerk_user11",
    email: "valentyn@cieden.com",
    firstName: "Valentyn",
    lastName: "Skliarov",
    role: "employee" as const,
    department: "Design",
    position: "Product Designer",
    hireDate: "2022-06-01",
    managerId: "user4",
    avatar: "",
    isActive: true,
    createdAt: 1654041600000,
    updatedAt: 1654041600000,
  },
  {
    _id: "user12",
    clerkId: "clerk_user12",
    email: "daria@cieden.com",
    firstName: "Daria",
    lastName: "Novosiadla",
    role: "employee" as const,
    department: "Design",
    position: "Product Designer",
    hireDate: "2022-07-01",
    managerId: "user4",
    avatar: "",
    isActive: true,
    createdAt: 1656633600000,
    updatedAt: 1656633600000,
  }
];

// Функція для отримання повного імені користувача
export const getUserFullName = (userId: string) => {
  const user = mockUsers.find(u => u._id === userId);
  return user ? `${user.firstName} ${user.lastName}` : "Невідомий користувач";
};

// Функція для отримання користувача за ID
export const getUserById = (userId: string) => {
  return mockUsers.find(u => u._id === userId);
};

// Функція для отримання всіх менеджерів
export const getManagers = () => {
  return mockUsers.filter(u => u.role === "manager" || u.role === "admin");
};

// Функція для отримання всіх співробітників
export const getEmployees = () => {
  return mockUsers.filter(u => u.role === "employee");
};

// Функція для отримання підлеглих менеджера
export const getSubordinates = (managerId: string) => {
  return mockUsers.filter(u => u.managerId === managerId);
};

// Тестові дані для цілей (з реальними користувачами Cieden)
export const mockGoals = [
  {
    id: 1,
    userId: "user9",
    goalType: "work",
    title: "Покращити навички UX/UI дизайну",
    description: "Розвинути глибоке розуміння UX/UI принципів та методологій",
    progress: 75,
    priority: "high",
    status: "active",
    deadline: "2024-03-15",
    tags: ["UX/UI", "дизайн", "навички"],
    link: "https://cieden.com/services"
  },
  {
    id: 2,
    userId: "user10",
    goalType: "course",
    title: "Завершити курс AI Design Patterns",
    description: "Вивчити новітні підходи до дизайну AI-продуктів",
    progress: 100,
    priority: "high",
    status: "completed",
    deadline: "2024-02-01",
    tags: ["AI", "Course", "Design"],
    link: "https://cieden.com/expertise/ux-ui-for-ai"
  },
  {
    id: 3,
    userId: "user11",
    goalType: "english",
    title: "Підготуватися до презентації для клієнтів",
    description: "Покращити англійську для ефективної комунікації з міжнародними клієнтами",
    progress: 30,
    priority: "medium",
    status: "active",
    deadline: "2024-04-01",
    tags: ["English", "Presentation", "Clients"],
    link: "https://cieden.com/case-studies"
  },
  {
    id: 4,
    userId: "user6",
    goalType: "work",
    title: "Оптимізувати процес управління проектами",
    description: "Впровадити нові інструменти для ефективного управління проектами",
    progress: 60,
    priority: "high",
    status: "active",
    deadline: "2024-03-30",
    tags: ["Project Management", "Process", "Optimization"],
    link: "https://cieden.com/services/design-management-and-leadership"
  },
  {
    id: 5,
    userId: "user7",
    goalType: "certification",
    title: "Отримати сертифікацію Product Management",
    description: "Пройсти сертифікацію для підтвердження експертизи в Product Management",
    progress: 45,
    priority: "medium",
    status: "active",
    deadline: "2024-05-15",
    tags: ["Certification", "Product Management"],
    link: "https://cieden.com/services/design-management-and-leadership"
  }
];

// Тестові дані для відгуків (між реальними користувачами Cieden)
export const mockFeedbacks = [
  {
    id: 1,
    fromUserId: "user4",
    toUserId: "user9",
    category: "communication",
    rating: 6,
    comment: "Відмінна робота над проектом! Комунікація була чіткою та ефективною. Andrew показав високий рівень професіоналізму.",
    date: "2024-02-15",
    status: "completed",
    isAnonymous: false
  },
  {
    id: 2,
    fromUserId: "user5",
    toUserId: "user6",
    category: "technical",
    rating: 7,
    comment: "Дуже добре знання Product Management методологій. Olesia допомігла команді з складними завданнями.",
    date: "2024-02-10",
    status: "completed",
    isAnonymous: true
  },
  {
    id: 3,
    fromUserId: "user2",
    toUserId: "user10",
    category: "leadership",
    rating: 5,
    comment: "Denis демонструє хороші лідерські якості в команді дизайнерів.",
    date: "2024-02-20",
    status: "completed",
    isAnonymous: false
  },
  {
    id: 4,
    fromUserId: "user3",
    toUserId: "user11",
    category: "teamwork",
    rating: 6,
    comment: "Valentyn відмінно працює в команді та завжди готовий допомогти колегам.",
    date: "2024-02-18",
    status: "completed",
    isAnonymous: false
  },
  {
    id: 5,
    fromUserId: "user1",
    toUserId: "user12",
    category: "creativity",
    rating: 7,
    comment: "Daria показує високий рівень креативності в дизайні. Її робота завжди виділяється.",
    date: "2024-02-22",
    status: "completed",
    isAnonymous: false
  }
];

// Тестові дані для циклів продуктивності
export const mockCycles = [
  {
    id: 1,
    name: "Q1 2024 Performance Review",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    status: "active",
    participants: 12,
    completedReviews: 8,
    pendingReviews: 4,
    feedbackCollectionWindow: "2024-03-15 - 2024-03-31",
    performanceMeetings: "2024-04-01 - 2024-04-15"
  },
  {
    id: 2,
    name: "Q4 2023 Performance Review",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    status: "completed",
    participants: 10,
    completedReviews: 10,
    pendingReviews: 0,
    feedbackCollectionWindow: "2023-12-15 - 2023-12-31",
    performanceMeetings: "2024-01-01 - 2024-01-15"
  }
];

// Тестові дані для розкладів (з реальними користувачами Cieden)
export const mockSchedules = [
  {
    id: 1,
    employeeId: "user9",
    managerId: "user4",
    scheduledDate: "2024-04-05",
    time: "14:00",
    duration: "60 min",
    status: "scheduled",
    type: "performance_review"
  },
  {
    id: 2,
    employeeId: "user6",
    managerId: "user5",
    scheduledDate: "2024-04-08",
    time: "10:00",
    duration: "45 min",
    status: "pending",
    type: "feedback_session"
  },
  {
    id: 3,
    employeeId: "user10",
    managerId: "user4",
    scheduledDate: "2024-04-10",
    time: "16:00",
    duration: "60 min",
    status: "scheduled",
    type: "performance_review"
  },
  {
    id: 4,
    employeeId: "user11",
    managerId: "user4",
    scheduledDate: "2024-04-12",
    time: "11:00",
    duration: "45 min",
    status: "pending",
    type: "feedback_session"
  }
];

// Функція для отримання імені співробітника з розкладу
export const getScheduleEmployeeName = (employeeId: string) => {
  return getUserFullName(employeeId);
};

// Функція для отримання імені менеджера з розкладу
export const getScheduleManagerName = (managerId: string) => {
  return getUserFullName(managerId);
};
