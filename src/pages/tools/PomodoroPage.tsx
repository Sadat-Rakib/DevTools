import { PomodoroTimer } from '@/components/tools/PomodoroTimer';

export default function PomodoroPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Pomodoro Timer</h1>
        <p className="text-muted-foreground">
          Boost your productivity with the Pomodoro Technique - work in focused 25-minute intervals.
        </p>
      </div>
      <PomodoroTimer />
    </div>
  );
}