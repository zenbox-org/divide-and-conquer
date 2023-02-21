import { Mapper, MapperP } from '../generic/models/Mapper'

export type Updater<State> = Mapper<State, Partial<State>>

export type UpdaterP<State> = MapperP<State, Partial<State>>
