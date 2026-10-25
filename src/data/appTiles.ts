import type { IconType } from "react-icons";
import {
  FaBaby,
  FaBell,
  FaBookOpen,
  FaBookQuran,
  FaCartShopping,
  FaChartLine,
  FaCode,
  FaDroplet,
  FaFileLines,
  FaGraduationCap,
  FaMapLocationDot,
  FaStore,
  FaUtensils,
  FaWallet,
} from "@/lib/icons";

export interface AppTile {
  /** `Project.slug` this icon belongs to */
  slug: string;
  Icon: IconType;
  /** Maps to `.tile-N` / `.hue-N` in globals.css */
  tone: number;
  label: { en: string; bn: string };
}

export const appTiles: AppTile[] = [
  {
    slug: "pregnancy-tracker",
    Icon: FaBaby,
    tone: 0,
    label: { en: "Pregnancy Tracker", bn: "প্রেগন্যান্সি ট্র্যাকার" },
  },
  { slug: "lifetrack", Icon: FaBell, tone: 1, label: { en: "LifeTrack", bn: "লাইফট্র্যাক" } },
  { slug: "husnul-dua", Icon: FaBookQuran, tone: 2, label: { en: "Husnul Dua", bn: "হুসনুল দুআ" } },
  { slug: "gedushop", Icon: FaCartShopping, tone: 4, label: { en: "GeduShop", bn: "গেডুশপ" } },
  { slug: "cleancv", Icon: FaFileLines, tone: 6, label: { en: "CleanCV", bn: "ক্লিনসিভি" } },
  { slug: "portfolio", Icon: FaCode, tone: 5, label: { en: "Portfolio", bn: "পোর্টফোলিও" } },
  { slug: "shikho-shop", Icon: FaStore, tone: 1, label: { en: "Shikho Shop", bn: "শিখো শপ" } },
  { slug: "bohubrihi", Icon: FaBookOpen, tone: 5, label: { en: "Bohubrihi", bn: "বহুব্রীহি" } },
  {
    slug: "nextdhabian",
    Icon: FaGraduationCap,
    tone: 6,
    label: { en: "NextDhabian", bn: "নেক্সটঢাবিয়ান" },
  },
  { slug: "gedusuite", Icon: FaChartLine, tone: 2, label: { en: "GeduSuite", bn: "গেডুসুইট" } },
  { slug: "jelar-shad", Icon: FaUtensils, tone: 3, label: { en: "Jelar Shad", bn: "জেলার স্বাদ" } },
  {
    slug: "jajabor-meter",
    Icon: FaMapLocationDot,
    tone: 7,
    label: { en: "Jajabor Meter", bn: "যাযাবর মিটার" },
  },
  { slug: "bloodreach", Icon: FaDroplet, tone: 3, label: { en: "BloodReach", bn: "ব্লাডরিচ" } },
  {
    slug: "money-management",
    Icon: FaWallet,
    tone: 7,
    label: { en: "Money Manager", bn: "মানি ম্যানেজার" },
  },
];

/** The six products on the hero home screen: three columns, two rows, never cramped. */
const HERO_SLUGS = [
  "pregnancy-tracker",
  "lifetrack",
  "jelar-shad",
  "gedushop",
  "cleancv",
  "husnul-dua",
];
export const heroTiles = HERO_SLUGS.map((slug) => appTiles.find((t) => t.slug === slug)!);

export const tileForProject = (slug: string) => appTiles.find((t) => t.slug === slug);
