import { merge } from 'remeda'
import { Updater } from './Updater'

export const fromUpdaterToMutator = <State>(updater: Updater<State>) => (state: State) => merge(state, updater(state))
