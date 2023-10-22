import { Mapper, MapperP } from '../utils/Mapper'

export type Updater<State> = Mapper<State, Partial<State>>

export type UpdaterP<State> = MapperP<State, Partial<State>>
