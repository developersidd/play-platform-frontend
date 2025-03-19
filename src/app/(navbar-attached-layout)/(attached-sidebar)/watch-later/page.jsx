import React from 'react'
import WatchLaterSidebar from './_components/WatchLaterSidebar'
import WatchLaterVideoList from './_components/WatchLaterVideoList'

const WatchLaterPage = async () => {
  
  // decide what to render
  let content;
  return (
    <div>
      <WatchLaterSidebar />
      <WatchLaterVideoList />
    </div>
  )
}

export default WatchLaterPage