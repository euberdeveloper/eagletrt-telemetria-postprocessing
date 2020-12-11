import { EType } from './types';
import { exportTest, exportJSON, exportCSV } from './exporter'

function exportCAN(inputFilename: string, outputFilename: string, type: EType) {
    switch (type) {
        case EType.Test:
            exportTest(inputFilename, undefined, outputFilename);
            break;
        case EType.JSON:
            exportJSON(inputFilename, undefined, outputFilename);
            break;
        case EType.CSV:
            exportCSV(inputFilename, undefined, outputFilename);
            break;
    }
}

exportCAN('./assets/default.can.log', './out/test.json', EType.Test);
exportCAN('./assets/default.can.log', './out/result.json', EType.JSON);
exportCAN('./assets/default.can.log', './out', EType.CSV);