import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Дані користувачів з CSV
const usersData = [
  { id: 1, firstName: "Andrii", lastName: "Prokopyshyn", email: "andrii.prokopyshyn@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 2, firstName: "Bohdan", lastName: "Borys", email: "bohdan.borys@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 3, firstName: "Demian", lastName: "Peretiatko", email: "demian.peretiatko@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 4, firstName: "Denis", lastName: "Dudar", email: "denis.dudar@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 5, firstName: "Dmytro", lastName: "Chyzh", email: "dima.chyzh@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 6, firstName: "Illia", lastName: "Suprun", email: "illia.suprun@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 7, firstName: "Iryna", lastName: "Mykytenko", email: "iryna.mykytenko@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 8, firstName: "Iryna", lastName: "Tanavska", email: "iryna.tanavska@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 9, firstName: "Karyna", lastName: "Khmelyk", email: "karyna.khmelyk@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 10, firstName: "Khrystyna", lastName: "Nych", email: "khrystyna.nych@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 11, firstName: "Maksym", lastName: "Gozhelsky", email: "maksym.gozhelsky@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 12, firstName: "Maksym", lastName: "Vertsanov", email: "maksym.vertsanov@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 13, firstName: "Marta", lastName: "Kacharaba", email: "marta.kacharaba@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 14, firstName: "Mykola", lastName: "Chumak", email: "mykola.chumak@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 15, firstName: "Nazar", lastName: "Vasylyshyn", email: "nazar.vasylyshyn@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 16, firstName: "Olha", lastName: "Shvets", email: "olha.shvets@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 17, firstName: "Roman", lastName: "Kaminechny", email: "roman.kaminechny@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 18, firstName: "Tetiana", lastName: "Zakus", email: "tetiana.zakus@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 19, firstName: "Valentyn", lastName: "Skliarov", email: "valentyn.skliarov@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 20, firstName: "Valeria", lastName: "Nasikan", email: "valeriia.nasikan@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 21, firstName: "Vladyslav", lastName: "Pianov", email: "vladyslav.pianov@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 22, firstName: "Volodymyr", lastName: "Merlenko", email: "volodymyr.merlenko@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 23, firstName: "Yuliia", lastName: "Braslavska", email: "yuliia.braslavska@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 24, firstName: "Tanya", lastName: "Borysenko", email: "tanya.borysenko@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { id: 25, firstName: "Anastasiya", lastName: "Mudryk", email: "anastasiya.mudryk@cieden.com", role: "Product Manager/Business Analyst", department: "Product", status: "active", avatar: "" },
  { id: 26, firstName: "Olesia", lastName: "Havryshko", email: "olesia.havryshko@cieden.com", role: "Product Manager/Business Analyst", department: "Product", status: "active", avatar: "" },
  { id: 27, firstName: "Tetiana", lastName: "Bondarchuk", email: "tetiana.bondarchuk@cieden.com", role: "Product Manager/Business Analyst", department: "Product", status: "active", avatar: "" },
  { id: 28, firstName: "Yuliia", lastName: "Mahera", email: "yulia.mahera@cieden.com", role: "Product Manager/Business Analyst", department: "Product", status: "active", avatar: "" },
  { id: 29, firstName: "Nataliia", lastName: "Levko", email: "nataliia.levko@cieden.com", role: "Finance Manager", department: "Finance", status: "active", avatar: "" },
  { id: 30, firstName: "Nataliia", lastName: "Antonyshyn", email: "nataliia.antonyshyn@cieden.com", role: "Accountant", department: "Finance", status: "active", avatar: "" },
  { id: 31, firstName: "Kristina", lastName: "Shkriabina", email: "krystyna.shkriabina@cieden.com", role: "Marketing Manager", department: "Marketing", status: "active", avatar: "" },
  { id: 32, firstName: "Tetiana", lastName: "Korol", email: "tetiana.korol@cieden.com", role: "SMM-manager", department: "Marketing", status: "active", avatar: "" },
  { id: 33, firstName: "Tamara", lastName: "Zhostka", email: "tamara.zhostka@cieden.com", role: "Content Marketing Manager", department: "Marketing", status: "active", avatar: "" },
  { id: 34, firstName: "Diana", lastName: "Danyliv", email: "diana.danyliv@cieden.com", role: "Graphic Designer", department: "Marketing", status: "active", avatar: "" },
  { id: 35, firstName: "Kateryna", lastName: "Zavertailo", email: "kateryna.zavertailo@cieden.com", role: "Sales Manager", department: "Sales", status: "active", avatar: "" },
  { id: 36, firstName: "Bohdana", lastName: "Levočko", email: "bohdana.levochko@cieden.com", role: "Lead Generation/Account Manager", department: "Sales", status: "active", avatar: "" },
  { id: 37, firstName: "Viktoriia", lastName: "Boichuk", email: "viktoriia.boichuk@cieden.com", role: "Lead Generation Manager", department: "Sales", status: "active", avatar: "" },
  { id: 38, firstName: "Olha", lastName: "Kubrak", email: "olha.kubrak@cieden.com", role: "Office manager/Event manager", department: "Talent Management", status: "active", avatar: "" },
  { id: 39, firstName: "Iryna", lastName: "Mykhasiak", email: "iryna.mykhasiak@cieden.com", role: "Recruiter", department: "Talent Management", status: "active", avatar: "" },
  { id: 40, firstName: "Katya", lastName: "Gorodova", email: "kateryna.gorodova@cieden.com", role: "Head of Talent Management", department: "Talent Management", status: "active", avatar: "" },
  { id: 41, firstName: "Yurii", lastName: "Mykhasyak", email: "yuriy.mykhasyak@cieden.com", role: "C-level", department: "CEO", status: "active", avatar: "" },
];

export const importUsers = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
  try {
    console.log("Starting user import...");
    
    for (const user of usersData) {
      await convex.mutation(api.users.createUser, {
        clerkId: `cieden_${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role === "Finance Manager" || user.role === "Marketing Manager" || user.role === "Sales Manager" || user.role === "Head of Talent Management" || user.role === "C-level" ? "manager" : "employee",
        department: user.department,
        position: user.role,
        hireDate: new Date().toISOString().split('T')[0],
        avatar: user.avatar,
      });
      console.log(`Imported user: ${user.firstName} ${user.lastName}`);
    }
    
    console.log("User import completed successfully!");
  } catch (error) {
    console.error("Error importing users:", error);
  }
};
