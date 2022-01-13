import React from 'react'

const Filter = (props) => {
  const { 
    filter, 
    filterType, 
    handleFilterChange,
    placeholder
  } = props

  return(
    <>
      Filer by {filterType}{' '} 
      <input 
        type="text" 
        value={filter} 
        onChange={handleFilterChange}
        placeholder={placeholder}
      />
    </>
  )

}

export default Filter