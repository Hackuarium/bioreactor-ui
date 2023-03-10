import React from "react";

const StepperMotor = () => {
  return (
    <>
      {/* Case */}
      <rect
        x="328.927"
        y="171.083"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="2"
        width="58"
        height="37.333"
      ></rect>
      <g>
        {/* Motor */}
        <circle
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="2"
          cx="357.927"
          cy="189.75"
          r="14.5"
        ></circle>
        <text
          transform="matrix(1 0 0 1 350.4951 195.75)"
          fontFamily="'Helvetica'"
          fontSize="18.2205"
        >
          M
        </text>
      </g>
    </>
  );
};

export default StepperMotor;
