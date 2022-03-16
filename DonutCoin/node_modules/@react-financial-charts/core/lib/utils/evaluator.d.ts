import { ScaleContinuousNumeric, ScaleTime } from "d3-scale";
export default function ({ xScale, useWholeData, clamp, pointsPerPxThreshold, minPointsPerPxThreshold, flipXScale, }: any): {
    filterData: <T>(data: T[], inputDomain: [number | Date, number | Date], xAccessor: (item: T) => number | Date, initialXScale: ScaleContinuousNumeric<number, number, never> | ScaleTime<number, number, never>, { currentPlotData, currentDomain, fallbackStart, fallbackEnd, ignoreThresholds }?: any) => {
        plotData: T[];
        domain: [number | Date, number | Date];
    };
};
