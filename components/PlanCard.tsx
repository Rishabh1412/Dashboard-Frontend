import type { IconType } from "react-icons";
import { MdMoreVert } from "react-icons/md";
import { ProgressBar } from "./ui/ProgressBar";

type PlanCardProps = {
  icon?: IconType;
  title: string;
  current: string;
  target: string;
  percentage: number;
};

export const PlanCard = ({
  icon: Icon,
  title,
  current,
  target,
  percentage,
}: PlanCardProps) => {
  return (
    <div className="card-inner flex border border-border hover:border-border-strong transition-colors bg-white dark:bg-surface flex-col gap-3">
      {/* Header: Icon, Title, Options Menu */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-light-green text-primary dark:bg-surface">
              <Icon className="text-lg" />
            </div>
          )}
          <h3 className="text-sm font-bold text-content">{title}</h3>
        </div>
        <button className="text-content-muted hover:text-content">
          <MdMoreVert className="text-xl" />
        </button>
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={percentage} />

      {/* Footer Details */}
      <div className="flex items-center justify-between text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <span className="text-content">{current}</span>
          <span className="text-content-muted">{percentage}%</span>
        </div>
        <div className="text-content-muted">
          Target: <span className="text-content">{target}</span>
        </div>
      </div>
    </div>
  );
};
