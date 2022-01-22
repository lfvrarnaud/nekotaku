import { Skeleton } from "@mui/material";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <Skeleton variant="rectangular" width={320} height={350} />
      <Skeleton variant="text" width={320} height={50} />
      <Skeleton variant="text" width={50} height={40} />
      <Skeleton variant="text" width={320} height={50} />
      <Skeleton variant="text" width={320} height={50} />
    </div>
  );
};

export default SkeletonCard;
