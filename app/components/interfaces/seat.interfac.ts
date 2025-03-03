
export interface ISeat {
    id: number;
    isOccupied: boolean;
    position: { x: number; y: number };
    rotation: number;
    lastUpdate?: Date;
    signalStrength?: number;
    batteryLevel?: number;
  }