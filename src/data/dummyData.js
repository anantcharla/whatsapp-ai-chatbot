// ---------------------------------------------------------------------------
// dummyData.js
// Centralized mock data for the whole app. No backend calls happen here.
// 🔌 BACKEND HOOK: Replace each export with a fetch/query to your real API.
// ---------------------------------------------------------------------------

export const currentUser = {
  id: "u1",
  name: "Aditi Sharma",
  email: "aditi.sharma@chatwave.ai",
  role: "Workspace Admin",
  avatar: "https://i.pravatar.cc/150?img=47",
  company: "ChatWave AI",
  plan: "Growth Plan",
};

export const kpis = [
  { id: 1, label: "Active Conversations", value: "1,284", delta: "+12.4%", trend: "up" },
  { id: 2, label: "AI Resolution Rate", value: "78.6%", delta: "+4.1%", trend: "up" },
  { id: 3, label: "Avg. Response Time", value: "8.2s", delta: "-2.3s", trend: "up" },
  { id: 4, label: "CSAT Score", value: "4.7 / 5", delta: "+0.2", trend: "up" },
];

export const messageVolume = [
  { day: "Mon", messages: 420, aiHandled: 310 },
  { day: "Tue", messages: 512, aiHandled: 388 },
  { day: "Wed", messages: 470, aiHandled: 350 },
  { day: "Thu", messages: 610, aiHandled: 470 },
  { day: "Fri", messages: 580, aiHandled: 460 },
  { day: "Sat", messages: 340, aiHandled: 260 },
  { day: "Sun", messages: 298, aiHandled: 210 },
];

export const resolutionSplit = [
  { name: "Resolved by AI", value: 68, color: "#25D366" },
  { name: "Escalated to Human", value: 22, color: "#34B7F1" },
  { name: "Unresolved", value: 10, color: "#F59E0B" },
];

export const topIntents = [
  { intent: "Order Status", count: 342 },
  { intent: "Refund Request", count: 218 },
  { intent: "Product Info", count: 190 },
  { intent: "Billing Issue", count: 140 },
  { intent: "Talk to Human", count: 96 },
];

export const recentActivity = [
  { id: 1, text: "AI resolved a billing query for Rhea Kapoor", time: "2 min ago", type: "ai" },
  { id: 2, text: "New broadcast 'Diwali Offer' sent to 4,210 contacts", time: "18 min ago", type: "broadcast" },
  { id: 3, text: "Agent Rahul took over conversation with Vikram Singh", time: "42 min ago", type: "human" },
  { id: 4, text: "Knowledge base article 'Return Policy' updated", time: "1 hr ago", type: "kb" },
  { id: 5, text: "Prompt 'Friendly Support Tone' published", time: "3 hr ago", type: "prompt" },
];

export const conversations = [
  {
    id: "c1",
    customer: {
      name: "Rhea Kapoor",
      phone: "+91 98765 43210",
      avatar: "https://i.pravatar.cc/150?img=32",
      tags: ["VIP", "Repeat Customer"],
      location: "Mumbai, IN",
      orders: 12,
      lifetimeValue: "₹48,200",
    },
    unread: 2,
    online: true,
    lastMessage: "Is my order #4521 out for delivery yet?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    aiHandled: true,
    messages: [
      { id: "m1", sender: "customer", text: "Hi! I placed an order yesterday.", timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(), status: "read" },
      { id: "m2", sender: "ai", text: "Hi Rhea! Happy to help 😊 Could you share your order number?", timestamp: new Date(Date.now() - 1000 * 60 * 38).toISOString(), status: "read" },
      { id: "m3", sender: "customer", text: "Sure, it's #4521", timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), status: "read" },
      { id: "m4", sender: "ai", text: "Thanks! Order #4521 has shipped and is expected to arrive by tomorrow evening.", timestamp: new Date(Date.now() - 1000 * 60 * 34).toISOString(), status: "read" },
      { id: "m5", sender: "customer", text: "Is my order #4521 out for delivery yet?", timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(), status: "delivered" },
    ],
  },
  {
    id: "c2",
    customer: {
      name: "Vikram Singh",
      phone: "+91 91234 56789",
      avatar: "https://i.pravatar.cc/150?img=12",
      tags: ["New Lead"],
      location: "Delhi, IN",
      orders: 0,
      lifetimeValue: "₹0",
    },
    unread: 0,
    online: false,
    lastMessage: "Great, thank you for the help!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    aiHandled: false,
    messages: [
      { id: "m1", sender: "customer", text: "Do you have this in size L?", timestamp: new Date(Date.now() - 1000 * 60 * 130).toISOString(), status: "read" },
      { id: "m2", sender: "agent", text: "Hey Vikram! Yes, size L is available in Navy and Black.", timestamp: new Date(Date.now() - 1000 * 60 * 125).toISOString(), status: "read" },
      { id: "m3", sender: "customer", text: "Great, thank you for the help!", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), status: "read" },
    ],
  },
  {
    id: "c3",
    customer: {
      name: "Sara Fernandes",
      phone: "+91 99887 76655",
      avatar: "https://i.pravatar.cc/150?img=45",
      tags: ["Refund"],
      location: "Bengaluru, IN",
      orders: 5,
      lifetimeValue: "₹12,900",
    },
    unread: 1,
    online: true,
    lastMessage: "I'd like a refund for my last order please.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    aiHandled: true,
    messages: [
      { id: "m1", sender: "customer", text: "I'd like a refund for my last order please.", timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), status: "delivered" },
    ],
  },
  {
    id: "c4",
    customer: {
      name: "Karan Mehta",
      phone: "+91 90000 11223",
      avatar: "https://i.pravatar.cc/150?img=8",
      tags: [],
      location: "Pune, IN",
      orders: 2,
      lifetimeValue: "₹5,400",
    },
    unread: 0,
    online: false,
    lastMessage: "Perfect, see you then 👍",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    aiHandled: false,
    messages: [
      { id: "m1", sender: "agent", text: "Your appointment is confirmed for 3 PM tomorrow.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(), status: "read" },
      { id: "m2", sender: "customer", text: "Perfect, see you then 👍", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), status: "read" },
    ],
  },
];

