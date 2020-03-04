/**
 * The image data for a song's album art.
 */
export interface AlbumArtResult {
  art: Buffer
}

/**
 * Represents a single chart version.
 */
export interface VersionResult {
  versionID: number
  chartID: number
  songID: number
  latestVersionID: number
  latestSetlistVersionID: number
  icon: string
  name: string
  avTagName: string
  charters: string
  charterIDs: string
  tags: string | null
  downloadLink: string
  lastModified: number
  song_length: number
  diff_band: number
  diff_guitar: number
  diff_rhythm: number
  diff_bass: number
  diff_drums: number
  diff_keys: number
  diff_guitarghl: number
  diff_bassghl: number
  songDataIncorrect: boolean
  isUnusualAvTagName: boolean
}