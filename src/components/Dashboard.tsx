import WeeklyOverview from './WeeklyOverview';
import AIPrediction from './AIPrediction';
import LatestReadings from './LatestReadings';
import WeeklyTip from './WeeklyTip';

export default function Dashboard() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <WeeklyOverview />
        <AIPrediction />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <LatestReadings />
        <WeeklyTip />
      </div>
    </div>
  );
}
