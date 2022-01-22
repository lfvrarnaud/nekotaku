import { Skeleton } from "@mui/material";

const SkeletonCardRow = () => {
  return (
    <div className="skeleton-card-row">
      <Skeleton variant="rectangular" width={70} height={100} />
      <Skeleton variant="text" width={150} height={50} />
      <Skeleton variant="text" width={100} height={50} />
    </div>
  );
};

export default SkeletonCardRow;
