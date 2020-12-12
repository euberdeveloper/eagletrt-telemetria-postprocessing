import { EType } from './types';
import { exportTest, exportJSON, exportCSV } from './exporter'


export default function exportData(type: EType, canLogPath: string | undefined, gpsLogPath: string | undefined, outputPath: string) {
    switch (type) {
        case EType.Test:
            exportTest(canLogPath, gpsLogPath, outputPath);
            break;
        case EType.JSON:
            exportJSON(canLogPath, gpsLogPath, outputPath);
            break;
        case EType.CSV:
            exportCSV(canLogPath, gpsLogPath, outputPath);
            break;
    }
}