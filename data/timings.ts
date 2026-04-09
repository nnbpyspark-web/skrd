export interface TimingEntry {
  title: { en: string; te: string };
  startTime: string;
  endTime: string;
  type: "daily" | "special" | "festival";
  days: string[];
  description?: { en: string; te: string };
}

export const dailyTimings: TimingEntry[] = [
  {
    title: { en: "Morning Abhishekam", te: "ఉదయ అభిషేకం" },
    startTime: "05:30",
    endTime: "06:30",
    type: "daily",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    description: {
      en: "Sacred morning bathing ritual of the deity",
      te: "దేవతకు పవిత్ర ఉదయ స్నాన పూజ",
    },
  },
  {
    title: { en: "Morning Darshan", te: "ఉదయ దర్శనం" },
    startTime: "06:30",
    endTime: "12:00",
    type: "daily",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    description: {
      en: "Morning worship and darshan for devotees",
      te: "భక్తులకు ఉదయ పూజ మరియు దర్శనం",
    },
  },
  {
    title: { en: "Madhyahna Puja", te: "మధ్యాహ్న పూజ" },
    startTime: "12:00",
    endTime: "12:30",
    type: "daily",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    description: {
      en: "Midday prayer and offerings",
      te: "మధ్యాహ్న ప్రార్థన మరియు నైవేద్యాలు",
    },
  },
  {
    title: { en: "Afternoon Rest (Temple Closed)", te: "మధ్యాహ్న విశ్రాంతి (దేవాలయం మూసివేయబడింది)" },
    startTime: "12:30",
    endTime: "16:00",
    type: "daily",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    description: {
      en: "Temple remains closed during afternoon",
      te: "మధ్యాహ్నం దేవాలయం మూసివేయబడుతుంది",
    },
  },
  {
    title: { en: "Evening Darshan", te: "సాయంత్రం దర్శనం" },
    startTime: "16:00",
    endTime: "20:00",
    type: "daily",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    description: {
      en: "Evening worship and darshan",
      te: "సాయంత్రం పూజ మరియు దర్శనం",
    },
  },
  {
    title: { en: "Night Harati", te: "రాత్రి హారతి" },
    startTime: "20:00",
    endTime: "20:30",
    type: "daily",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    description: {
      en: "Evening aarti and closing ceremony",
      te: "సాయంత్రం ఆరతి మరియు ముగింపు కార్యక్రమం",
    },
  },
];

export const specialTimings: TimingEntry[] = [
  {
    title: { en: "Friday Special Puja", te: "శుక్రవారం ప్రత్యేక పూజ" },
    startTime: "18:00",
    endTime: "19:00",
    type: "special",
    days: ["Fri"],
    description: {
      en: "Special weekly puja on Fridays with Lakshmi archana",
      te: "శుక్రవారాలలో లక్ష్మీ అర్చనతో ప్రత్యేక వారపు పూజ",
    },
  },
  {
    title: { en: "Saturday Abhishekam", te: "శనివారం అభిషేకం" },
    startTime: "06:00",
    endTime: "07:00",
    type: "special",
    days: ["Sat"],
    description: {
      en: "Special Saturday abhishekam with milk and honey",
      te: "పాలు మరియు తేనెతో ప్రత్యేక శనివారం అభిషేకం",
    },
  },
  {
    title: { en: "Sunday Special Darshan", te: "ఆదివారం ప్రత్యేక దర్శనం" },
    startTime: "07:00",
    endTime: "13:00",
    type: "special",
    days: ["Sun"],
    description: {
      en: "Extended morning darshan on Sundays",
      te: "ఆదివారాలలో విస్తరించిన ఉదయ దర్శనం",
    },
  },
];
