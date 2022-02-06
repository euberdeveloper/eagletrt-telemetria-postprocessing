# **301 - Permanently moved to the [eagletrt's organization](https://github.com/eagletrt)**

[![Lint](https://github.com/eagletrt/telemetria-postprocessing/actions/workflows/lint.yml/badge.svg)](https://github.com/eagletrt/telemetria-postprocessing/actions/workflows/lint.yml)
[![Build](https://github.com/eagletrt/telemetria-postprocessing/actions/workflows/build.yml/badge.svg)](https://github.com/eagletrt/telemetria-postprocessing/actions/workflows/build.yml)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/npm/l/@eagletrt/telemetria-postprocessing.svg)](https://github.com/eagletrt/telemetria-postprocessing/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/@eagletrt/telemetria-postprocessing.svg)](https://www.npmjs.com/package/@eagletrt/telemetria-postprocessing)

# eagletrt-telemetria-postprocessing
Postprocess the raw can and gps log of the telemetry of [@eagletrt](https://www.github.com/eagletrt).

## Project purpose

This project is an **npm** package made for the **telemetry** of eagletrt. The telemetry consists in a **c program** located in a **Raspberry Pi** and attached to the canbus of the car and to a rover-gps. Its job is reading all the sensors **messages**, forwarding them via mqtt and saving them in a local mongodb database. Some **can** and **gps** raw **logs** are also saved by the telemetry. The purpose of this project is having a tool that given those **raw logs**, obtains the **parsed json** or **csv**, with the same parsing system of the telemetry.

## How it was made

This project was made with **typescript** and consists in an npm module that can be used also **globally**, as a terminal command. It is linted with **eslint**, bundled with **webpack**, documented with **typedoc** and checked by some **github actions**.

## How does it work

The library gets as inputs a **can** and/or **gps** raw log. It parses all the lines of both files and computes internally all the parsed messages. After that, it just creates the desidered output file, which could be a **csv**, a **json** or a **test file** that can be added to the telemetry test suites.

## How to use it

This module can be actually used both as a **local** and as a **global** npm module.

### As a local module

Install the module executing:

```bash
$ npm install --save @eagletrt/telemetria-postprocessing
```

Running this script:

```javascript
const postProcessor = require('@eagletrt/telemetria-postprocessing');

postProcessor.processLogsToCsv('./can.log', './gps.log', './myResultPath');
postProcessor.processLogsToJson('./can.log', './gps.log', './myResultPath');
postProcessor.processLogsForTest('./can.log', './gps.log', './myResultPath');
```


To see all the options, refer to the **api**.

### As a global module

Install the module with:

```bash
$ npm install -g @eagletrt/telemetria-postprocessing
```

Executing:

```bash
$ eagletrt-process csv --can can.log --gps gps.log --out myResultFileName
$ eagletrt-process json --can can.log --gps gps.log --out myResultFileName
$ eagletrt-process test --can can.log --gps gps.log --out myResultFileName
```

Will have the same results as the examples with the local module.

The options are almost the same as in the **api** of the local module. To see all the cli options, run:

```bash
$ eagletrt-process --help
```

## API

### processLogsToCsv

**Syntax:**

`processLogsToCsv(canLogPath, gpsLogPath, outputPath, throwError)`

**Description:**

Generate csv files from a can and/or gps log. The result will be a folder with a csv file for each message.

**Parameters:**

* __canLogPath__: The path to the can log file that you want to parse. It can be `null`.
* __gpsLogPath__: The path to the gps log file that you want to parse. It can be `null`.* __configModel__: Optional. The path to the json file containing the config model, used by generators to dynamically generate code about the config parser. The default is `config.model.json`.
* __outputLogPath__: The path to the output file that will be generated. The default value is `result`. Note that you do not have to specify the file extension because it depends by the function.
* __throwError__: If a strict error handling will be used, for instance if a line is corrupted the function will throw an error. The default value is `false`.

### processLogsToJson

**Syntax:**

`processLogsToJson(canLogPath, gpsLogPath, outputPath, throwError)`

**Description:**

Generate a json file from a can and/or gps log.

**Parameters:**

* __canLogPath__: The path to the can log file that you want to parse. It can be `null`.
* __gpsLogPath__: The path to the gps log file that you want to parse. It can be `null`.* __configModel__: Optional. The path to the json file containing the config model, used by generators to dynamically generate code about the config parser. The default is `config.model.json`.
* __outputLogPath__: The path to the output file that will be generated. The default value is `result`. Note that you do not have to specify the file extension because it depends by the function.
* __throwError__: If a strict error handling will be used, for instance if a line is corrupted the function will throw an error. The default value is `false`.

### processLogsForTest

**Syntax:**

`processLogsForTest(canLogPath, gpsLogPath, outputPath, throwError)`

**Description:**

Generate a json testing file from a can and/or gps log. It is used for the "general tests suites of the telemetry", when it simulates some can and/or gps logs and needs a `.expected.json` file with the expected results.

**Parameters:**

* __canLogPath__: The path to the can log file that you want to parse. It can be `null`.
* __gpsLogPath__: The path to the gps log file that you want to parse. It can be `null`.* __configModel__: Optional. The path to the json file containing the config model, used by generators to dynamically generate code about the config parser. The default is `config.model.json`.
* __outputLogPath__: The path to the output file that will be generated. The default value is `result`. Note that you do not have to specify the file extension because it depends by the function.
* __throwError__: If a strict error handling will be used, for instance if a line is corrupted the function will throw an error. The default value is `false`.

## Where was it used

This module was used in the telemetry sender [repo](https://github.com/eagletrt/telemetria-sender) of eagletrt.

## Build

To build for production, using webpack:

```bash
npm run bundle
```
