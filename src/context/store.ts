import { createContext, Dispatch } from 'react';
import { VehicleType } from '@/lib/types';

type FleetState = {
  vehicles: VehicleType[];
  simulationTime: number;
};

type AddVehicleAction = {
  type: 'AddNewVehicle';
  payload: VehicleType;
};

type UpdateVehicleAction = {
  type: 'UpdateVehicle';
  payload: { id: string; updatedData: VehicleType };
};

type DeleteVehicleAction = {
  type: 'DeleteVehicle';
  payload: string;
};

type UpdateSimIntervalAction = {
  type: 'UpdateSimInterval';
  payload: number;
};

type Action =
  | AddVehicleAction
  | UpdateVehicleAction
  | DeleteVehicleAction
  | UpdateSimIntervalAction;

export const FleetContext = createContext<{
  state: FleetState;
  dispatch: Dispatch<Action>;
}>({
  state: { vehicles: [], simulationTime: 4000 },
  dispatch: () => {},
});
