import { FleetContext } from '@/context/store';
import { VehicleType } from '@/lib/types';
import { vehicles } from '@/lib/utils';
import { ReactNode, useReducer } from 'react';

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

const initialState: FleetState = {
  vehicles: vehicles,
};

const reducerFunct = (state: FleetState, action: Action): FleetState => {
  switch (action.type) {
    case 'AddNewVehicle':
      return {
        ...state,
        vehicles: [...state.vehicles, action.payload],
      };
    case 'UpdateVehicle':
      return {
        ...state,
        vehicles: state.vehicles.map((vehicle) =>
          vehicle.id === action.payload.id
            ? action.payload.updatedData
            : vehicle,
        ),
      };
    case 'DeleteVehicle':
      return {
        ...state,
        vehicles: state.vehicles.filter(
          (vehicle) => vehicle.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

function FleetContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducerFunct, initialState);

  return (
    <FleetContext.Provider value={{ state, dispatch }}>
      {children}
    </FleetContext.Provider>
  );
}

export default FleetContextProvider;
