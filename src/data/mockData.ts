export interface Question {
  id: string;
  title: string;
  body: string;
  topic: string;
  topicEmoji: string;
  replies: number;
  solved: boolean;
  authorName: string;
  createdAt: string;
}

export interface Reply {
  id: string;
  questionId: string;
  body: string;
  authorName: string;
  helpfulVotes: number;
  isBestAnswer: boolean;
  createdAt: string;
}

export const TOPICS = [
  { value: "phone", label: "Phone", emoji: "📱" },
  { value: "computer", label: "Computer", emoji: "💻" },
  { value: "internet", label: "Internet", emoji: "🌐" },
  { value: "email", label: "Email", emoji: "📧" },
  { value: "scams", label: "Scams & Safety", emoji: "⚠️" },
  { value: "tv", label: "TV & Remote", emoji: "📺" },
  { value: "social", label: "Social Media", emoji: "👥" },
  { value: "photos", label: "Photos & Video", emoji: "📷" },
  { value: "banking", label: "Online Banking", emoji: "🏦" },
  { value: "shopping", label: "Online Shopping", emoji: "🛒" },
  { value: "health", label: "Health & Medical", emoji: "💊" },
  { value: "government", label: "Government & Forms", emoji: "📋" },
  { value: "travel", label: "Travel & Maps", emoji: "✈️" },
  { value: "home", label: "Home & Appliances", emoji: "🏠" },
  { value: "family", label: "Family & Friends", emoji: "👨‍👩‍👧" },
  { value: "hobbies", label: "Hobbies & Learning", emoji: "🎨" },
  { value: "other", label: "Other", emoji: "❓" },
] as const;

export const mockQuestions: Question[] = [
  {
    id: "1",
    title: "Why does my phone keep restarting by itself?",
    body: "My Samsung phone restarts 3 or 4 times a day. I haven't installed anything new. It started doing this last week and I'm worried something is wrong with it.",
    topic: "phone",
    topicEmoji: "📱",
    replies: 4,
    solved: true,
    authorName: "Barbara M.",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "How do I make the text bigger on my iPad?",
    body: "The letters on my iPad are too small for me to read comfortably. My daughter said there is a way to make everything bigger but I can't find the setting.",
    topic: "phone",
    topicEmoji: "📱",
    replies: 2,
    solved: false,
    authorName: "Harold K.",
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    title: "I got an email saying my bank account is locked — is this real?",
    body: "I received an email from what looks like my bank saying my account has been suspended and I need to click a link to verify my identity. Should I click it?",
    topic: "scams",
    topicEmoji: "⚠️",
    replies: 6,
    solved: true,
    authorName: "Dorothy P.",
    createdAt: "1 day ago",
  },
  {
    id: "4",
    title: "My Wi-Fi keeps disconnecting on my laptop",
    body: "Every few minutes my internet connection drops and I have to reconnect. This is very frustrating when I'm trying to video call my grandchildren.",
    topic: "internet",
    topicEmoji: "🌐",
    replies: 3,
    solved: false,
    authorName: "Robert J.",
    createdAt: "1 day ago",
  },
  {
    id: "5",
    title: "How do I attach a photo to an email?",
    body: "I want to send photos of my garden to my friend but I don't know how to add them to an email. I use Gmail on my computer.",
    topic: "email",
    topicEmoji: "📧",
    replies: 1,
    solved: false,
    authorName: "Margaret L.",
    createdAt: "2 days ago",
  },
];

export const mockReplies: Reply[] = [
  {
    id: "r1",
    questionId: "1",
    body: "This happened to me too! Try holding the power button for 10 seconds to do a forced restart. Then go to Settings > Software Update and make sure your phone is up to date. That fixed it for me.",
    authorName: "James T.",
    helpfulVotes: 8,
    isBestAnswer: true,
    createdAt: "1 hour ago",
  },
  {
    id: "r2",
    questionId: "1",
    body: "It could also be a battery issue. If your phone is more than 3 years old, the battery might need replacing. Take it to your phone shop and ask them to check the battery health.",
    authorName: "Susan R.",
    helpfulVotes: 3,
    isBestAnswer: false,
    createdAt: "45 minutes ago",
  },
  {
    id: "r3",
    questionId: "1",
    body: "Try checking if any of your apps need updating. Old apps can sometimes cause problems. Open the Play Store, tap your picture in the top right, then tap 'Manage apps & device' and update everything.",
    authorName: "William H.",
    helpfulVotes: 2,
    isBestAnswer: false,
    createdAt: "30 minutes ago",
  },
  {
    id: "r4",
    questionId: "1",
    body: "If nothing else works, you can try a factory reset but MAKE SURE to back up your photos first! Ask a family member to help you with this step.",
    authorName: "Patricia N.",
    helpfulVotes: 1,
    isBestAnswer: false,
    createdAt: "15 minutes ago",
  },
];
