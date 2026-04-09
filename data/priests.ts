export interface Priest {
  name: { en: string; te: string };
  role: { en: string; te: string };
  description: { en: string; te: string };
  image: string;
}

export const priests: Priest[] = [
  {
    name: { en: "Sri Venkata Subrahmanya Sharma", te: "శ్రీ వెంకట సుబ్రహ్మణ్య శర్మ" },
    role: { en: "Head Priest (Pradhana Archaka)", te: "ప్రధాన అర్చకుడు" },
    description: {
      en: "Serving the temple for over 25 years with deep devotion and expertise in Vedic rituals.",
      te: "వేద కర్మలలో లోతైన భక్తి మరియు నైపుణ్యంతో 25 సంవత్సరాలకు పైగా దేవాలయానికి సేవ చేస్తున్నారు.",
    },
    image: "/images/priests/head-priest.jpg",
  },
  {
    name: { en: "Sri Ramachandra Dikshitulu", te: "శ్రీ రామచంద్ర దీక్షితులు" },
    role: { en: "Associate Priest (Sahayaka Archaka)", te: "సహాయక అర్చకుడు" },
    description: {
      en: "Expert in performing special pujas and homams with 15 years of service at the temple.",
      te: "ప్రత్యేక పూజలు మరియు హోమాలు నిర్వహించడంలో నిపుణుడు, దేవాలయంలో 15 సంవత్సరాల సేవ.",
    },
    image: "/images/priests/associate-priest.jpg",
  },
  {
    name: { en: "Sri Narasimha Somayajulu", te: "శ్రీ నరసింహ సోమయాజులు" },
    role: { en: "Temple Scholar (Vidwan)", te: "దేవాలయ విద్వాంసుడు" },
    description: {
      en: "Renowned scholar in Sanskrit and Telugu, conducts pravachanams and spiritual discourses.",
      te: "సంస్కృతం మరియు తెలుగులో ప్రసిద్ధ విద్వాంసుడు, ప్రవచనాలు మరియు ఆధ్యాత్మిక ఉపన్యాసాలు నిర్వహిస్తారు.",
    },
    image: "/images/priests/scholar.jpg",
  },
];
