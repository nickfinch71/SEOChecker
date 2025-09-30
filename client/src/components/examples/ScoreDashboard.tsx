import ScoreDashboard from '../ScoreDashboard';

export default function ScoreDashboardExample() {
  const mockScore = {
    overall: 75,
    categories: {
      basic: 85,
      openGraph: 70,
      twitter: 65,
      technical: 80,
    },
  };

  return <ScoreDashboard score={mockScore} />;
}
