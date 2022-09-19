import { FC, ReactNode, useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { fetchCountries } from '../store/slices/countries'
import { fetchCurrancies } from '../store/slices/currancies'
import { fetchLanguage } from '../store/slices/languages'

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
    dispatch(fetchCurrancies())
    dispatch(fetchLanguage())
  }, [dispatch])
  
  return <>{children}</>
}
