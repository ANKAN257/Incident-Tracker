
require("dotenv").config();
const mongoose = require("mongoose");

const User = require('../modules/user/model/user.model');
const Incident = require("../modules/incidentTracker/models/incident.model");

const severities = ["SEV1", "SEV2", "SEV3", "SEV4"];
const statuses   = ["OPEN", "MITIGATED", "RESOLVED", "CLOSED"];
const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
const services   = [
  "payments",
  "auth",
  "database",
  "network",
  "storage",
  "api-gateway",
  "notification",
  "search",
];
const titles = [
  "Production server is down",
  "Database connection timeout",
  "API returning 500 errors",
  "Memory leak detected",
  "SSL certificate expired",
  "Login service unavailable",
  "High CPU usage on server",
  "Disk space running low",
  "Network latency spike",
  "Cache service crashed",
  "Payment gateway failure",
  "Authentication service down",
  "Data sync issue detected",
  "Load balancer not responding",
  "Scheduled job failed",
  "Third party API timeout",
  "Redis connection lost",
  "Webhook delivery failures",
  "CDN serving stale content",
  "Search index out of sync",
];
const summaries = [
  "Team is investigating the root cause",
  "Rolled back to previous version",
  "Escalated to infrastructure team",
  "Monitoring closely after fix",
  "Waiting for vendor response",
  "Hotfix deployed to production",
  "Issue reproduced in staging",
  "Root cause identified, fix in progress",
  "Temporary workaround applied",
  "Post-mortem scheduled for tomorrow",
];

const seed = async () => {
    try {
         await mongoose.connect(process.env.mongo_url);
         const users = await User.find();
         if (users.length === 0) {
            process.exit(1);
         }
        await Incident.deleteMany({});
        const incidents = Array.from({ length: 200 }, (_, i) =>{
            const status = statuses[i % statuses.length];
            return {
              title: `${titles[i % titles.length]} - ${services[i % services.length]}`,
              service:   services[i % services.length],
              severity:  severities[i % severities.length],
              status:    status,
               priority:  priorities[i % priorities.length],
               summary:   summaries[i % summaries.length],
               createdBy: users[i % users.length]._id,
               assignTo:  users[(i + 1) % users.length]._id,

                resolvedAt: status === "RESOLVED" || status === "CLOSED"
                 ? new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
                 :null,
                  closedAt: status === "CLOSED"
                   ? new Date(Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000))
                  : null,
            }
        })
        await Incident.insertMany(incidents);
         process.exit(0);
    } catch (error) {
        process.exit(1);
    }
}
seed()


