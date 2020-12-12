import { OutputFormat } from './types';
import { exportTest, exportJSON, exportCSV } from './exporter'


export default function exportData(type: OutputFormat, canLogPath: string | undefined, gpsLogPath: string | undefined, outputPath: string) {
    switch (type) {
        case OutputFormat.TEST:
            exportTest(canLogPath, gpsLogPath, outputPath);
            break;
        case OutputFormat.JSON:
            exportJSON(canLogPath, gpsLogPath, outputPath);
            break;
        case OutputFormat.CSV:
            exportCSV(canLogPath, gpsLogPath, outputPath);
            break;
    }
}