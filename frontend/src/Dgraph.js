
const cleanPercentage = (percentage) => {
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > 100;
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
  };
  
  const Circle = ({ colour, percentage, width }) => {
    const r =width/2-10;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    return (
      <circle
        r={r}
        cx={width/2}
        cy={width/2}
        fill="transparent"
        stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
        strokeWidth={".25rem"}
        strokeDasharray={circ}
        strokeDashoffset={percentage ? strokePct : 0}
      ></circle>
    );
  };
  
  const Text = ({ percentage }) => {
    return (
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="white"
        fontSize={".6em"}
      >
        {percentage.toFixed(0)}%
      </text>
    );
  };
  
  const Dgraph = ({ percentage, colour, width}) => {
    const pct = cleanPercentage(percentage);
    return (
      <svg width={width} height={width}>
        <g transform={`rotate(-90 ${width/2} ${width/2})`}>
          <Circle colour="#130a21" width={width} />
          <Circle colour={colour} percentage={pct}  width={width}/>
        </g>
        <Text percentage={pct} />
      </svg>
    );
  };

  export default Dgraph;