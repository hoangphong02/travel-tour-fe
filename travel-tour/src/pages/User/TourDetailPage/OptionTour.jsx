import React, { useState } from 'react'
import ProgramTour from './ProgramTour'
import Editor from '~/components/common/Editor'
import TablePriceTour from './TablePriceTour';
import InfomationTour from './InfomationTour';
import OverviewTour from './OverviewTour';
import RequireTour from './RequireTour';
import PictureTour from './PictureTour';

const OptionTour = ({ option, setOption }) => {
  // const [value, setValue] = useState('');

  return (
    <div className='option-tour'>
      {
        option === 'program' ? (
          <ProgramTour />
        ): null
      }
      {
        option === 'priceTable' ? (
          <TablePriceTour />
        ): null
      }
      {
        option === 'information' ? (
          <InfomationTour />
        ): null
      }
      {
        option === 'overview' ? (
          <OverviewTour />
        ): null
      }
      {
        option === 'require' ? (
          <RequireTour />
        ): null
      }
       {
        option === 'picture' ? (
          <PictureTour />
        ): null
      }
      {/* <Editor value={value} setValue={setValue}/> */}
    </div>
  )
}

export default OptionTour