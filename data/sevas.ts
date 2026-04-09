export interface Seva {
  id: string;
  name: { en: string; te: string };
  description: { en: string; te: string };
  price: number;
  currency: string;
  duration: { en: string; te: string };
  category: "archana" | "abhishekam" | "special" | "annadanam";
  availableDays: string[];
  timeSlots: string[];
}

export const sevas: Seva[] = [
  {
    id: "archana",
    name: { en: "Archana", te: "అర్చన" },
    description: {
      en: "Chanting of deity's sacred names with flowers as offerings. A simple yet deeply spiritual ritual to invoke divine blessings.",
      te: "పూలతో నైవేద్యంగా దేవత పవిత్ర నామాల పఠనం. దివ్య ఆశీర్వాదాలు కోరుకోవడానికి ఒక సరళమైన కానీ లోతైన ఆధ్యాత్మిక కర్మ.",
    },
    price: 116,
    currency: "₹",
    duration: { en: "15 minutes", te: "15 నిమిషాలు" },
    category: "archana",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    timeSlots: ["06:00 AM", "10:00 AM", "05:00 PM"],
  },
  {
    id: "sahasranama-archana",
    name: { en: "Sahasranama Archana", te: "సహస్రనామ అర్చన" },
    description: {
      en: "Chanting of 1008 sacred names of the deity with special flower offerings. A deeply devotional ritual for prosperity and well-being.",
      te: "ప్రత్యేక పుష్ప నైవేద్యాలతో దేవత 1008 పవిత్ర నామాల పఠనం. శ్రేయస్సు మరియు శుభం కోసం లోతైన భక్తి కర్మ.",
    },
    price: 251,
    currency: "₹",
    duration: { en: "45 minutes", te: "45 నిమిషాలు" },
    category: "archana",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    timeSlots: ["07:00 AM", "11:00 AM"],
  },
  {
    id: "abhishekam",
    name: { en: "Abhishekam", te: "అభిషేకం" },
    description: {
      en: "Sacred bathing of the deity with milk, curd, honey, rose water and sacred water. This ritual is believed to bring immense blessings.",
      te: "పాలు, పెరుగు, తేనె, గులాబ్ జల్ మరియు పవిత్ర జలంతో దేవతకు పవిత్ర స్నానం. ఈ కర్మ అపారమైన ఆశీర్వాదాలు తెస్తుందని నమ్ముతారు.",
    },
    price: 500,
    currency: "₹",
    duration: { en: "30 minutes", te: "30 నిమిషాలు" },
    category: "abhishekam",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    timeSlots: ["06:00 AM", "09:00 AM"],
  },
  {
    id: "panchamruta-abhishekam",
    name: { en: "Panchamruta Abhishekam", te: "పంచామృత అభిషేకం" },
    description: {
      en: "Grand bathing ritual with five sacred substances: milk, curd, ghee, honey and sugar. A grand ritual for divine grace.",
      te: "ఐదు పవిత్ర పదార్థాలతో గొప్ప స్నాన కర్మ: పాలు, పెరుగు, నెయ్యి, తేనె మరియు చక్కెర. దివ్య కృప కోసం ఒక గొప్ప కర్మ.",
    },
    price: 1001,
    currency: "₹",
    duration: { en: "1 hour", te: "1 గంట" },
    category: "abhishekam",
    availableDays: ["Fri", "Sat", "Sun"],
    timeSlots: ["06:00 AM"],
  },
  {
    id: "homam",
    name: { en: "Homam / Havan", te: "హోమం / హవనం" },
    description: {
      en: "Sacred fire ritual performed with Vedic mantras for blessings, prosperity and removal of obstacles. All family members can participate.",
      te: "వేద మంత్రాలతో ఆశీర్వాదాలు, శ్రేయస్సు మరియు అడ్డంకుల తొలగింపు కోసం పవిత్ర అగ్ని కర్మ. అన్ని కుటుంబ సభ్యులు పాల్గొనవచ్చు.",
    },
    price: 2001,
    currency: "₹",
    duration: { en: "1-2 hours", te: "1-2 గంటలు" },
    category: "special",
    availableDays: ["Mon", "Wed", "Fri", "Sat", "Sun"],
    timeSlots: ["08:00 AM"],
  },
  {
    id: "kalyanam",
    name: { en: "Kalyanam (Divine Wedding)", te: "కల్యాణం (దివ్య వివాహం)" },
    description: {
      en: "Grand ritual celebrating the divine wedding ceremony of the deities. Witness the sacred union adorned with exquisite decorations.",
      te: "దేవతల దివ్య వివాహ వేడుకను జరుపుకునే గొప్ప పూజా కర్మ. అద్భుతమైన అలంకారాలతో అలంకరించిన పవిత్ర కలయికను చూడండి.",
    },
    price: 3001,
    currency: "₹",
    duration: { en: "2 hours", te: "2 గంటలు" },
    category: "special",
    availableDays: ["Fri", "Sat", "Sun"],
    timeSlots: ["10:00 AM"],
  },
  {
    id: "annadanam",
    name: { en: "Annadanam (Food Offering)", te: "అన్నదానం (ఆహార సేవ)" },
    description: {
      en: "Sponsor food offering (prasadam) for devotees visiting the temple. One of the most meritorious acts of charity in Hindu tradition.",
      te: "దేవాలయానికి వచ్చే భక్తులకు ఆహారం (ప్రసాదం) అందించడానికి స్పాన్సర్ చేయండి. హిందూ సంప్రదాయంలో అత్యంత పుణ్యదాయకమైన దాన కార్యాలలో ఒకటి.",
    },
    price: 5001,
    currency: "₹",
    duration: { en: "Full day", te: "రోజంతా" },
    category: "annadanam",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    timeSlots: ["12:00 PM"],
  },
  {
    id: "ekantha-seva",
    name: { en: "Ekantha Seva", te: "ఏకాంత సేవ" },
    description: {
      en: "Special evening ritual where the deity is offered special food, put to rest with traditional lullabies and prayers. A rare privilege.",
      te: "ప్రత్యేక సాయంత్రం కర్మ, ఇక్కడ దేవతకు ప్రత్యేక ఆహారం సమర్పించబడి, సంప్రదాయ లాలిపాటలు మరియు ప్రార్థనలతో నిద్రపోటానికి పెట్టబడతారు. అరుదైన అనుభవం.",
    },
    price: 501,
    currency: "₹",
    duration: { en: "30 minutes", te: "30 నిమిషాలు" },
    category: "special",
    availableDays: ["Fri", "Sat", "Sun"],
    timeSlots: ["08:00 PM"],
  },
];

export type SevaCategory = "all" | "archana" | "abhishekam" | "special" | "annadanam";
