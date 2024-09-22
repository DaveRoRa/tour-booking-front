import { Stack, Typography } from "@mui/material"

type TourCardProp = {
  id: number
  title: string
  duration: number
  pictures: string
}

const TourCard = ({ title, pictures, duration }: TourCardProp) => {
  return (
    <Stack
      minHeight={200}
      borderRadius={1}
      p={1}
      sx={{
        cursor: "pointer",
        boxShadow: ({ shadows }) => shadows[4],
        "&:hover": { boxShadow: ({ shadows }) => shadows[6] },
      }}
    >
      <Stack width="100%" position="relative" height={120}>
        <Stack
          position="absolute"
          width="100%"
          height="100%"
          overflow="hidden"
          borderRadius={1}
        >
          <img
            style={{
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            src={pictures}
            alt={title}
          />
        </Stack>
      </Stack>
      <Typography
        fontWeight={600}
        color={({ palette }) => palette.grey[800]}
        mt={1.5}
        variant="subtitle1"
      >
        {title}
      </Typography>
      <Stack mt={1}>
        <Typography
          sx={{ backgroundColor: ({ palette }) => palette.secondary.main }}
          variant="subtitle2"
          component="span"
          width="fit-content"
          color="white"
          py={0.4}
          px={1}
          borderRadius={1}
          fontWeight={700}
        >
          {duration} minutos
        </Typography>
      </Stack>
    </Stack>
  )
}

export default TourCard
