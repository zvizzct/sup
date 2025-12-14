interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="bg-white border border-gray-300 p-8 text-center">
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}
