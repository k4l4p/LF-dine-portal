import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

interface ICalendarButton {
    date: Date
    setDate: React.Dispatch<React.SetStateAction<Date>>
  
}

const CalendarButton = ({date, setDate}: ICalendarButton) => {
    return (
        <div className="relative w-full">
        <h6 className="absolute top-[7.5px] left-[16px] text-[10px] font-bold leading-[13px]">
          Mint Date
        </h6>
                
        <Popover className="">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className='w-full rounded-2xl border border-[#E1E1E1] bg-white px-4 pt-[24.5px] pb-[7.5px] text-[14px] font-bold leading-[18px] flex'
                        >
                            <span>{date.toDateString()}</span>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                <Calendar onChange={setDate} value={date} onClickDay={() => {close()}}/>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
      </div>
    )
}

export default CalendarButton
