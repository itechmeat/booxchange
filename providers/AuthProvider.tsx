import { FC, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchUser, fetchProfile } from '../store/slices/user'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, profile } = useAppSelector((state) => state.user)  

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  
  useEffect(() => {
    if (router.pathname.startsWith('/auth/') && user) {
      router.push('/')
    }
  }, [router, user])
  
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProfile(user.id))
    }
  }, [dispatch, user])
  
  return <>{children}</>
}
