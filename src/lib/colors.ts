// Кольорова палітра для додатку
export const colors = {
  // Основні кольори
  primary: {
    purple: '#651FFF',
    purpleHover: '#5b1ce6',
    purpleLight: '#f0e9ff',
  },
  
  // Статуси
  status: {
    success: '#8AC34A',
    warning: '#FF9102',
    error: '#F44436',
  },
  
  // Текст
  text: {
    primary: '#212121',
    secondary: '#646464',
    light: '#909090',
  },
  
  // Фони
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    dark: '#000319',
    darkSecondary: '#373737',
  },
  
  // Границі
  border: {
    light: '#e9e9e9',
    dark: '#373737',
  },
} as const;

// Tailwind класи для кольорів
export const colorClasses = {
  primary: {
    purple: 'text-purple-600',
    purpleBg: 'bg-purple-600',
    purpleHover: 'hover:bg-purple-700',
    purpleLight: 'bg-purple-50',
  },
  
  status: {
    success: 'text-green-500',
    successBg: 'bg-green-500',
    warning: 'text-orange-500',
    warningBg: 'bg-orange-500',
    error: 'text-red-500',
    errorBg: 'bg-red-500',
  },
  
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    light: 'text-gray-500',
  },
  
  background: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    dark: 'bg-gray-900',
    darkSecondary: 'bg-gray-800',
  },
  
  border: {
    light: 'border-gray-200',
    dark: 'border-gray-700',
  },
} as const;
