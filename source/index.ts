import { EType } from './types';
import { exportTest, exportJSON } from './exporter'

function exportCAN(inputFilename: string, outputFilename: string, type: EType) {
    switch (type) {
        case EType.Test:
            exportTest(inputFilename, undefined, outputFilename, EType.Test);
            break
        case EType.JSON:
            exportJSON(inputFilename, undefined, outputFilename, EType.Test);
            break
    }
}

exportCAN('./assets/default.can.log', './out/test.json', EType.Test);
exportCAN('./assets/default.can.log', './out/result.json', EType.JSON);