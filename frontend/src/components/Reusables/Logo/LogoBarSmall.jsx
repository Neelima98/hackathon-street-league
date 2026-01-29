import Logo from "../../../assets/StreetLeagueLogo.png";
export default function LogoBarSmall() {
  return (
    <div className="flex items-center text-dark-primary">
      <img src={Logo} alt="Street League Logo" className="w-48 h-24" />
    </div>
  );
}
