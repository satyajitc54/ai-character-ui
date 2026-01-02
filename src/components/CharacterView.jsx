import character from "../assets/characterbg.png";

export default function CharacterView() {
  return (
    <div className="character-container">
      <img
        src={character}
        alt="AI Character"
        className="character-img"
      />
    </div>
  );
}
