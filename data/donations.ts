export interface DonationPurpose {
  id: string;
  name: { en: string; te: string };
  description: { en: string; te: string };
  icon: string;
}

export interface DonationAmount {
  amount: number;
  label: { en: string; te: string };
}

export const donationInfo = {
  upiId: "kanugondatemple@sbi",
  upiName: "Sri Kanugonda Raya Swami Temple Trust",
  qrCodeImage: "/images/donation-qr.png",

  bankDetails: {
    accountName: "Sri Raya Swami Temple Trust",
    accountNumber: "XXXXXXXXXX",
    ifscCode: "SBIN0XXXXXX",
    bankName: "State Bank of India",
    branch: "Kanugonda Branch",
    accountType: "Savings Account",
  },

  predefinedAmounts: [
    { amount: 101, label: { en: "₹101", te: "₹101" } },
    { amount: 251, label: { en: "₹251", te: "₹251" } },
    { amount: 501, label: { en: "₹501", te: "₹501" } },
    { amount: 1001, label: { en: "₹1001", te: "₹1001" } },
    { amount: 2001, label: { en: "₹2001", te: "₹2001" } },
    { amount: 5001, label: { en: "₹5001", te: "₹5001" } },
  ] as DonationAmount[],

  purposes: [
    {
      id: "general",
      name: { en: "General Donation", te: "సాధారణ విరాళం" },
      description: {
        en: "Contribute to the general upkeep and daily operations of the temple.",
        te: "దేవాలయం యొక్క సాధారణ నిర్వహణ మరియు రోజువారీ కార్యకలాపాలకు సహకరించండి.",
      },
      icon: "🏛️",
    },
    {
      id: "renovation",
      name: { en: "Temple Renovation", te: "ఆలయ పునరుద్ధరణ" },
      description: {
        en: "Support the restoration and enhancement of the sacred temple structure.",
        te: "పవిత్ర ఆలయ నిర్మాణం యొక్క పునరుద్ధరణ మరియు మెరుగుదలకు మద్దతు ఇవ్వండి.",
      },
      icon: "🔨",
    },
    {
      id: "annadanam",
      name: { en: "Annadanam", te: "అన్నదానం" },
      description: {
        en: "Sponsor free food distribution to devotees visiting the temple.",
        te: "దేవాలయాన్ని సందర్శించే భక్తులకు ఉచిత ఆహార పంపిణీని స్పాన్సర్ చేయండి.",
      },
      icon: "🍚",
    },
    {
      id: "festival",
      name: { en: "Festival Fund", te: "పండుగ నిధి" },
      description: {
        en: "Contribute to making festivals grander and more spiritually enriching.",
        te: "పండుగలను మరింత గొప్పగా మరియు ఆధ్యాత్మికంగా సమృద్ధంగా చేయడానికి సహకరించండి.",
      },
      icon: "🪔",
    },
  ] as DonationPurpose[],
};

export function buildUpiLink(amount: number, purpose?: string): string {
  const baseUrl = "upi://pay";
  const params = new URLSearchParams({
    pa: donationInfo.upiId,
    pn: donationInfo.upiName,
    am: amount.toString(),
    cu: "INR",
    tn: purpose ? `Donation for ${purpose} - Sri Kanugonda Raya Swami Temple` : "Donation - Sri Kanugonda Raya Swami Temple",
  });
  return `${baseUrl}?${params.toString()}`;
}
