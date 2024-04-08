import logoSmall from "../../assets/logos/Bildmarke_anthra.svg";

export default function Footer() {
  return (
    <>
      <footer className="footer p-10 bg-base-200 text-base-content mt-auto">
        <nav>
          <header className="footer-title">Erfahre mehr</header>
          <a
            className="link link-hover"
            href="https://www.artemisacademy.de/therapeutischesboxen"
          >
            Therapeutisches Boxen
          </a>
          <a
            className="link link-hover"
            href="https://www.artemisacademy.de/sv"
          >
            Selbstverteidigung
          </a>
          <a
            className="link link-hover"
            href="https://www.artemisacademy.de/frauensv"
          >
            Für Frauen
          </a>
          <a
            className="link link-hover"
            href="https://www.artemisacademy.de/%C3%BCber"
          >
            Team
          </a>
          <a
            className="link link-hover"
            href="https://www.artemisacademy.de/kontakt"
          >
            Kontakt
          </a>
        </nav>
        <nav>
          <header className="footer-title">Rechtliches</header>
          <a
            className="link link-hover"
            href="https://www.artemisacademy.de/impressum"
          >
            Impressum
          </a>
          <a
            className="link link-hover"
            href="https://www.artemisacademy.de/datenschutz"
          >
            Datenschutz
          </a>
        </nav>
      </footer>
      <footer className="footer px-2 py-4 border-t bg-base-200 text-base-content border-base-300">
        <aside className="items-center grid-flow-col">
          <img src={logoSmall} className="w-24" />
          <p>© 2023 Artemis Academy, alle Rechte vorbehalten</p>
        </aside>
      </footer>
    </>
  );
}
