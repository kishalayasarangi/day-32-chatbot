let userName = null;
let messageCount = 0;
let userMood = 'neutral';

const responses = {
  greetings: {
    patterns: ['hello', 'hi', 'hey', 'howdy', 'sup', 'good morning', 'good evening', 'good afternoon'],
    replies: [
      'Hey {name}! How can I help you today? 😊',
      'Hello {name}! Great to see you! What\'s on your mind?',
      'Hi {name}! I\'m here and ready to chat! 🤖'
    ]
  },
  howAreYou: {
    patterns: ['how are you', 'how are you doing', 'how do you feel', 'you ok', 'you good'],
    replies: [
      'I\'m doing great, thanks for asking {name}! 😄 How about you?',
      'Feeling fantastic! Ready to help you with anything! ⚡',
      'All systems operational and running smoothly! 🤖'
    ]
  },
  name: {
    patterns: ['what is your name', 'what\'s your name', 'who are you', 'your name'],
    replies: [
      'I\'m Aria! Your friendly AI assistant. 🤖',
      'My name is Aria — nice to meet you {name}! 😊',
      'They call me Aria! What can I do for you?'
    ]
  },
  jokes: {
    patterns: ['joke', 'tell me a joke', 'make me laugh', 'funny', 'humor'],
    replies: [
      'Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂',
      'Why did the developer go broke? Because he used up all his cache! 💸😂',
      'What do you call a programmer from Finland? Nerdic! 😂',
      'How many programmers does it take to change a light bulb? None — that\'s a hardware problem! 😂',
      'Why don\'t scientists trust atoms? Because they make up everything! ⚛️😂'
    ]
  },
  quotes: {
    patterns: ['quote', 'inspire me', 'motivation', 'motivate', 'inspiring quote'],
    replies: [
      '"The only way to do great work is to love what you do." — Steve Jobs ✨',
      '"Code is like humor. When you have to explain it, it\'s bad." — Cory House 💡',
      '"First, solve the problem. Then, write the code." — John Johnson 🎯',
      '"In the middle of every difficulty lies opportunity." — Einstein 🌟',
      '"Push yourself, because no one else is going to do it for you." 💪'
    ]
  },
  weather: {
    patterns: ['weather', 'temperature', 'rain', 'sunny', 'forecast'],
    replies: [
      'I don\'t have access to live weather data yet, but check weather.com for your local forecast! ⛅',
      'I wish I could tell you! Try Google — just search your city + weather. 🌤️'
    ]
  },
  time: {
    patterns: ['what time', 'current time', 'time is it', 'what\'s the time'],
    replies: ['The current time is ' + new Date().toLocaleTimeString() + ' ⏰']
  },
  date: {
    patterns: ['what date', 'today\'s date', 'what day', 'what is today'],
    replies: ['Today is ' + new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' 📅']
  },
  thanks: {
    patterns: ['thank you', 'thanks', 'thank u', 'ty', 'thx'],
    replies: [
      'You\'re welcome {name}! Always happy to help 😊',
      'Anytime! That\'s what I\'m here for! 🤖',
      'No problem at all {name}! Let me know if you need anything else!'
    ]
  },
  bye: {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'take care', 'cya'],
    replies: [
      'Goodbye {name}! Have an amazing day! 👋',
      'See you later {name}! Take care! 😊',
      'Bye bye {name}! Come back anytime! 🤖'
    ]
  },
  capabilities: {
    patterns: ['what can you do', 'help', 'capabilities', 'features', 'what do you do'],
    replies: [
      'I can:\n• Chat and answer questions 💬\n• Tell jokes 😂\n• Share quotes ✨\n• Tell you the time and date ⏰\n• Detect your mood 😊\n• Remember your name!\n\nWhat would you like to try?'
    ]
  },
  mood: {
    patterns: ['sad', 'unhappy', 'depressed', 'lonely', 'upset', 'angry', 'frustrated', 'stressed'],
    replies: [
      'I\'m sorry to hear that {name}. Remember — tough times don\'t last, tough people do! 💪',
      'Hey {name}, it\'s okay to feel that way. Take a deep breath. Things will get better! 🌟',
      'I\'m here for you {name}. Want to talk about it, or shall I tell you a joke to cheer you up? 😊'
    ]
  },
  happy: {
    patterns: ['happy', 'great', 'awesome', 'amazing', 'wonderful', 'excited', 'fantastic'],
    replies: [
      'That\'s wonderful {name}! Your positive energy is contagious! 🌟',
      'Love that energy {name}! Keep it up! 🎉',
      'Yay! That makes me happy too {name}! 😄'
    ]
  },
  college: {
    patterns: ['nit', 'college', 'university', 'campus', 'rourkela', 'study', 'exam'],
    replies: [
      'NIT Rourkela is one of the top NITs in India! Great place to be 🎓',
      'College life is the best! Study hard but don\'t forget to code every day! 💻',
      'Exams? You\'ve got this {name}! Take it one topic at a time 📚'
    ]
  },
  coding: {
    patterns: ['code', 'coding', 'programming', 'github', 'python', 'javascript', 'developer'],
    replies: [
      'Coding is awesome! You\'re on day {day} of your 120-day challenge — keep going! 💻🔥',
      'Programming is a superpower {name}! Every line of code makes you better 🚀',
      'GitHub streak looking good! Keep pushing code every day! 🟩'
    ]
  },
  default: [
    'Hmm, I\'m not sure I understand that. Could you rephrase? 🤔',
    'Interesting! Tell me more about that {name}.',
    'I\'m still learning! Can you ask me something else? 😊',
    'That\'s a tricky one! Try asking me about jokes, quotes, or the time! 💡'
  ]
};

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatReply(text) {
  return text
    .replace(/{name}/g, userName || 'friend')
    .replace(/{day}/g, '32');
}

