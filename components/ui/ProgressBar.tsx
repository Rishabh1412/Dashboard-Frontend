type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    // The track (Light green in light mode, subtle border color in dark mode)
    <div className="h-2 w-full overflow-hidden rounded-full bg-selected dark:bg-border">
      {/* The fill (Dark green primary brand color) */}
      <div
        className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} // Keeps width between 0-100%
      />
    </div>
  );
};
