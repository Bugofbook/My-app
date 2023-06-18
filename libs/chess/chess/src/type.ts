/**
 * name of chess
 * @typedef {String} ChessName
 */
export type ChessName = string


export type ChessBasic<Type extends Record<string, unknown>> = {name: ChessName } | Partial<Type> & {name: ChessName }

/**
 * location of chess
 * @typedef {Array<number>} ChessLocation
 */
export type ChessLocation = Array<number>
/**
 * location of chess
 * @typedef {String} ChessLocationString
 */
export type ChessLocationString = `${number},${number}`

/**
 * setting of Chess for Squares
 * @typedef {Object} ChessSet
 * @property {ChessName} name name of chess
 * @property {ChessLocation} from location of chess
 * @property {ChessLocation} to location of chess
 * @property {String} action action of chess
 */
export type ChessSet<Type extends Record<string, unknown>> = ChessBasic<Type> & {
  id: string,
  owner: string,
  from?: ChessLocation,
  to: ChessLocation,
  action?: string,
}
/**
 * info of chess
 * @typedef {Object} ChessInfo
 * @property {ChessName} name name of chess
 * @property {String} owner owner of chess
 */
export type ChessInfo<Type extends Record<string, unknown>> = ChessBasic<Type> & {
  id: string,
  owner: string,
  location: ChessLocation,
}

/**
 * Squares of chess
 * @typedef {Map<string, ChessInfo>} Squares
 */
export type Squares<Type extends Record<string, unknown> = Record<string, never>> = Map<string, ChessInfo<Type> | null>
export type Vector = [number, number]
