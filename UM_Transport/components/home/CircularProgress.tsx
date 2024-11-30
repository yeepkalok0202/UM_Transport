import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G, Line, Text as SvgText } from "react-native-svg";
import { Text } from "react-native-paper";

const CircularProgress = ({ progress }: { progress: number }) => {
  const size = 120;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const angle = progress * 360;
  const rad = (angle - 90) * (Math.PI / 180);
  const x = radius * Math.cos(rad) + size / 2;
  const y = radius * Math.sin(rad) + size / 2;

  // Start position coordinates (for the separator at the start)
  const startX = size / 2;
  const startY = size / 2 - radius; // Directly above the center

  // Calculate midpoint for the percentage text
  const midpointAngle = angle / 2 - 90; // Halfway angle
  const midRad = midpointAngle * (Math.PI / 180);
  const midX = radius * Math.cos(midRad) + size / 2;
  const midY = radius * Math.sin(midRad) + size / 2;

  // Calculate midpoint for the uncompleted progress percentage text
  const uncompletedAngle = (1 - progress) * 360; // Angle for uncompleted progress
  const uncompletedMidpointAngle = uncompletedAngle / 2 + angle - 90; // Halfway angle adjusted for correct positioning
  const uncompletedMidRad = uncompletedMidpointAngle * (Math.PI / 180);
  const uncompletedMidX = radius * Math.cos(uncompletedMidRad) + size / 2; // Position uncompleted text
  const uncompletedMidY = radius * Math.sin(uncompletedMidRad) + size / 2; // Position uncompleted text

  return (
    <View className="items-center">
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={"#FF9C2F"}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* White separator at the start of the progress */}
        <Line
          x1={size / 2}
          y1={size / 2}
          x2={startX} // Start from the center
          y2={startY - 10} // End at the top of the circle
          stroke="white"
          strokeLinecap="butt"
          strokeWidth={strokeWidth / 8} // Adjust size as needed
        />

        {/* Circle progress */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={"#002266"}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {/* White separator at the end of progress */}
        {progress > 0 && progress < 1 && (
          <Line
            x1={size / 2}
            y1={size / 2}
            x2={(x - size / 2) * 1.2 + size / 2} // Extend beyond endpoint by scaling
            y2={(y - size / 2) * 1.2 + size / 2} // Extend beyond endpoint by scaling
            stroke="white"
            strokeLinecap="butt"
            strokeWidth={strokeWidth / 15} // Adjust size as needed
          />
        )}

        {/* Centered Progress Percentage */}
        {progress > 0 && (
          <G transform={`translate(${midX}, ${midY})`}>
            <SvgText
              textAnchor="middle"
              fill="white"
              fontSize="8"
              fontWeight="bold"
            >
              {`${Math.round(progress * 100)}%`}
            </SvgText>
          </G>
        )}

        {/* Centered Uncompleted Progress Percentage */}
        {progress < 1 && (
          <G transform={`translate(${uncompletedMidX}, ${uncompletedMidY})`}>
            <SvgText
              textAnchor="middle"
              fill="white"
              fontSize="8"
              fontWeight="bold"
              dy="2"
            >
              {`${Math.round((1 - progress) * 100)}%`}
            </SvgText>
          </G>
        )}

        {/* Centered Labels  */}
        <SvgText
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          fill={"#002266"}
          fontSize="10"
          dy="-15"
        >
          reduce
        </SvgText>
        <SvgText
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          fill={"#002266"}
          fontSize="20"
          dy="8"
        >
          20%
        </SvgText>
        <SvgText
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          fill={"#002266"}
          fontSize="8"
          dy="18"
        >
          carbon footprint
        </SvgText>
      </Svg>
      <View style={[styles.legendContainer, { marginTop: 10 }]}>
        <View style={styles.legendItem}>
          <View
            style={[styles.colorIndicator, { backgroundColor: "#FF9C2F" }]}
          />
          <Text style={styles.text}>Public Transport</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.colorIndicator, { backgroundColor: "#002266" }]}
          />
          <Text style={styles.text}>Ride Hailing</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingRight: 10,
  },
  colorIndicator: {
    width: 6,
    height: 6,
    borderRadius: 0, // Remove the border radius to keep it square
    marginRight: 8,
  },
  text: {
    fontSize: 8,
  },
});

export default CircularProgress;
