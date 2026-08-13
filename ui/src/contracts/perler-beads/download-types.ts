/** Perler-beads download options — the data boundary the package's download
 * settings modal edits and the app's download handler consumes. */
export type GridDownloadOptions = {
  showGrid: boolean;
  gridInterval: number;
  showCoordinates: boolean;
  showCellNumbers: boolean;
  gridLineColor: string;
  includeStats: boolean;
  exportCsv: boolean;
}
