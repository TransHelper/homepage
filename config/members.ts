export interface MemberSocialLinks {
  github?: string;
  twitter?: string;
  website?: string;
  matrix?: string;
  discord?: string;
  telegram?: string;
  bilibili?: string;
  email?: string;
}

export const memberSocials: Record<string, MemberSocialLinks> = {
  rhencloud: {
    github: "RhenCloud",
    website: "https://rhen.cloud",
    matrix: "@RhenCloud:matrix.org",
    telegram: "RhenCloud",
    bilibili: "1502883335",
    email: "aUByaGVuLmNsb3Vk",
  },
  XFJ: {
    github: "XFJ-YYQF",
    website: "https://minecraftxfj.top",
    bilibili: "518725775",
    email: "eHVuZmVuZ2p1bjY2NkBzaWl3YXkub3Jn",
  },
};
