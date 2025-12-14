interface ResultsCountProps {
  current: number;
  total: number;
  label: string;
}

export function ResultsCount({ current, total, label }: ResultsCountProps) {
  return (
    <span className="text-xs text-gray-600 font-medium">
      Mostrando {current} de {total} {label}
    </span>
  );
}
