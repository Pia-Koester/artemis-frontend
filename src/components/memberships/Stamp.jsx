import { motion } from "framer-motion";
import LogoSmall from "../../assets/logos/Bildmarke_anthra.svg"; //TO DO - this needs to move to the user membership overview page

export default function Stamp() {
  const randomDegree = Math.random() * (4 - -4) + -2;
  return (
    <img
      src={LogoSmall}
      className={`stamp w-32 `}
      style={{ transform: `rotate(${randomDegree}deg)` }}
    />
  );
}
