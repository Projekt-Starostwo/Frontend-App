// MyContext.js
'use client'

import React, { createContext, useState, useContext } from 'react'

const MyContext = createContext()

export const EnvProvider = ({ children }) => {
  const [cmsUrl, setCmsUrl] = useState('')

  const updateCmsUrl = (newCmsUrl) => {
    setCmsUrl(newCmsUrl)
  }
  const contextValue = {
    cmsUrl,
    updateCmsUrl,
  }

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
}

export const useEnv = () => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider')
  }
  return context
}
