import { FleetContext } from '@/context/store';
import { VehicleType } from '@/lib/types';
import { vehicles } from '@/lib/utils';
import { ReactNode, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

type FleetState = {
  vehicles: VehicleType[];
  simulationTime: number;
};

// Action types
type AddVehicleAction = { type: 'AddNewVehicle'; payload: VehicleType };
type UpdateVehicleAction = {
  type: 'UpdateVehicle';
  payload: { id: string; updatedData: VehicleType };
};
type DeleteVehicleAction = { type: 'DeleteVehicle'; payload: string };
type UpdateSimIntervalAction = { type: 'UpdateSimInterval'; payload: number };
type AddVehiclesAction = { type: 'AddVehicles'; payload: VehicleType[] };
type Action =
  | AddVehicleAction
  | UpdateVehicleAction
  | DeleteVehicleAction
  | AddVehiclesAction
  | UpdateSimIntervalAction;

// Initial state
const initialState: FleetState = {
  vehicles: vehicles,
  simulationTime: 180000,
};

// Reducer function
const reducerFunct = (state: FleetState, action: Action): FleetState => {
  switch (action.type) {
    case 'AddNewVehicle':
      return { ...state, vehicles: [...state.vehicles, action.payload] };
    case 'AddVehicles':
      console.log('action is : ', action.payload);
      return { ...state, vehicles: action.payload };
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
    case 'UpdateSimInterval':
      return { ...state, simulationTime: action.payload };
    default:
      return state;
  }
};

// Context provider component
function FleetContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducerFunct, initialState);

  // Battery simulation logic
  useEffect(() => {
    if (state.vehicles.length === 0) return;

    const interval = setInterval(() => {
      state.vehicles.forEach((vehicle) => {
        let newBattery = vehicle.batteryPercentage;
        let distanceTravelled = 0;
        let batteryLoss;

        switch (vehicle.status) {
          case 'In Transit':
            distanceTravelled = 3;
            batteryLoss = Math.floor(distanceTravelled / 3);
            newBattery = Math.max(vehicle.batteryPercentage - batteryLoss, 0);

            dispatch({
              type: 'UpdateVehicle',
              payload: {
                id: vehicle.id,
                updatedData: {
                  ...vehicle,
                  batteryPercentage: newBattery,
                  totalDistance: vehicle.totalDistance + distanceTravelled,
                },
              },
            });
            break;

          case 'On Charge':
            if (vehicle.batteryPercentage < 100) {
              newBattery = Math.min(vehicle.batteryPercentage + 10, 100);

              if (newBattery >= 90 && newBattery < 100) {
                toast(
                  `Battery for ${vehicle.name} is about to be full (${newBattery}%)`,
                );
              }

              if (newBattery === 100) {
                toast(`${vehicle.name} is fully charged!`);
                const currentTime = new Date().toISOString();

                dispatch({
                  type: 'UpdateVehicle',
                  payload: {
                    id: vehicle.id,
                    updatedData: {
                      ...vehicle,
                      batteryPercentage: newBattery,
                      lastChargeTime: currentTime,
                    },
                  },
                });
              } else {
                dispatch({
                  type: 'UpdateVehicle',
                  payload: {
                    id: vehicle.id,
                    updatedData: { ...vehicle, batteryPercentage: newBattery },
                  },
                });
              }
            }
            break;

          case 'Idle':
            break;
        }

        if (newBattery < 15 && newBattery > 0) {
          toast(
            `Low Battery Warning for ${vehicle.name}: ${newBattery}% remaining!`,
          );
        }
      });
    }, state.simulationTime);

    return () => clearInterval(interval);
  }, [state.vehicles, state.simulationTime, dispatch]);

  return (
    <FleetContext.Provider value={{ state, dispatch }}>
      {children}
    </FleetContext.Provider>
  );
}

export default FleetContextProvider;
