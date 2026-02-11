const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Memory for session
let memory = [];

// Pools for random outputs
const ideaPool = [
  "Start a TikTok or YouTube channel sharing tutorials or tips",
  "Buy and sell items online (eBay, Facebook Marketplace)",
  "Offer yard/landscaping services",
  "Make a simple web app or tool and share it for free",
  "Create a digital product (PDF guides, templates) and sell it online",
  "Design merch or stickers and sell online",
  "Offer tutoring in subjects you excel at",
  "Build AI prompts and sell them to creators",
  "Start a newsletter on a niche topic",
  "Make a mini online course or tutorial series",
  "Start a blog on a hobby or interest",
  "Create free templates for Canva or Notion",
  "Teach coding basics online",
  "Develop simple mobile games",
  "Make a local service business (dog walking, cleaning, delivery)"
];

const dailyPool = [
  "Money: Sell items online today",
  "Money: Offer local services (yard work, tutoring, deliveries)",
  "Skill: Learn 30 minutes Python",
  "Skill: Watch one tutorial on AI prompts",
  "Personal: Meditate for 5 minutes",
  "Personal: Go for a short walk",
  "Personal: Organize your workspace",
];

const moneyPool = [
  "Quick: Offer lawn services today",
  "Quick: Sell old electronics online",
  "Long-term: Start YouTube channel",
  "Long-term: Build a small digital product",
  "Next: Plan first 5 YouTube videos",
  "Next: Research local gigs you can offer"
];

const buildPool = [
  "Build: Personal website",
  "Build: Simple portfolio site",
  "Build: Small web app for practice",
  "Tools: Replit, Canva",
  "Steps: 1) Choose template 2) Add content 3) Publish",
  "Steps: 1) Sketch idea 2) Build prototype 3) Share with friends"
];

const studyPool = [
  "Concept: Variables in Python",
  "Concept: Loops in Python",
  "Concept: Functions in Python",
  "Explanation: Variables store information",
  "Explanation: Loops repeat tasks",
  "Practice: Create 5 variables",
  "Practice: Write a for-loop that counts to 10"
];

// Utility to pick N random elements from a pool
function pickRandom(pool, count = 3) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function appendMessage(text, className) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.classList.add('message', className);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function agentResponse(command) {
  memory.push(`You: ${command}`);
  let response = "";

  switch(command.toLowerCase()) {
    case "daily":
      response = pickRandom(dailyPool, 3).join("\n");
      break;

    case "money":
      response = pickRandom(moneyPool, 3).join("\n");
      break;

    case "build":
      response = pickRandom(buildPool, 3).join("\n");
      break;

    case "study":
      response = pickRandom(studyPool, 3).join("\n");
      break;

    case "plan":
      // For plan, we can mix daily + build + study randomly
      response = [
        "Plan your day:",
        ...pickRandom(dailyPool, 2),
        ...pickRandom(buildPool, 2),
        ...pickRandom(studyPool, 2)
      ].join("\n");
      break;

    case "ideas":
      response = "Here are some fresh ideas:\n" + pickRandom(ideaPool, 5).join("\n");
      break;

    case "memory":
      // Show past commands and responses shuffled
      const shuffledMemory = [...memory].sort(() => 0.5 - Math.random());
      response = shuffledMemory.join("\n");
      break;

    default:
      response = "Command not recognized. Try: daily, money, build, study, plan, ideas, memory.";
  }

  memory.push(`Agent: ${response}`);
  return response;
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  const response = agentResponse(text);
  appendMessage(response, 'agent');
  userInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});
