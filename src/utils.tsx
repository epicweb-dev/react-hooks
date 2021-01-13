import {useState, useRef, useEffect} from 'react'
import type {Dispatch, SetStateAction} from 'react'

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

interface JSONStrategies {
  serialize: typeof JSON.stringify
  deserialize: <S>(text: string) => S & typeof JSON.parse
}

export const useLocalStorageState = <K extends string, S>(
  key: K,
  initialState: S | (() => S),
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: JSONStrategies = {} as JSONStrategies,
): readonly [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage: null | string = globalThis.localStorage.getItem(
      key,
    )

    if (valueInLocalStorage) {
      try {
        return deserialize<S>(valueInLocalStorage)
      } catch (error) {
        globalThis.localStorage.removeItem(key)
      }
    }

    return typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState
  })

  const prevKeyRef = useRef(key)
  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      globalThis.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    globalThis.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])
  return [state, setState] as const
}
