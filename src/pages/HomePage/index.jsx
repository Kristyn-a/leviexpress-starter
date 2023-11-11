import { JourneyPicker } from '../../components/JourneyPicker';
import { useState } from 'react';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey !== null ? <p>Nalezeno spojení s id {journey.journeyId}</p> : ''}
    </main>
  );
};
