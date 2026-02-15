
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require('../modules/user/model/user.model');
const adminNames = [
  { username: "john.smith",   email: "john.smith@company.com"   },
  { username: "sarah.connor", email: "sarah.connor@company.com" },
  { username: "mike.johnson", email: "mike.johnson@company.com" },
  { username: "emily.davis",  email: "emily.davis@company.com"  },
  { username: "james.wilson", email: "james.wilson@company.com" },
  { username: "lisa.brown",   email: "lisa.brown@company.com"   },
  { username: "david.clark",  email: "david.clark@company.com"  },
  { username: "anna.white",   email: "anna.white@company.com"   },
  { username: "chris.martin", email: "chris.martin@company.com" },
  { username: "kate.taylor",  email: "kate.taylor@company.com"  },
];
const userNames = [
  { username: "priya.sharma",   email: "priya.sharma@company.com"   },
  { username: "alex.kumar",     email: "alex.kumar@company.com"     },
  { username: "ryan.thomas",    email: "ryan.thomas@company.com"    },
  { username: "zoe.anderson",   email: "zoe.anderson@company.com"   },
  { username: "noah.jackson",   email: "noah.jackson@company.com"   },
  { username: "maya.patel",     email: "maya.patel@company.com"     },
  { username: "liam.harris",    email: "liam.harris@company.com"    },
  { username: "olivia.moore",   email: "olivia.moore@company.com"   },
  { username: "ethan.garcia",   email: "ethan.garcia@company.com"   },
  { username: "ava.martinez",   email: "ava.martinez@company.com"   },
  { username: "lucas.lee",      email: "lucas.lee@company.com"      },
  { username: "sophia.walker",  email: "sophia.walker@company.com"  },
  { username: "mason.hall",     email: "mason.hall@company.com"     },
  { username: "isabella.allen", email: "isabella.allen@company.com" },
  { username: "logan.young",    email: "logan.young@company.com"    },
  { username: "emma.king",      email: "emma.king@company.com"      },
  { username: "jacob.wright",   email: "jacob.wright@company.com"   },
  { username: "mia.scott",      email: "mia.scott@company.com"      },
  { username: "aiden.green",    email: "aiden.green@company.com"    },
  { username: "chloe.baker",    email: "chloe.baker@company.com"    },
];

const seed =async()=>{
    try {
         await mongoose.connect(process.env.mongo_url);
         console.log("Connected to MongoDB"); 
          // Hash password once — reuse for all users
        const hashedPassword= await bcrypt.hash("password1234",10)
       
        await User.deleteMany({});

     const admins = adminNames.map((admin) => ({
      username: admin.username,
      email:    admin.email,
      password: hashedPassword,
      role: "admin",
    }));
    const users = userNames.map((user) => ({
      username: user.username,
      email:    user.email,
      password: hashedPassword,
      role:  "user",
    }));

     await User.insertMany([...admins, ...users]);
     process.exit(0);
       

    } catch (error) {
        process.exit(1);

    }
}

seed();