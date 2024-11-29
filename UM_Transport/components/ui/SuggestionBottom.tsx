import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import SuggestionContent from "./SuggestionContent";
import BusContent from "./BusContent";

interface SuggestionsBottomProps {
  bus: {
    type: string;
    name: string;
    fee: string;
    time: number;
    waitingTime: number;
  }[];
  sapu: {
    fee: string;
    time: number;
  };
}

const SuggestionBottom: React.FC<SuggestionsBottomProps> = ({ bus, sapu }) => {
  const snapPoints = useMemo(() => ["16%", "65%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [activeContent, setActiveContent] = useState("suggestion");
  const [selectedBus, setSelectedBus] = useState<null | {
    type: string;
    name: string;
    fee: string;
    time: number;
    waitingTime: number;
  }>(null);

  useEffect(() => {
    console.log("selectedBus", selectedBus);
    console.log("activeContent", activeContent);
  }, [selectedBus, activeContent]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      backgroundStyle={{
        backgroundColor: activeContent === "suggestion" ? "#F1F3F7" : "white",
      }}
      style={{
        borderRadius: 32,
        overflow: "hidden",
      }}
      handleIndicatorStyle={{
        backgroundColor: "#DFE3EF",
        width: 80,
        height: 6,
      }}
    >
      {activeContent === "suggestion" && (
        <SuggestionContent
          bus={bus}
          sapu={sapu}
          setSelectedBus={setSelectedBus}
          setActiveContent={setActiveContent}
          bottomSheetRef={bottomSheetRef}
        />
      )}
      {activeContent === "busSelected" && (
        <BusContent
          bus={selectedBus}
          setSelectedBus={setSelectedBus}
          setActiveContent={setActiveContent}
        />
      )}
    </BottomSheet>
  );
};

export default SuggestionBottom;
