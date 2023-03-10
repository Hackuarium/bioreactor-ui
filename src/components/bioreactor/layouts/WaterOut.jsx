import React from "react";

const WaterOut = () => {
  return (
    <>
      <g id="water-out">
        {/* Water Out exit line */}
        <path
          id="rect3903_1_"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="2"
          d="
        M515.584,227.267h-82.121v-14.812h82.121"
        ></path>
        {/* Down border line */}
        <path
          id="rect3884_1_"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="2"
          d="
            M396.936,297.23v-46.14 M411.748,251.091v46.14"
        ></path>

        <linearGradient
          id="path4339_3_"
          gradientUnits="userSpaceOnUse"
          x1="2504.7246"
          y1="1975.2373"
          x2="2504.9209"
          y2="1933.8898"
          gradientTransform="matrix(1 0 0 1 -2100.5 -1676.4053)"
        >
          <stop offset="0" stopColor="#F6FFD5"></stop>
          <stop offset="1" stopColor="#EEFFAA"></stop>
        </linearGradient>
        {/* Water Out entrance tube */}
        <path
          id="path4339_1_"
          fill="url(#path4339_3_)"
          d="
            M397.945,251.697v44.927h12.793v-44.927L397.945,251.697L397.945,251.697z"
        ></path>

        <linearGradient
          id="path4343_3_"
          gradientUnits="userSpaceOnUse"
          x1="487.3291"
          y1="427.875"
          x2="487.5364"
          y2="384.2344"
          gradientTransform="matrix(0 -1 1 0 56.2695 707.3574)"
        >
          <stop offset="0" stopColor="#F6FFD5"></stop>
          <stop offset="1" stopColor="#EEFFAA"></stop>
        </linearGradient>
        {/* Water Out exit tube */}
        <path
          id="path4343_1_"
          fill="url(#path4343_3_)"
          d="
          M434.388,226.381h81.196v-12.792h-81.196V226.381z"
        ></path>
        {/* Water Out exit */}
        <path
          id="path4585_1_"
          fill="#F6FFD5"
          d="
          M532.384,203.348c0.029,11.019-0.03,22.038,0,33.057c-9.558-5.483-19.071-11.044-28.628-16.528
          C513.283,214.341,522.855,208.883,532.384,203.348z"
        ></path>
      </g>
    </>
  );
};

export default WaterOut;
