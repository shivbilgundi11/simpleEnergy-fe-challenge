import { createContext, Dispatch } from 'react';
import { VehicleType } from '@/lib/types';

type FleetState = {
  vehicles: VehicleType[];
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

type Action = AddVehicleAction | UpdateVehicleAction | DeleteVehicleAction;

export const FleetContext = createContext<{
  state: FleetState;
  dispatch: Dispatch<Action>;
}>({
  state: { vehicles: [] },
  dispatch: () => {},
});
