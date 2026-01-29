// src/components/CalendarScheduler.jsx
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// If you prefer keeping styles local to this component instead of index.css,
// uncomment these two lines and remove the imports from index.css:
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

function renderEventContent(eventInfo) {
  const { title, extendedProps } = eventInfo.event;
  const {  sessionType, cohort, location } = extendedProps || {};

  return (
    <div className="whitespace-normal break-words leading-tight">
      <div className="font-semibold">{title}</div>

      {/* Optional: keep location if you add it later */}
      {location && (
        <div className="text-xs opacity-80">
          📍 {location}
        </div>
      )}

      {/* Show session type */}
      {sessionType && (
        <div className="text-xs opacity-80">
          Session Type: {sessionType}
        </div>
      )}

      {/* Show cohort */}
      {typeof cohort !== 'undefined' && cohort !== null && (
        <div className="text-[11px] opacity-70">
          Cohort: {cohort}
        </div>
      )}

    </div>
  );
}

/**
 * Reusable calendar with month/week/day views, DnD, and basic hooks.
 *
 * Props:
 * - events: [{ id, title, start, end, allDay, extendedProps }]
 * - locale: string (e.g., 'en', 'en-GB', 'fr')
 * - initialView: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'
 * - height: number | 'auto'
 * - onDateClick(dateInfo)     // day cell click
 * - onEventClick(clickInfo)   // event click
 * - onSelect(selectInfo)      // drag-select range
 * - onEventAdd(addInfo)       // when an event is added programmatically
 * - onEventChange(changeInfo) // when event is moved/resized
 */
export default function CalendarScheduler({
  events,
  locale = 'en',
  initialView = 'dayGridMonth',
  height = 'auto',
  onDateClick,
  onEventClick,
  onSelect,
  onEventAdd,
  onEventChange,
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initialView}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}  
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        height={height}
        locale={locale}
        weekends={true}
        dayMaxEvents={true}
        navLinks={true} // click day/week names to navigate
        nowIndicator={true}
        events={events}
        eventContent={renderEventContent}
        // Interactions
        dateClick={onDateClick}
        eventClick={onEventClick}
        selectable={true}
        selectMirror={true}
        select={onSelect}
        // Drag & drop / resize
        editable={true}
        eventAdd={onEventAdd}
        eventChange={onEventChange}
      />
    </div>
  )
}

CalendarScheduler.propTypes = {
  events: PropTypes.array,
  locale: PropTypes.string,
  initialView: PropTypes.oneOf(['dayGridMonth', 'timeGridWeek', 'timeGridDay']),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onDateClick: PropTypes.func,
  onEventClick: PropTypes.func,
  onSelect: PropTypes.func,
  onEventAdd: PropTypes.func,
  onEventChange: PropTypes.func,
}


