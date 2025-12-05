import svgPaths from "./svg-bsamuc56hk";

function Raws() {
  return (
    <div className="absolute h-[27px] left-0 top-0 w-[162.553px]" data-name="RAWS">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 163 27">
        <g id="RAWS">
          <path d={svgPaths.p28b0fef0} fill="var(--fill-0, #F5C33C)" id="Vector" />
          <path d={svgPaths.p2ee04a00} fill="url(#paint0_linear_11_21)" id="Vector_2" />
          <path d={svgPaths.p34a4b000} fill="var(--fill-0, #282828)" id="Vector_3" />
          <path d={svgPaths.p3a546200} fill="var(--fill-0, #282828)" id="Vector_4" />
          <path d={svgPaths.p19fa0100} fill="var(--fill-0, #282828)" id="Vector_5" />
          <path d={svgPaths.p233d9700} fill="var(--fill-0, #282828)" id="Vector_6" />
          <path d={svgPaths.p2cb46a00} fill="var(--fill-0, #282828)" id="Vector_7" />
          <path d={svgPaths.p37046e00} fill="var(--fill-0, #282828)" id="Vector_8" />
          <path d={svgPaths.pf3a1800} fill="var(--fill-0, #282828)" id="Vector_9" />
          <path d={svgPaths.p31115700} fill="var(--fill-0, #282828)" id="Vector_10" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_11_21" x1="5.33701" x2="19.7706" y1="-4.21682" y2="25.4764">
            <stop stopColor="#4A90E2" />
            <stop offset="1" stopColor="#56A45E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Logo() {
  return (
    <div className="relative size-full" data-name="Logo">
      <Raws />
    </div>
  );
}