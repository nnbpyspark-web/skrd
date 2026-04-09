export interface LiveSchedule {
  title: { en: string; te: string };
  day: string;
  time: string;
}

export const liveConfig = {
  isLive: false,
  youtubeChannelId: "UC_XXXXXXXXXX", // Replace with actual YouTube Channel ID
  currentStreamId: "", // YouTube video ID when live (e.g. "dQw4w9WgXcQ")
  schedule: [
    {
      title: { en: "Morning Darshan", te: "ఉదయ దర్శనం" },
      day: "Daily",
      time: "06:00 AM - 07:00 AM",
    },
    {
      title: { en: "Abhishekam", te: "అభిషేకం" },
      day: "Daily",
      time: "07:00 AM - 08:00 AM",
    },
    {
      title: { en: "Noon Puja", te: "మధ్యాహ్న పూజ" },
      day: "Daily",
      time: "12:00 PM - 12:30 PM",
    },
    {
      title: { en: "Evening Aarti", te: "సాయంకాల ఆరతి" },
      day: "Daily",
      time: "06:00 PM - 06:30 PM",
    },
    {
      title: { en: "Brahmotsavam Special Live", te: "బ్రహ్మోత్సవం ప్రత్యేక లైవ్" },
      day: "Festival Days",
      time: "All Day",
    },
  ] as LiveSchedule[],
};
