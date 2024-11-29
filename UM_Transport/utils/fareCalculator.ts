export interface FareCalculationParams {
    startPoint: string; 
    endPoint: string; 
    distance: number; 
    isPeakHour: boolean;
  }
  
  /**
   * Determines if the current time is peak hour based on Google API's duration and traffic duration.
   * @param {number} duration - Normal travel time (in seconds).
   * @param {number} durationInTraffic - Travel time considering traffic (in seconds).
   * @returns {boolean} True if peak hour, otherwise false.
   */
  export const isPeakHour = (duration: number, durationInTraffic: number): boolean => {
    const trafficDifference = durationInTraffic - duration;
    return trafficDifference > 300; // Peak hour if traffic adds more than 5 minutes
  };
  
  /**
   * Calculates the fare for a ride based on given rules.
   * @param {FareCalculationParams} params - Parameters for fare calculation.
   * @returns {number} Total fare for the ride.
   */
  export const calculateFare = ({
    startPoint,
    endPoint,
    distance,
    isPeakHour,
  }: FareCalculationParams): number => {
    let baseFare: number;
    let maxFare: number;
  
    // Rule 2: KK9 and KK13
    if ((startPoint === "Tun Syed Zahiruddin Residential College (KK9)" || startPoint === "13th Residential College Universiti Malaya (KK13)") 
        || (endPoint === "Tun Syed Zahiruddin Residential College (KK9)" || endPoint === "13th Residential College Universiti Malaya (KK13)")) {
      baseFare = 5;
      maxFare = 8;
    }
    // Rule 3: Other locations within UM
    else {
      baseFare = 4;
      maxFare = 5;
    }
  
    // Calculate distance-based fare
    const distanceFare = baseFare + (maxFare - baseFare) * (distance / 5); // Proportional to max distance of 5km
    let totalFare = Math.min(distanceFare, maxFare);
  
    // Apply peak hour multiplier
    if (isPeakHour) {
      totalFare *= 1.5;
    }
  
    // Round to 2 decimal places
    return Math.round(totalFare * 100) / 100;
  };
  