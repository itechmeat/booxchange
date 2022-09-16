import { useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '.'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useCreatableSelector = <R extends any, S extends (...p: any[]) => R>(
  creator: () => S,
  predicate: (state: RootState, param: S) => R,
): R => {
  const selector = useMemo(creator, [creator])
  return useAppSelector((state) => predicate(state, selector))
}
