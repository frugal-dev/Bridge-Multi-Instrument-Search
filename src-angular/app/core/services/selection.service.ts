import { EventEmitter, Injectable } from '@angular/core'

import { SearchResult } from '../../../../src-shared/interfaces/search.interface'
import { SearchService } from './search.service'

// Note: this class prevents event cycles by only emitting events if the checkbox changes

@Injectable({
	providedIn: 'root',
})
export class SelectionService {

	private searchResults: Partial<SearchResult>

	private selectAllChangedEmitter = new EventEmitter<boolean>()
	private selectionChangedCallbacks: { [songID: number]: (selection: boolean) => void } = {}

	private allSelected = false
	private selections: { [songID: number]: boolean | undefined } = {}

	constructor(searchService: SearchService) {
		searchService.searchUpdated.subscribe(results => {
			this.searchResults = results
			if (this.allSelected) {
				this.selectAll() // Select newly added rows if allSelected
			}
		})

		searchService.searchUpdated.subscribe(results => {
			this.searchResults = results
			this.selectionChangedCallbacks = {}
			this.selections = {}
			this.selectAllChangedEmitter.emit(false)
		})
	}

	getSelectedResults() {
		// TODO
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return [] as any[] // this.searchResults.filter(result => this.selections[result.id] === true)
	}

	onSelectAllChanged(callback: (selected: boolean) => void) {
		this.selectAllChangedEmitter.subscribe(callback)
	}

	/**
	 * Emits an event when the selection for `songID` needs to change.
	 * (note: only one emitter can be registered per `songID`)
	 */
	onSelectionChanged(songID: number, callback: (selection: boolean) => void) {
		this.selectionChangedCallbacks[songID] = callback
	}


	deselectAll() {
		if (this.allSelected) {
			this.allSelected = false
			this.selectAllChangedEmitter.emit(false)
		}

		// TODO
		// setTimeout(() => this.searchResults.forEach(result => this.deselectSong(result.id)), 0)
	}

	selectAll() {
		if (!this.allSelected) {
			this.allSelected = true
			this.selectAllChangedEmitter.emit(true)
		}

		// TODO
		// setTimeout(() => this.searchResults.forEach(result => this.selectSong(result.id)), 0)
	}

	deselectSong(songID: number) {
		if (this.selections[songID]) {
			this.selections[songID] = false
			this.selectionChangedCallbacks[songID](false)
		}
	}

	selectSong(songID: number) {
		if (!this.selections[songID]) {
			this.selections[songID] = true
			this.selectionChangedCallbacks[songID](true)
		}
	}
}
