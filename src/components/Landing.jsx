import NavBar from "./NavBar";
import HeroSection3 from "./HeroSection3";
import Body from "./Body";
import { MarqueeSection } from "./Marquee";
import Marquee from "./Marquee";
const Landing = () => {
  return (
    <>
      <NavBar />
      <HeroSection3 />
      <hr></hr>
      <MarqueeSection/>
      <Body></Body>
    </>
  );
};

export default Landing;
