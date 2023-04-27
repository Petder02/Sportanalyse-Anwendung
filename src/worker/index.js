import * as Comlink from 'comlink'
/* eslint-disable import/no-webpack-loader-syntax */
import Worker from 'worker-loader!./worker'

let parsingWorker // = new Worker()

export function parseDatasetInWorker(data, dataTypes, parsingOptions) {
  // TODO: Check lazy loading vs terminate on each time
  // I changed this line, since it appears that this was causing the infinite
  // loading bug in our case. Not exactly sure why. Basically I am creating a new
  // service worker for parsing the data each time data is reuploaded. It might
  // be memory inefficient, but it functions.
  parsingWorker = new Worker()
  let obj = Comlink.wrap(parsingWorker)
  let out = obj.parseDataset(data, dataTypes, parsingOptions)
  return out
}

let mappingWorker // = new Worker()

export function mapDataInWorker(
  chartName,
  { data, mapping, visualOptions, dataTypes },
  customChart
) {
  // TODO: Check lazy loading vs terminate on each time
  if (!mappingWorker) {
    mappingWorker = new Worker()
  }
  let obj = Comlink.wrap(mappingWorker)
  let out = obj.mapData(
    chartName,
    { data, mapping, visualOptions, dataTypes },
    customChart
  )
  return out
}
