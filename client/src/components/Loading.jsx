import React from 'react'
import ReactLoading from "react-loading";

const Loading = () => {
    return (
    <div className="mt-20 flex justify-center">
      <ReactLoading type="spin" color="#FFFFFF" height={200} width={200} />
    </div>
    )
}

export default Loading