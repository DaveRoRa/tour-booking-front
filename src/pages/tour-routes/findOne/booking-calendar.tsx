import {
  AppBar,
  Button,
  Card,
  DialogContent,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { DateCalendar } from "@mui/x-date-pickers"
import { useState } from "react"
import Dialog from "../../../components/dialog"
import type { Moment } from "moment"
import moment from "moment"
import { useNavigate, useParams } from "react-router-dom"
import { dateTranslationsJsonMap } from "../../../utils/constants"
import { searchWithSameCase } from "../../../utils/miriad"
import type { BookingType } from "../../../app/bookings-api-slice"
import { useGetBookingsByMonthQuery } from "../../../app/bookings-api-slice"
type BookingCalendarProps = {
  availableTimes: string[]
}

type BookingAvailabilityProps = BookingCalendarProps & {
  selectedDate: Moment
  onChange: (newDate: Moment) => void
}

const remainingTimes = (
  currentDate: Moment,
  data: BookingType[],
  availableTimes: string[],
) => {
  const bookings_for_current_day = data.filter(
    item =>
      moment(item.booking_date).format("YYYY-MM-DD") ===
      currentDate.format("YYYY-MM-DD"),
  )
  const bookings_times = bookings_for_current_day.map(item => item.booking_time)
  const remaining_available_times = availableTimes.filter(
    available_time => !bookings_times.includes(available_time),
  )
  return remaining_available_times
}

const BookingAvailabilityCalendar = ({
  inDialog,
  availableTimes,
  onChange,
  selectedDate,
}: BookingAvailabilityProps & { inDialog?: boolean }) => {
  const { id } = useParams()
  const { data, status } = useGetBookingsByMonthQuery({
    tour_route_id: id!,
    initialDate: moment().format("YYYY-MM-DD"),
  })
  const navigate = useNavigate()
  const handleSelectTime = (time: string) =>
    navigate(
      `/bookings/create/${id}/${selectedDate.format("YYYY-MM-DD")}/${time.slice(0, 5)}`,
    )

  return (
    <Stack position="sticky" top={20} height="fit-content" width={324}>
      <Stack
        sx={{
          p: 3,
          pt: inDialog ? 0 : 3,
          borderRadius: 4,
          backgroundColor: ({ palette }) => palette.grey[100],
        }}
      >
        {!inDialog && (
          <Typography
            fontSize={22}
            fontWeight={700}
            color={({ palette }) => palette.grey[800]}
          >
            ¿Cuándo quieres ir?
          </Typography>
        )}
        <DateCalendar
          onChange={onChange}
          value={selectedDate}
          sx={{ ml: -2.5 }}
          dayOfWeekFormatter={date =>
            searchWithSameCase(date.format("dddd"), dateTranslationsJsonMap)[0]
          }
          disablePast
          shouldDisableDate={
            data
              ? day => {
                  const remaining_available_times = remainingTimes(
                    day,
                    data,
                    availableTimes,
                  )
                  return !remaining_available_times.length
                }
              : undefined
          }
        />
      </Stack>
      <Card sx={{ p: 3, borderRadius: 4, mt: -4 }}>
        <Typography
          fontSize={inDialog ? 18 : 22}
          fontWeight={700}
          color={({ palette }) => palette.grey[800]}
        >
          Dom, 6 oct. 2024
        </Typography>
        {!!data && (
          <Stack mt={2} gap={2} direction="row" flexWrap="wrap">
            {remainingTimes(selectedDate, data, availableTimes).map(time => (
              <Button
                key={time}
                variant="outlined"
                color="info"
                onClick={() => handleSelectTime(time)}
                sx={{
                  borderRadius: 8,
                  fontSize: 16,
                  color: ({ palette }) => palette.grey[800],
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                }}
              >
                {time.slice(0, 5)}
              </Button>
            ))}
          </Stack>
        )}
      </Card>
    </Stack>
  )
}

const BookingAvailabilityCalendarDialog = ({
  availableTimes,
  onChange,
  selectedDate,
}: BookingAvailabilityProps) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isBtwSmMd = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Dialog open={open} onClose={handleClose} title="¿Cuándo quieres ir?">
        <DialogContent sx={{ p: 0 }}>
          <BookingAvailabilityCalendar
            inDialog
            availableTimes={availableTimes}
            onChange={onChange}
            selectedDate={selectedDate}
          />
        </DialogContent>
      </Dialog>
      <AppBar
        sx={{
          top: "auto",
          bottom: isBtwSmMd ? 0 : 50,
          boxShadow: "0px -7px 23px -23px rgba(0,0,0,0.75)",
        }}
      >
        <Toolbar>
          <Button
            onClick={handleOpen}
            sx={{ fontSize: 18, m: 2 }}
            fullWidth
            variant="contained"
          >
            Ver disponibilidad
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

const BookingCalendar = ({ availableTimes = [] }: BookingCalendarProps) => {
  const theme = useTheme()
  const [selectedDate, setSelectedDate] = useState(moment())
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"))

  const handleDateChange = (newDate: Moment) => setSelectedDate(newDate)

  if (isUpMd) {
    return (
      <BookingAvailabilityCalendar
        availableTimes={availableTimes}
        onChange={handleDateChange}
        selectedDate={selectedDate}
      />
    )
  }
  return (
    <BookingAvailabilityCalendarDialog
      onChange={handleDateChange}
      selectedDate={selectedDate}
      availableTimes={availableTimes}
    />
  )
}

export default BookingCalendar
