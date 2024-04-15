import React, { useEffect, useRef } from 'react'

const UserProfileFilters = ({ setValue, data, value }) => {

    const filterBoxDataRef = useRef(null);
    const handleClickOutside = (event) => {
        if (
            filterBoxDataRef.current &&
            !filterBoxDataRef.current.contains(event.target) &&
            event.target.id !== "filterBox" 
        ) {
            document.getElementsByClassName('filterBoxData')[0].classList.remove('showfilterBoxData')

        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
  return (
      <div style={{position: 'relative'}}>
          <div onClick={(e) => {
              console.log(document.getElementsByClassName('filterBoxData')[0])
              document.getElementsByClassName('filterBoxData')[0].classList.toggle('showfilterBoxData')
          }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='filterBox'>
              <div  id='filterBox' >
                  Person: <span>{value}</span>
              </div>
              <div><i class="fas fa-caret-down"></i></div>
         </div>
          <div className='filterBoxData' style={{ display: 'none', cursor: 'pointer' }} ref={filterBoxDataRef}>
              <div onClick={(e) => {
                  setValue('')
                  document.getElementsByClassName('filterBoxData')[0].classList.remove('showfilterBoxData')
              }}>
                  All
              </div>
              {data.map(d => (
                  <div onClick={(e) => {
                      setValue(d)
                      document.getElementsByClassName('filterBoxData')[0].classList.remove('showfilterBoxData')
                  }}>
                      <span style={{ whiteSpace: 'nowrap', width: '80px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{d}</span>
                  </div>
              ))}
          </div>
     </div>
      
  )
}

export default UserProfileFilters