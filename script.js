const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Memory for session
let memory = [];

// Idea pool (you can expand this)
const ideaPool = [
  "Start a TikTok or YouTube channel sharing tutorials or tips",
  "Buy and sell items online (eBay, Facebook Marketplace)",
  "Offer yard/landscaping services in your neighborhood",
  "Make a simple web app or tool and share it for free",
  "Create a digital product (PDF guides, templates) and sell it online",
  "Design merch or stickers and sell online",
  "Offer tutoring in subjects you excel at",
  "Build AI prompts and sell them to creators",
  "Start a newsletter on a niche topic",
  "Make a mini online course or tutorial series"
];

// Function to get random ideas
function generateIdeas(count = 3) {
  const shuffled = ideaPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).join("\n");
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
      response = "Money: Sell items online today.\nSkill: Learn 30 min Python.\nPersonal: Meditate 5 min.";
      break;
    case "money":
      response = "Quick: Offer lawn services today.\nLong-term: Start YouTube channel.\nNext: Plan first 5 videos.";
      break;
    case "build":
      response = "Build: Personal website.\nTools: Replit (free), Canva.\nSteps: 1) Choose template 2) Add content 3) Publish.";
      break;
    case "study":
      response = "Concept: Variables in Python.\nExplanation: Variables store info.\nPractice: Create 5 variables.";
      break;
    case "plan":
      response = "Goal: Finish first website.\nTasks: 1) Choose template 2) Write content 3) Publish\nTime: 2 hours";
      break;

    case "ideas":
      response = "Here are some new ideas for you:\n" + generateIdeas(5);
      break;

    case "memory":
      response = memory.join("\n");
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
