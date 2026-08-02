import { Shell } from "./site/components/SiteShell";
import { Home as HomePage } from "./site/pages/HomePage";

export default function Home() {
  return <Shell home><HomePage /></Shell>;
}
