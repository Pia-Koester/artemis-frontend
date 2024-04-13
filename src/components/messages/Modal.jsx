export default function Modal() {
  return (
    <dialog id="badCredentials" className="modal">
      <div className="modal-box">
        <div role="alert">
          <h3 className="font-bold text-lg">Oh nein!</h3>
          <p className="py-4">
            Benutzername und Passwort stimmen nicht überein - probiere es noch
            einmal.
          </p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Nochmal probieren</button>
      </form>
    </dialog>
  );
}
