import React, { useState } from 'react'
import ProgramTour from './ProgramTour'
import Editor from '~/components/common/Editor'

const OptionTour = () => {
  const [value, setValue] = useState('');
  return (
    <div className='option-tour'>
      <ProgramTour />
      <Editor value={value} setValue={setValue}/>
    </div>
  )
}

export default OptionTour