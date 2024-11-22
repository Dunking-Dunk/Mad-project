'use client'

import { Provider } from "react-redux"
import React from 'react'
import store from '@/store/store'

const StateProvider = ({ children }: {
    children: React.ReactNode
}) => {
    return <Provider store={store}>
        {children}
    </Provider>
}

export default StateProvider