import React, { createContext, useContext, useState } from 'react'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(false)
    // const setValues = (values) => {
    //     setData((prevData) => ({ ...prevData, ...values }))
    // }

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
