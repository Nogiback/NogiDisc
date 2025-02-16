import KastaplastLogo from '@/assets/logos/kastaplast.png';
import AxiomLogo from '@/assets/logos/axiom.png';
import StreamlineLogo from '@/assets/logos/streamline.png';
import DynamicLogo from '@/assets/logos/dynamic.png';
import DiscraftLogo from '@/assets/logos/discraft.png';
import InfiniteLogo from '@/assets/logos/infinite.png';
import DiscmaniaLogo from '@/assets/logos/discmania.png';
import ThoughtSpaceAthleticsLogo from '@/assets/logos/thoughtspaceathletics.png';
import TrashPandaLogo from '@/assets/logos/trashpanda.png';
import MintLogo from '@/assets/logos/mint.png';
import LoneStarLogo from '@/assets/logos/lonestar.png';
import LatitudeLogo from '@/assets/logos/latitude.png';
import YikunLogo from '@/assets/logos/yikun.png';
import GatewayLogo from '@/assets/logos/gateway.png';
import EV7Logo from '@/assets/logos/ev7.png';
import MillenniumLogo from '@/assets/logos/millennium.png';
import ElevationLogo from '@/assets/logos/elevation.png';
import DGALogo from '@/assets/logos/dga.png';
import FinishLineLogo from '@/assets/logos/finishline.png';
import BirdieLogo from '@/assets/logos/birdie.png';
import ClashLogo from '@/assets/logos/clash.png';
import InnovaLogo from '@/assets/logos/innova.png';
import ProdigyLogo from '@/assets/logos/prodigy.png';
import WestsideLogo from '@/assets/logos/westside.png';
import DivergentLogo from '@/assets/logos/divergent.png';
import ProdiscusLogo from '@/assets/logos/prodiscus.png';
import AboveGroundLevelLogo from '@/assets/logos/abovegroundlevel.png';
import RPMLogo from '@/assets/logos/rpm.png';
import LoftLogo from '@/assets/logos/loft.png';
import MVPLogo from '@/assets/logos/mvp.png';
import LegacyLogo from '@/assets/logos/legacy.png';
import VikingLogo from '@/assets/logos/viking.png';

const LOGO_MAP: Record<string, string> = {
  ['Innova']: InnovaLogo,
  ['MVP']: MVPLogo,
  ['Axiom Discs']: AxiomLogo,
  ['Prodigy']: ProdigyLogo,
  ['Viking']: VikingLogo,
  ['Legacy']: LegacyLogo,
  ['Løft Discs']: LoftLogo,
  ['RPM']: RPMLogo,
  ['Above Ground Level']: AboveGroundLevelLogo,
  ['Prodiscus']: ProdiscusLogo,
  ['Divergent']: DivergentLogo,
  ['Westside Discs']: WestsideLogo,
  ['Clash Discs']: ClashLogo,
  ['Birdie']: BirdieLogo,
  ['Finish Line']: FinishLineLogo,
  ['DGA']: DGALogo,
  ['Elevation Disc Golf']: ElevationLogo,
  ['Millennium']: MillenniumLogo,
  ['EV-7']: EV7Logo,
  ['Gateway']: GatewayLogo,
  ['Yikun']: YikunLogo,
  ['Latitude 64']: LatitudeLogo,
  ['Lone Star Discs']: LoneStarLogo,
  ['Mint Discs']: MintLogo,
  ['Trash Panda']: TrashPandaLogo,
  ['Thought Space Athletics']: ThoughtSpaceAthleticsLogo,
  ['Discmania']: DiscmaniaLogo,
  ['Infinite Discs']: InfiniteLogo,
  ['Discraft']: DiscraftLogo,
  ['Dynamic Discs']: DynamicLogo,
  ['Streamline']: StreamlineLogo,
  ['Kastaplast']: KastaplastLogo,
};

export function getBrandLogo(brand: string): string | null {
  return LOGO_MAP[brand] ?? null;
}
