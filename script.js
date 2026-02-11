const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Memory for session
let memory = [];

function appendMessage(text, className) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.classList.add('message', className);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function agentResponse(command) {
  // Add command to memory
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
    case "memory":
      // Show past commands and agent responses
      response = memory.join("\n");
      break;
    default:
      response = "Command not recognized. Try: daily, money, build, study, plan, memory.";
  }

  // Add agent response to memory
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
