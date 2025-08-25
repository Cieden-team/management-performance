const { ConvexHttpClient } = require("convex/browser");

// Тестуємо обидва URL
const urls = [
  "https://insightful-wombat-565.convex.cloud", // dev
  "https://festive-porpoise-89.convex.cloud"    // production
];

async function testConvexConnection() {
  for (const url of urls) {
    console.log(`\n🔍 Testing URL: ${url}`);
    
    try {
      const convex = new ConvexHttpClient(url);
      
      // Спробуємо отримати користувачів
      const users = await convex.query("users:getAllUsers");
      console.log(`✅ Success! Found ${users.length} users`);
      
      // Показуємо перших 3 користувачів
      console.log("📋 First 3 users:");
      users.slice(0, 3).forEach(user => {
        console.log(`  - ${user.firstName} ${user.lastName} (${user.department})`);
      });
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

testConvexConnection();
