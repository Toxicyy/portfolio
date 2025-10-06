export const ANIMATION_DURATIONS = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
  carousel: 0.6,
} as const;

export const ANIMATION_EASINGS = {
  easeOut: "easeOut",
  spring: [0.23, 1, 0.32, 1],
  bounce: "anticipate",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const STAR_FIELD_CONFIG = {
  numberOfStars: 150,
  shootingStarInterval: 2000,
  shootingStarLifetime: 3000,
  twinkleRange: [2, 5],
} as const;

export const FORM_VALIDATION = {
  minNameLength: 2,
  minMessageLength: 10,
  maxMessageLength: 1000,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const utils = {
  clamp: (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
  },

  scrollToElement: (elementId: string, offset = 0): void => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  },

  isValidEmail: (email: string): boolean => {
    return FORM_VALIDATION.emailRegex.test(email);
  },

  formatDate: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },

  generateId: (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
} as const;

export const COLORS = {
  primary: {
    purple: "#8b5cf6",
    pink: "#ec4899",
  },
  gradients: {
    primary: "from-purple-600 to-pink-600",
    primaryHover: "from-purple-700 to-pink-700",
    background: "from-gray-900 via-black to-purple-900",
    card: "from-purple-500/10 to-pink-500/10",
  },
  borders: {
    light: "border-purple-500/20",
    medium: "border-purple-500/30",
    heavy: "border-purple-500/50",
  },
} as const;

export const Z_INDEX = {
  background: 0,
  content: 10,
  navigation: 20,
  modal: 50,
  tooltip: 60,
} as const;
