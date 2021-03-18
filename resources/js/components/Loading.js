import React from 'react'

const Loading = (props) => (
    <div className={'container ' + (props.isVisible ? '' : 'd-none')}>
      <img src="images/loading.gif" />
    </div>
)

export default Loading