import { EType } from './types';
import { exportTest, exportJSON, exportCSV } from './exporter'


export default function exportData(type: EType, canInputFilename: string | undefined, gpsInputFilename: string | undefined, outputFilenameOrPath: string) {
    console.log(canInputFilename)
    console.log(gpsInputFilename)
    switch (type) {
        case EType.Test:
            exportTest(canInputFilename, gpsInputFilename, outputFilenameOrPath);
            break;
        case EType.JSON:
            exportJSON(canInputFilename, gpsInputFilename, outputFilenameOrPath);
            break;
        case EType.CSV:
            exportCSV(canInputFilename, gpsInputFilename, outputFilenameOrPath);
            break;
    }
}