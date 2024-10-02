import { useContext } from 'react';

import { GameContext } from '@/store/Game/GameProvider';

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
