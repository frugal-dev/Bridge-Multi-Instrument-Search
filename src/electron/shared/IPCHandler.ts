import { SongSearch, SongResult } from './interfaces/search.interface'
import { VersionResult, AlbumArtResult } from './interfaces/songDetails.interface'
import SearchHandler from '../ipc/SearchHandler.ipc'
import SongDetailsHandler from '../ipc/SongDetailsHandler.ipc'
import AlbumArtHandler from '../ipc/AlbumArtHandler.ipc'
import { Download, DownloadProgress } from './interfaces/download.interface'
import { DownloadHandler } from '../ipc/download/DownloadHandler'
import { Settings } from './Settings'
import BatchSongDetailsHandler from '../ipc/BatchSongDetailsHandler.ipc'
import { GetSettingsHandler, SetSettingsHandler } from '../ipc/SettingsHandler.ipc'

/**
 * To add a new IPC listener:
 * 1.) Write input/output interfaces
 * 2.) Add the event to IPCEvents
 * 3.) Write a class that implements IPCHandler
 * 4.) Add the class to getIPCHandlers
 */

export function getIPCInvokeHandlers(): IPCInvokeHandler<keyof IPCInvokeEvents>[] {
  return [
    new GetSettingsHandler(),
    new SearchHandler(),
    new SongDetailsHandler(),
    new BatchSongDetailsHandler(),
    new AlbumArtHandler()
  ]
}

/**
 * The list of possible async IPC events that return values, mapped to their input and output types.
 */
export type IPCInvokeEvents = {
  'get-settings': {
    input: undefined
    output: Settings
  }
  'song-search': {
    input: SongSearch
    output: SongResult[]
  }
  'album-art': {
    input: SongResult['id']
    output: AlbumArtResult
  }
  'song-details': {
    input: SongResult['id']
    output: VersionResult[]
  }
  'batch-song-details': {
    input: number[]
    output: VersionResult[]
  }
}

/**
 * Describes an object that handles the `E` async IPC event that will return a value.
 */
export interface IPCInvokeHandler<E extends keyof IPCInvokeEvents> {
  event: E
  handler(data: IPCInvokeEvents[E]['input']): Promise<IPCInvokeEvents[E]['output']> | IPCInvokeEvents[E]['output']
}


export function getIPCEmitHandlers(): IPCEmitHandler<keyof IPCEmitEvents>[] {
  return [
    new DownloadHandler(),
    new SetSettingsHandler()
  ]
}

/**
 * The list of possible async IPC events that don't return values, mapped to their input types.
 */
export type IPCEmitEvents = {
  'download': Download
  'download-updated': DownloadProgress
  'set-settings': Settings
}

/**
 * Describes an object that handles the `E` async IPC event that will not return a value.
 */
export interface IPCEmitHandler<E extends keyof IPCEmitEvents> {
  event: E
  handler(data: IPCEmitEvents[E]): void
}