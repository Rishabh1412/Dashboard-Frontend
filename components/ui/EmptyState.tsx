type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
};

export function EmptyState({
  title,
  description,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={`flex min-h-28 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-background px-4 py-6 text-center ${className}`}
    >
      <p className="text-sm font-bold tracking-tight text-content">{title}</p>
      <p className="mt-1 max-w-sm text-xs text-wrap text-content-muted">{description}</p>
    </div>
  );
}
