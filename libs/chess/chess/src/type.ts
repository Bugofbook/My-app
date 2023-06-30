/**
 * name of chess
 * @typedef {String} ChessName
 */
export type ChessName = string
type ChessBasicConfig = {
  name: string,
}
export type ChessBasic<Option = undefined> = Option extends undefined ? ChessBasicConfig : ChessBasicConfig & {option: Option}

/**
 * location of chess
 * @typedef {Array<number>} ChessLocation
 */
export type ChessLocation = Array<number>

type ChessSetConfig = {
  id: string,
  owner: string,
  from: ChessLocation | null,
  to: ChessLocation | null,
}
/**
 * setting of Chess for Squares
 * @typedef {Object} ChessSet
 * @property {ChessName} name name of chess
 * @property {ChessLocation} from location of chess
 * @property {ChessLocation} to location of chess
 * @property {String} action action of chess
 */
export type ChessSet<Option = undefined> = Option extends undefined ? ChessBasic & ChessSetConfig : ChessBasic<Option> & ChessSetConfig
// export type ChessSet<Option = undefined> = Option extends undefined ? ChessBasic & ChessSetConfig : ChessBasic<Option> & ChessSetConfig

// export type EmptyChessInfo = {
//   id: string,
//   owner: '',
//   location: ChessLocation,
//   name: '',
// }
/**
 * info of chess
 * @typedef {Object} ChessInfo
 * @property {ChessName} name name of chess
 * @property {String} owner owner of chess
 */
// export type ChessInfo<Type = undefined> = ChessBasic<Type> & {
//   id: string,
//   owner: string,
//   location: ChessLocation,
// }

/**
 * Squares of chess
 * @typedef {Map<string, ChessSet>} Squares
 */
export type Squares<Type = undefined> = Map<string, ChessSet<Type> | null>
export type EmptyChessSet = {
  id: string,
  owner: '',
  from: null,
  to: null,
  name: '',
}
export type Vector = [number, number]
