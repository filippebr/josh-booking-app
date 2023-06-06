import { useState } from 'react'
import ReactCalendar from 'react-calendar'

interface DateType {
  justDate: Date | null
  dateTime: Date | null
}

export function Calendar() {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  })

  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      {date.justDate ? (
        <div></div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="REACT-CALENDAR p-2"
          view="month"
          onClickDay={(date) => console.log(date)}
        />
      )}
    </div>
  )
}
