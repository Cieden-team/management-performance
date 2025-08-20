// Role management system for automatic role assignment

export type UserRole = "employee" | "manager" | "admin";

interface RoleConfig {
  role: UserRole;
  description: string;
}

// Email-based role mapping
const EMAIL_ROLE_MAPPING: Record<string, RoleConfig> = {
  // Admins
  "team@cieden.com": { role: "admin", description: "All Team - System Administrator" },
  "yuriy.mykhasyak@cieden.com": { role: "admin", description: "CEO & Co-founder" },
  "kateryna.gorodova@cieden.com": { role: "admin", description: "Head of Talent Management" },
  
  // Leaders/Managers
  "roman.kaminechny@cieden.com": { role: "manager", description: "Head of Design Department" },
  "anastasiya.mudryk@cieden.com": { role: "manager", description: "Head of PM/BA" },
  "olesia.havryshko@cieden.com": { role: "manager", description: "Product Manager" },
  "tetiana.bondarchuk@cieden.com": { role: "manager", description: "Product Manager" },
  "yulia.mahera@cieden.com": { role: "manager", description: "Product Manager" },
  "nataliia.levko@cieden.com": { role: "manager", description: "Finance Manager" },
  "krystyna.shkriabina@cieden.com": { role: "manager", description: "Marketing Manager" },
  "kateryna.zavertailo@cieden.com": { role: "manager", description: "Sales Manager" },
};

// Domain-based role mapping
const DOMAIN_ROLE_MAPPING: Record<string, RoleConfig> = {
  "cieden.com": { role: "employee", description: "Cieden Team Member" },
  "gmail.com": { role: "employee", description: "External User" },
  "outlook.com": { role: "employee", description: "External User" },
  "yahoo.com": { role: "employee", description: "External User" },
};

/**
 * Get user role based on email address
 * @param email - User's email address
 * @returns Role configuration
 */
export function getUserRoleByEmail(email: string): RoleConfig {
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check specific email mapping first
  if (EMAIL_ROLE_MAPPING[normalizedEmail]) {
    return EMAIL_ROLE_MAPPING[normalizedEmail];
  }
  
  // Check domain-based mapping
  const domain = normalizedEmail.split('@')[1];
  if (domain && DOMAIN_ROLE_MAPPING[domain]) {
    return DOMAIN_ROLE_MAPPING[domain];
  }
  
  // Default role for unknown emails
  return { role: "employee", description: "New User" };
}

/**
 * Check if user has admin privileges
 * @param email - User's email address
 * @returns boolean
 */
export function isAdmin(email: string): boolean {
  return getUserRoleByEmail(email).role === "admin";
}

/**
 * Check if user has manager privileges
 * @param email - User's email address
 * @returns boolean
 */
export function isManager(email: string): boolean {
  const role = getUserRoleByEmail(email).role;
  return role === "manager" || role === "admin";
}

/**
 * Get navigation items based on user role
 * @param email - User's email address
 * @returns Array of navigation items
 */
export function getNavigationByRole(email: string) {
  const role = getUserRoleByEmail(email).role;
  
  const baseNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: "BarChart3", description: "Main Dashboard" },
    { name: "My Profile", href: "/profile", icon: "User", description: "Personal Profile" },
    { name: "Goals", href: "/goals", icon: "Target", description: "Goal Management" },
    { name: "Feedback", href: "/feedback", icon: "MessageSquare", description: "Feedback" },
    { name: "Feedback Forms", href: "/feedback-forms", icon: "ClipboardList", description: "Evaluation Forms" },
    { name: "Reviews", href: "/reviews", icon: "FileText", description: "Performance Reviews" },
    { name: "Development", href: "/development", icon: "TrendingUp", description: "Development Plan" }
  ];

  if (role === "manager" || role === "admin") {
    baseNavigation.push(
      { name: "Team", href: "/team", icon: "Users", description: "Team Management" },
      { name: "Cycles", href: "/cycles", icon: "Calendar", description: "Performance Cycles" }
    );
  }

  if (role === "admin") {
    baseNavigation.push(
      { name: "Admin Panel", href: "/admin", icon: "Shield", description: "Administration" },
      { name: "Settings", href: "/settings", icon: "Settings", description: "System Settings" }
    );
  }

  return baseNavigation;
}

/**
 * Get all team members for dropdowns and lists
 * @returns Array of team members
 */
export function getAllTeamMembers() {
  return [
    { id: "user1", name: "Yuriy Mykhasyak", email: "yuriy.mykhasyak@cieden.com", role: "admin" },
    { id: "user2", name: "Kateryna Gorodova", email: "kateryna.gorodova@cieden.com", role: "admin" },
    { id: "user3", name: "Roman Kaminechny", email: "roman.kaminechny@cieden.com", role: "manager" },
    { id: "user4", name: "Anastasiya Mudryk", email: "anastasiya.mudryk@cieden.com", role: "manager" },
    { id: "user5", name: "Olesia Havryshko", email: "olesia.havryshko@cieden.com", role: "manager" },
    { id: "user6", name: "Tetiana Bondarchuk", email: "tetiana.bondarchuk@cieden.com", role: "manager" },
    { id: "user7", name: "Yulia Mahera", email: "yulia.mahera@cieden.com", role: "manager" },
    { id: "user8", name: "Nataliia Levko", email: "nataliia.levko@cieden.com", role: "manager" },
    { id: "user9", name: "Krystyna Shkriabina", email: "krystyna.shkriabina@cieden.com", role: "manager" },
    { id: "user10", name: "Kateryna Zavertailo", email: "kateryna.zavertailo@cieden.com", role: "manager" },
    { id: "user11", name: "All Team", email: "team@cieden.com", role: "admin" },
  ];
}

/**
 * Get colleagues (employees) for feedback forms
 * @returns Array of colleagues
 */
export function getColleagues() {
  return getAllTeamMembers().filter(member => member.role === "employee");
}

/**
 * Get managers for feedback forms
 * @returns Array of managers
 */
export function getManagers() {
  return getAllTeamMembers().filter(member => member.role === "manager" || member.role === "admin");
}
