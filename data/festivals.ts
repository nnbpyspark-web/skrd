export interface Festival {
  name: { en: string; te: string };
  date: string;
  duration: { en: string; te: string };
  description: { en: string; te: string };
  highlight: boolean;
}

export const festivals: Festival[] = [
  {
    name: { en: "Maha Shivaratri", te: "మహా శివరాత్రి" },
    date: "2026-02-27",
    duration: { en: "1 Day", te: "1 రోజు" },
    description: {
      en: "Grand celebration with special abhishekam, night-long puja, and cultural programs. Thousands of devotees participate in this sacred night.",
      te: "ప్రత్యేక అభిషేకం, రాత్రి వరకు పూజ మరియు సాంస్కృతిక కార్యక్రమాలతో గొప్ప వేడుక. వేలాది భక్తులు ఈ పవిత్ర రాత్రిలో పాల్గొంటారు.",
    },
    highlight: true,
  },
  {
    name: { en: "Ugadi", te: "ఉగాది" },
    date: "2026-03-29",
    duration: { en: "1 Day", te: "1 రోజు" },
    description: {
      en: "Telugu New Year celebration with panchanga sravanam and special pujas.",
      te: "పంచాంగ శ్రవణం మరియు ప్రత్యేక పూజలతో తెలుగు నూతన సంవత్సర వేడుక.",
    },
    highlight: true,
  },
  {
    name: { en: "Sri Rama Navami", te: "శ్రీ రామ నవమి" },
    date: "2026-04-07",
    duration: { en: "1 Day", te: "1 రోజు" },
    description: {
      en: "Celebration of Lord Rama's birth with Kalyanam and procession.",
      te: "కల్యాణం మరియు ఊరేగింపుతో శ్రీ రాముని జన్మదిన వేడుక.",
    },
    highlight: true,
  },
  {
    name: { en: "Vinayaka Chavithi", te: "వినాయక చవితి" },
    date: "2026-09-07",
    duration: { en: "11 Days", te: "11 రోజులు" },
    description: {
      en: "Eleven-day celebration of Lord Ganesha with daily special pujas and cultural events.",
      te: "రోజువారీ ప్రత్యేక పూజలు మరియు సాంస్కృతిక కార్యక్రమాలతో పదకొండు రోజుల వినాయక వేడుక.",
    },
    highlight: false,
  },
  {
    name: { en: "Navaratri", te: "నవరాత్రి" },
    date: "2026-10-14",
    duration: { en: "9 Days", te: "9 రోజులు" },
    description: {
      en: "Nine nights of Devi worship with special alankaram and cultural performances each evening.",
      te: "ప్రతి సాయంత్రం ప్రత్యేక అలంకారం మరియు సాంస్కృతిక ప్రదర్శనలతో తొమ్మిది రాత్రులు దేవి ఆరాధన.",
    },
    highlight: true,
  },
  {
    name: { en: "Deepavali", te: "దీపావళి" },
    date: "2026-10-20",
    duration: { en: "2 Days", te: "2 రోజులు" },
    description: {
      en: "Festival of lights celebrated with lamps, fireworks, and special lakshmi puja.",
      te: "దీపాలు, బాణసంచా మరియు ప్రత్యేక లక్ష్మీ పూజతో వెలుగుల పండుగ.",
    },
    highlight: false,
  },
  {
    name: { en: "Karthika Masam", te: "కార్తీక మాసం" },
    date: "2026-11-01",
    duration: { en: "30 Days", te: "30 రోజులు" },
    description: {
      en: "Sacred month with daily deepotsavam and special morning abhishekams.",
      te: "రోజువారీ దీపోత్సవం మరియు ప్రత్యేక ఉదయ అభిషేకాలతో పవిత్ర మాసం.",
    },
    highlight: false,
  },
  {
    name: { en: "Annual Brahmotsavam", te: "వార్షిక బ్రహ్మోత్సవం" },
    date: "2026-04-15",
    duration: { en: "5 Days", te: "5 రోజులు" },
    description: {
      en: "The grand annual festival with special processions, Kalyanam, and cultural programs attracting devotees from across the region.",
      te: "ప్రాంతం నలుమూలల నుండి భక్తులను ఆకర్షించే ప్రత్యేక ఊరేగింపులు, కల్యాణం మరియు సాంస్కృతిక కార్యక్రమాలతో గొప్ప వార్షిక ఉత్సవం.",
    },
    highlight: true,
  },
];
