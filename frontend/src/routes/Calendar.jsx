import { useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { useTranslation } from 'react-i18next'
import AltHeader from '../components/Reusables/Headers/AltHeader/AltHeader.jsx'
import CalendarScheduler from '../components/Pages/Calendar/CalendarScheduler.jsx'
import { getStaffSessions } from '../api/calendar.js'

export default function CalendarPage() {
  const { userInfo } = useContext(AuthContext)
  const { t, i18n } = useTranslation('calendar')

  const isAuthenticated = true

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Convert your backend session format → FullCalendar format
const adaptEvent = useCallback((s) => {
  const start = new Date(`${s.session_date}T${s.start_time}:00`);
  const end = new Date(start.getTime() + s.actual_duration_minutes * 60000);

  return {
    id: String(s.session_id),
    title: s.lesson_title,
    start: start.toISOString(),
    end: end.toISOString(),

    // Force a block-style event so background fills in dayGridMonth
    display: 'block',

    backgroundColor: s.staff_role_in_session === "Lead" ? "#38b000" : "#0077cc",
    borderColor: s.staff_role_in_session === "Lead" ? "#2d8600" : "#005fa3",
    textColor: "white",

    extendedProps: {
      cohort: s.cohort_id,
      sessionType: s.session_type,
      staffRole: s.staff_role_in_session,
      location: s.city_name
    }
  };
}, []);

  // Fetch sessions from API
  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    (async () => {
      setLoading(true)
      setError(null)

      const { success, data, error } = await getStaffSessions(76)

      if (cancelled) return;

      if (!success) {
        setError(error)
        setEvents([])
      } else {
        const items = Array.isArray(data) ? data : []
        setEvents(items.map(adaptEvent))
      }

      setLoading(false)
    })()

    return () => { cancelled = true }
  }, [isAuthenticated, userInfo?.id, adaptEvent])

  // Handlers unchanged
  const handleDateClick = (info) => console.log("dateClick:", info.dateStr)

  const handleEventClick = ({ event }) => {
    console.log("eventClick:", {
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      ...event.extendedProps,
    });
  }

  const handleSelect = (info) => {
    console.log("select:", info.startStr, info.endStr)
  }

  const handleEventAdd = (info) => console.log("eventAdd:", info.event.toPlainObject())

  const handleEventChange = (info) => {
    console.log("eventChange:", info.event.id, info.event.startStr)
  }

  const locale = useMemo(() => i18n.language || "en", [i18n.language])

  return (
    <div className="bg-light-primary">
      <AltHeader />
      <div className="p-4">
        <h1 className="text-[18px] font-fun font-semibold">Calendar</h1>
        <p className="text-text-secondary text-[14px] font-primary">Displaying Calendar</p>
        <hr className="border-[#A5A5A5] my-2" />

        {!isAuthenticated && (
          <p className="font-primary">{t("loginMessage")}</p>
        )}

        {isAuthenticated && (
          <div className="flex flex-col">

            {loading && <p>Loading sessions…</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
            
            <div className="flex gap-4 my-4 items-center">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: "#38b000", border: "1px solid #2d8600" }}
                ></span>
                <span className="text-sm text-gray-700">Lead Session</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: "#0077cc", border: "1px solid #005fa3" }}
                ></span>
                <span className="text-sm text-gray-700">Supporting Session</span>
              </div>
            </div>

            <CalendarScheduler
              events={events}
              locale={locale}
              initialView="dayGridMonth"
              height="auto"
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
              onSelect={handleSelect}
              onEventAdd={handleEventAdd}
              onEventChange={handleEventChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}