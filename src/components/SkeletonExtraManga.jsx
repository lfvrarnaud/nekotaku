import SkeletonCharacter from "./SkeletonCharacter";
import SkeletonChapter from "./SkeletonChapter";
import SkeletonReaction from "./SkeletonReaction";

const SkeletonExtraManga = ({ view }) => {
  if (view === "chapter") {
    return (
      <div className="skeleton-container">
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
        <SkeletonChapter />
      </div>
    );
  }

  if (view === "character") {
    return (
      <div className="skeleton-container">
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
        <SkeletonCharacter />
      </div>
    );
  }
  if (view === "reaction") {
    return (
      <div className="skeleton-container">
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
        <SkeletonReaction />
      </div>
    );
  }
};

export default SkeletonExtraManga;
