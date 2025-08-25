import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

// Дані користувачів з організаційної діаграми Cieden
const usersData = [
  { firstName: "Andrii", lastName: "Prokopyshyn", email: "andrii.prokopyshyn@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Bohdan", lastName: "Borys", email: "bohdan.borys@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Demian", lastName: "Peretiatko", email: "demian.peretiatko@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Denis", lastName: "Dudar", email: "denis.dudar@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Dmytro", lastName: "Chyzh", email: "dima.chyzh@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Illia", lastName: "Suprun", email: "illia.suprun@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Iryna", lastName: "Mykytenko", email: "iryna.mykytenko@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Iryna", lastName: "Tanavska", email: "iryna.tanavska@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Karyna", lastName: "Khmelyk", email: "karyna.khmelyk@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Khrystyna", lastName: "Nych", email: "khrystyna.nych@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Maksym", lastName: "Gozhelsky", email: "maksym.gozhelsky@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Maksym", lastName: "Vertsanov", email: "maksym.vertsanov@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Marta", lastName: "Kacharaba", email: "marta.kacharaba@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Mykola", lastName: "Chumak", email: "mykola.chumak@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Nazar", lastName: "Vasylyshyn", email: "nazar.vasylyshyn@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Olha", lastName: "Shvets", email: "olha.shvets@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Roman", lastName: "Kaminechny", email: "roman.kaminechny@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Tetiana", lastName: "Zakus", email: "tetiana.zakus@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Valentyn", lastName: "Skliarov", email: "valentyn.skliarov@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Valeria", lastName: "Nasikan", email: "valeriia.nasikan@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Vladyslav", lastName: "Pianov", email: "vladyslav.pianov@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Volodymyr", lastName: "Merlenko", email: "volodymyr.merlenko@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Yuliia", lastName: "Braslavska", email: "yuliia.braslavska@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Tanya", lastName: "Borysenko", email: "tanya.borysenko@cieden.com", role: "UX/UI Designer", department: "Design", status: "active", avatar: "" },
  { firstName: "Anastasiya", lastName: "Mudryk", email: "anastasiya.mudryk@cieden.com", role: "Product Manager/Business Analyst", department: "Product", status: "active", avatar: "" },
  { firstName: "Olesia", lastName: "Havryshko", email: "olesia.havryshko@cieden.com", role: "Product Manager/Business Analyst", department: "Product", status: "active", avatar: "" },
  { firstName: "Tetiana", lastName: "Bondarchuk", email: "tetiana.bondarchuk@cieden.com", role: "Product Manager/Business Analyst", department: "Product", status: "active", avatar: "" },
  { firstName: "Yuliia", lastName: "Mahera", email: "yulia.mahera@cieden.com", role: "Product Manager/Business Analyst", department: "Product", status: "active", avatar: "" },
  { firstName: "Nataliia", lastName: "Levko", email: "nataliia.levko@cieden.com", role: "Finance Manager", department: "Finance", status: "active", avatar: "" },
  { firstName: "Nataliia", lastName: "Antonyshyn", email: "nataliia.antonyshyn@cieden.com", role: "Accountant", department: "Finance", status: "active", avatar: "" },
  { firstName: "Kristina", lastName: "Shkriabina", email: "krystyna.shkriabina@cieden.com", role: "Marketing Manager", department: "Marketing", status: "active", avatar: "" },
  { firstName: "Tetiana", lastName: "Korol", email: "tetiana.korol@cieden.com", role: "SMM-manager", department: "Marketing", status: "active", avatar: "" },
  { firstName: "Tamara", lastName: "Zhostka", email: "tamara.zhostka@cieden.com", role: "Content Marketing Manager", department: "Marketing", status: "active", avatar: "" },
  { firstName: "Diana", lastName: "Danyliv", email: "diana.danyliv@cieden.com", role: "Graphic Designer", department: "Marketing", status: "active", avatar: "" },
  { firstName: "Kateryna", lastName: "Zavertailo", email: "kateryna.zavertailo@cieden.com", role: "Sales Manager", department: "Sales", status: "active", avatar: "" },
  { firstName: "Bohdana", lastName: "Levočko", email: "bohdana.levochko@cieden.com", role: "Lead Generation/Account Manager", department: "Sales", status: "active", avatar: "" },
  { firstName: "Viktoriia", lastName: "Boichuk", email: "viktoriia.boichuk@cieden.com", role: "Lead Generation Manager", department: "Sales", status: "active", avatar: "" },
  { firstName: "Olha", lastName: "Kubrak", email: "olha.kubrak@cieden.com", role: "Office manager/Event manager", department: "Talent Management", status: "active", avatar: "" },
  { firstName: "Iryna", lastName: "Mykhasiak", email: "iryna.mykhasiak@cieden.com", role: "Recruiter", department: "Talent Management", status: "active", avatar: "" },
  { firstName: "Katya", lastName: "Gorodova", email: "kateryna.gorodova@cieden.com", role: "Head of Talent Management", department: "Talent Management", status: "active", avatar: "" },
  { firstName: "Yurii", lastName: "Mykhasyak", email: "yuriy.mykhasyak@cieden.com", role: "C-level", department: "CEO", status: "active", avatar: "" },
];

export async function POST() {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    
    console.log("Starting user import...");
    const results = [];
    
    for (const user of usersData) {
      try {
        const result = await convex.mutation(api.users.create, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          department: user.department,
          status: user.status,
          avatar: user.avatar,
        });
        
        results.push({
          success: true,
          user: `${user.firstName} ${user.lastName}`,
          id: result
        });
        
        console.log(`Imported user: ${user.firstName} ${user.lastName}`);
      } catch (error) {
        results.push({
          success: false,
          user: `${user.firstName} ${user.lastName}`,
          error: error instanceof Error ? error.message : "Unknown error"
        });
        
        console.error(`Failed to import user: ${user.firstName} ${user.lastName}`, error);
      }
    }
    
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;
    
    console.log(`User import completed! Success: ${successCount}, Failures: ${failureCount}`);
    
    return NextResponse.json({
      success: true,
      message: `Successfully imported ${successCount} users. ${failureCount} failures.`,
      results
    });
    
  } catch (error) {
    console.error("Error in import-users API:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