export const aiSuggestions = [
  "Sure! Let me check that order for you right away. 📦",
  "I understand your concern — I've escalated this to a specialist.",
  "Your refund has been initiated and will reflect in 5-7 business days.",
  "Would you like me to notify you once it's back in stock?",
];

export const knowledgeBaseArticles = [
  { id: "k1", title: "Return & Refund Policy", category: "Policies", updated: "2 days ago", status: "Published", views: 1204 },
  { id: "k2", title: "How to Track Your Order", category: "Orders", updated: "5 days ago", status: "Published", views: 3021 },
  { id: "k3", title: "Payment Methods We Accept", category: "Billing", updated: "1 week ago", status: "Published", views: 890 },
  { id: "k4", title: "Size Guide — Apparel", category: "Products", updated: "2 weeks ago", status: "Draft", views: 0 },
  { id: "k5", title: "Cancelling a Subscription", category: "Billing", updated: "3 weeks ago", status: "Published", views: 654 },
  { id: "k6", title: "Store Locator & Hours", category: "General", updated: "1 month ago", status: "Archived", views: 210 },
];

export const broadcasts = [
  { id: "b1", name: "Diwali Mega Sale", audience: "All Customers", recipients: 4210, status: "Sent", sentAt: "Oct 24, 2025", openRate: "68%" },
  { id: "b2", name: "Cart Abandonment Reminder", audience: "Abandoned Cart", recipients: 890, status: "Sent", sentAt: "Oct 20, 2025", openRate: "54%" },
  { id: "b3", name: "New Collection Launch", audience: "VIP Customers", recipients: 1240, status: "Scheduled", sentAt: "Nov 2, 2025", openRate: "—" },
  { id: "b4", name: "Feedback Survey", audience: "Recent Buyers", recipients: 2100, status: "Draft", sentAt: "—", openRate: "—" },
];

export const prompts = [
  {
    id: "p1",
    name: "Friendly Support Tone",
    description: "Warm, empathetic tone used for general customer support.",
    status: "Active",
    model: "Claude Sonnet 5",
    lastEdited: "3 hours ago",
    content: "You are a warm, helpful WhatsApp support assistant for ChatWave AI. Keep replies short, friendly, and solution-oriented...",
  },
  {
    id: "p2",
    name: "Sales Assistant",
    description: "Persuasive, upbeat tone for pre-sales product questions.",
    status: "Active",
    model: "Claude Sonnet 5",
    lastEdited: "1 day ago",
    content: "You are a knowledgeable sales assistant. Highlight product benefits and gently guide the customer toward a purchase...",
  },
  {
    id: "p3",
    name: "Refund Handler",
    description: "Structured flow to collect order details before refunding.",
    status: "Draft",
    model: "Claude Haiku 4.5",
    lastEdited: "5 days ago",
    content: "You handle refund requests. First confirm the order number, then the reason, then summarize before confirming...",
  },
];

export const notifications = [
  { id: "n1", title: "New message from Sara Fernandes", time: "2 min ago", read: false },
  { id: "n2", title: "Broadcast 'Diwali Mega Sale' completed", time: "1 hr ago", read: false },
  { id: "n3", title: "Prompt 'Refund Handler' needs review", time: "3 hr ago", read: true },
  { id: "n4", title: "Weekly analytics report is ready", time: "1 day ago", read: true },
];

export const teamMembers = [
  { id: "t1", name: "Aditi Sharma", role: "Admin", avatar: "https://i.pravatar.cc/150?img=47", status: "Online" },
  { id: "t2", name: "Rahul Verma", role: "Agent", avatar: "https://i.pravatar.cc/150?img=14", status: "Online" },
  { id: "t3", name: "Priya Nair", role: "Agent", avatar: "https://i.pravatar.cc/150?img=25", status: "Away" },
  { id: "t4", name: "Dev Patel", role: "Viewer", avatar: "https://i.pravatar.cc/150?img=51", status: "Offline" },
];
