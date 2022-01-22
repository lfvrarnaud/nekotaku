import { Skeleton } from "@mui/material";

const SkeletonCharacter = () => {
  return (
    <div className="skeleton-chapter">
      <Skeleton variant="rectangular" width={200} height={300} />
      <Skeleton variant="text" width={100} height={50} />
    </div>
  );
};

export default SkeletonCharacter;
