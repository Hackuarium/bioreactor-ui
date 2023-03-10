import React from "react";

const WaterIn = () => {
  return (
    <>
      <g id="water-in">
        {/* Down border line */}
        <path
          id="rect3884"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="2"
          d="
        M303.436,289.078v-46.14 M318.248,242.938v46.14"
        ></path>
        <linearGradient
          id="path4327_1_"
          gradientUnits="userSpaceOnUse"
          x1="2411.3896"
          y1="1988.3486"
          x2="2409.6218"
          y2="1932.5325"
          gradientTransform="matrix(1 0 0 1 -2100.5 -1682.625)"
        >
          <stop offset="0" stopColor="#F6FFD5"></stop>
          <stop offset="1" stopColor="#EEFFAA"></stop>
        </linearGradient>
        {/* Water In exit tube */}
        <path
          id="path4327"
          fill="url(#path4327_1_)"
          d="
          M304.446,244.083v44.927l-2,15.229h16.792l-2-15.229v-44.927H304.446L304.446,244.083z"
        ></path>
        <linearGradient
          id="path4343_2_"
          gradientUnits="userSpaceOnUse"
          x1="3555.3623"
          y1="-283.3486"
          x2="3555.5591"
          y2="-324.696"
          gradientTransform="matrix(0 1 -1 0 -50.9658 -3334.9141)"
        >
          <stop offset="0" stopColor="#F6FFD5"></stop>
          <stop offset="1" stopColor="#EEFFAA"></stop>
        </linearGradient>
        {/* Water In entrance line */}
        <path
          id="rect3903"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="2"
          d="
        M202.738,213.208h82.121v14.812h-82.121"
        ></path>
        {/* Water entrance tube */}
        <path
          id="path4343"
          fill="url(#path4343_2_)"
          d="M279.514,214.094
          h-76.927v12.792h76.927V214.094z"
        ></path>
        {/* No add line */}
        {/* Water In exit */}
        <path
          id="path4585"
          fill="#F6FFD5"
          d="
          M185.938,237.127c-0.029-11.019,0.03-22.038,0-33.057c9.558,5.483,19.071,11.044,28.628,16.528
          C205.039,226.134,195.466,231.592,185.938,237.127z"
        ></path>
      </g>
    </>
  );
};

export default WaterIn;
