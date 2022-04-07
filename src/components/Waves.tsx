import { useEffect } from "react";
import Wave from "react-wavify";

const Waves = ({
  doesSmallScreenMatches,
}: {
  doesSmallScreenMatches: boolean;
}) => {
  let waveProps = {
    height: [50, 63, 82, 94, 120],
    amplitude: [30, 32, 27, 30, 26],
    speed: [0.15, 0.13, 0.2, 0.17, 0.15],
    points: [3, 4, 5, 6, 3],
  };
  if (doesSmallScreenMatches) {
    waveProps = {
      height: [80, 90, 104, 123, 130],
      amplitude: [10, 9, 13, 15, 12],
      speed: [0.15, 0.13, 0.2, 0.17, 0.15],
      points: [2, 3, 2, 4, 3],
    };
  }
  return (
    <div className="waves">
      <div className="waves-wave">
        <Wave
          fill="#02C39A"
          paused={false}
          options={{
            height: waveProps.height[0],
            amplitude: waveProps.amplitude[0],
            speed: waveProps.speed[0],
            points: waveProps.points[0],
          }}
        />
      </div>
      <div className="waves-wave">
        <Wave
          fill="#00ADA8"
          paused={false}
          options={{
            height: waveProps.height[1],
            amplitude: waveProps.amplitude[1],
            speed: waveProps.speed[1],
            points: waveProps.points[1],
          }}
        />
      </div>
      <div className="waves-wave">
        <Wave
          fill="#0096A7 "
          paused={false}
          options={{
            height: waveProps.height[2],
            amplitude: waveProps.amplitude[2],
            speed: waveProps.speed[2],
            points: waveProps.points[2],
          }}
        />
      </div>
      <div className="waves-wave">
        <Wave
          fill="#007E9C"
          paused={false}
          options={{
            height: waveProps.height[3],
            amplitude: waveProps.amplitude[3],
            speed: waveProps.speed[3],
            points: waveProps.points[3],
          }}
        />
      </div>
      <div className="waves-wave">
        <Wave
          fill="#05668D"
          paused={false}
          options={{
            height: waveProps.height[4],
            amplitude: waveProps.amplitude[4],
            speed: waveProps.speed[4],
            points: waveProps.points[4],
          }}
        />
      </div>
    </div>
  );
};

export default Waves;
