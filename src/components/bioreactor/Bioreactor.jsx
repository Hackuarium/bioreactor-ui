import Liquid from './layouts/Liquid';
import Bessel from './layouts/Bessel';
import StepperMotorRod from './layouts/StepperMotorRod';
import WaterIn from './layouts/WaterIn';
import PumpIn from './layouts/PumpIn';
import PipelineElbowIn from './layouts/PipelineElbowIn';
import PipelineElbowOut from './layouts/PipelineElbowOut';
import WaterOut from './layouts/WaterOut';
import PumpOut from './layouts/PumpOut';
import HeatingPlate from './layouts/HeatingPlate';
import StepperMotor from './layouts/StepperMotor';

import HeatingTemperatureState from './utils/HeatingTemperatureState';
import BioreactorTemperatureState from './utils/BioreactorTemperatureState';
import StepperMotorState from './utils/StepperMotorState';
import PumpOutState from './utils/PumpOutState';
import PumpInState from './utils/PumpInState';
import WeightState from './utils/WeightState';
import PHState from './utils/PHState';

import MeasureRule from './layouts/MeasureRule';
import SpatulaLeft from './SpatulaLeft';
import SpatulaRight from './SpatulaRight';

const envelope = [<Liquid />, <StepperMotorRod />];

export const Bioreactor = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="bioreactor"
      viewBox="0 0 512 512"
    >
      {/* {envelope[0]} */}
      <Liquid />
      <g id="svg2">
        <g id="layer1" transform="translate(-113.75,-92.8125)">
          <Bessel />
          <g id="stepper">
            <StepperMotorRod />
            <StepperMotor />
            <StepperMotorState />
          </g>
          <g id="pump-in">
            <WaterIn />
            <PumpIn />
            <PipelineElbowIn />
            <PumpInState />
          </g>
          <g id="pump-out">
            <PipelineElbowOut />
            <WaterOut />
            <PumpOut />
            <PumpOutState />
          </g>
          <g id="heating">
            <HeatingPlate />
            <HeatingTemperatureState />
            <BioreactorTemperatureState />
          </g>
          <g id="weight">
            <WeightState />
          </g>
          <g id="ph">
            <PHState />
          </g>
        </g>
        <SpatulaLeft move={true} />
        <SpatulaRight move={true} />
      </g>
      <MeasureRule />
    </svg>
  );
};
