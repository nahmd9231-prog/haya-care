import { useApp } from '../../context/AppContext';

type Status = 'normal' | 'slightlyHigh' | 'high' | 'low';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { bg: string; text: string; dot: string }> = {
  normal: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
  slightlyHigh: { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500' },
  high: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
  low: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { tr } = useApp();
  const cfg = statusConfig[status];

  const labels: Record<Status, keyof typeof tr> = {
    normal: 'normal',
    slightlyHigh: 'slightlyHigh',
    high: 'high',
    low: 'low',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {tr[labels[status]] as string}
    </span>
  );
}
