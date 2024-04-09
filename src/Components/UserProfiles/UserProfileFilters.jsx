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
          <div className='filterBox' id='filterBox' onClick={(e) => {
              console.log(document.getElementsByClassName('filterBoxData')[0])
              document.getElementsByClassName('filterBoxData')[0].classList.toggle('showfilterBoxData')
          }} >
              Person: <span>{value}</span> <i class="fas fa-caret-down"></i>
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
                   {d}
                  </div>
              ))}
          </div>
     </div>
      
  )
}

export default UserProfileFilters