import { Skeleton } from "@mui/material";

const SkeletonChapter = () => {
  return (
    <div className="skeleton-chapter">
      <Skeleton variant="rectangular" width={200} height={100} />
      <Skeleton variant="text" width={100} height={50} />
      <Skeleton variant="text" width={100} height={50} />
    </div>
  );
};

export default SkeletonChapter;
