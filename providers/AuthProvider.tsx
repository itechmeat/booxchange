import { FC, ReactNode, useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { fetchUser } from '../store/slices/user'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  
  return <>{children}</>
}