function matchIntent(input) {
  const lower = input.toLowerCase();

  for (const [intent, data] of Object.entries(responses)) {
    if (intent === 'default') continue;
    const patterns = data.patterns || [];
    if (patterns.some(p => lower.includes(p))) {
      return formatReply(getRandom(data.replies));
    }
  }

  return formatReply(getRandom(responses.default));
}

function extractName(input) {
  const patterns = [
    /my name is (\w+)/i,
    /i am (\w+)/i,
    /i'm (\w+)/i,
    /call me (\w+)/i,
    /^(\w+)$/i
  ];
  for (const p of patterns) {
    const match = input.match(p);
    if (match) return match[1];
  }
  return null;
}

function appendMessage(text, sender) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `message ${sender}`;

  const avatar = sender === 'bot' ? '🤖' : '🧑';
  const bubble = text.replace(/\n/g, '<br/>');

  div.innerHTML = `
    <div class="avatar">${avatar}</div>
    <div class="bubble">${bubble}</div>
    <div class="timestamp">${getTime()}</div>
  `;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById('chatMessages');
  const status = document.getElementById('botStatus');
  status.textContent = 'Typing...';
  status.className = 'bot-status typing';

  const div = document.createElement('div');
  div.className = 'message bot';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="avatar">🤖</div>
    <div class="typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
  const status = document.getElementById('botStatus');
  status.textContent = 'Online';
  status.className = 'bot-status';
}

function getBotReply(input) {
  if (!userName) {
    const name = extractName(input);
    if (name && name.length > 1) {
      userName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      return `Nice to meet you, ${userName}! 🎉 I'll remember your name. How can I help you today?`;
    }
    return `I didn't catch your name! Could you tell me again? 😊`;
  }
  return matchIntent(input);
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  input.value = '';
  messageCount++;

  showTyping();

  const delay = 600 + Math.random() * 600;
  setTimeout(() => {
    hideTyping();
    const reply = getBotReply(text);
    appendMessage(reply, 'bot');
  }, delay);
}

function sendSuggestion(text) {
  document.getElementById('userInput').value = text;
  sendMessage();
}

function clearChat() {
  document.getElementById('chatMessages').innerHTML = '';
  userName = null;
  appendMessage('Chat cleared! What\'s your name? 😊', 'bot');
}