import { Navigation } from "./Navigation";

const navItems = [{ label: "Home", href: "/" }];

const Header = () => {
  return (
    <header>
      <Navigation navLinks={navItems} />
    </header>
  );
};

export { Header };
