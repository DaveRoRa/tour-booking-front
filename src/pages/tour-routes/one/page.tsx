/*import { Stack } from "@mui/material"
import { useGetTourRouteByIdQuery } from "../../../app/tour-routers-api-slice"
import { useParams } from "react-router-dom"

const OneTourRoutePage = () => {
  const { id } = useParams()
  const { data, status } = useGetTourRouteByIdQuery(id!)
  if (status === "pending") {
    return "Loading..."
  }
  if (status === "rejected") {
    return "Error..."
  }

  return <Stack>{JSON.stringify(data)}</Stack>
}

export default OneTourRoutePage */





import React from 'react';
import { Stack, Card, CardMedia, CardContent, Typography, Divider, Avatar, Chip, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalendarToday, AccessTime, Person, CheckCircle, LocationOn } from '@mui/icons-material';
import { useGetTourRouteByIdQuery } from "../../../app/tour-routers-api-slice";
import { useParams } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  width: 600,
  borderRadius: 10,
  boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  overflow: 'visible',
  position: 'relative',
  marginLeft: 10,
}));

const StyledCardMedia = styled(CardMedia)({
  gridRow: '1 / 3',
  height: 170,
  borderRadius: 10,
});

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const InfoItem = ({ icon, text }) => (
  <Box display="flex" alignItems="center" gap={1}>
    {icon}
    <Typography variant="body2" color="text.secondary">{text}</Typography>
  </Box>
);

const ConfirmedBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: -10,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '5px 10px',
  borderRadius: 3,
  fontSize: 12,
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  zIndex: 1,
}));

const ButtonsContainer = styled(Box)({
  gridColumn: '1 / 3',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  padding: 15,
});

const OneTourRoutePage = () => {
  const { id } = useParams();
  const { data, status } = useGetTourRouteByIdQuery(id);

  if (status === "pending") {
    return "Loading...";
  }
  if (status === "rejected") {
    return "Error...";
  }

  // Assuming the data structure matches the previous HTML content
  const tourData = {
    image: "https://media.guruwalk.com/nb129gz3ed6o0f8erym3llilb9j3",
    title: "Descubriendo la Joya Sueca - Free Tour",
    date: "Miércoles, 20 sep 2023",
    time: "12:00",
    participants: "1 adulto",
    guruName: "Marie",
    guruAvatar: "https://via.placeholder.com/24",
  };

  return (
    <Stack alignItems="center" justifyContent="center" height="100vh">
      <StyledCard>
        <StyledCardMedia
          component="img"
          image={tourData.image}
          alt="Tour image"
        />
        <StyledCardContent>
          <Typography variant="h6" component="h3" color="text.primary">
            {tourData.title}
          </Typography>
          <InfoItem icon={<CalendarToday fontSize="small" />} text={tourData.date} />
          <InfoItem icon={<AccessTime fontSize="small" />} text={tourData.time} />
          <InfoItem icon={<Person fontSize="small" />} text={tourData.participants} />
          <Divider />
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar src={tourData.guruAvatar} sx={{ width: 24, height: 24 }} />
            <Typography variant="body2">Guru: {tourData.guruName}</Typography>
            <Chip label="PRO" size="small" color="error" />
          </Box>
          <Divider />
        </StyledCardContent>
        <ButtonsContainer>
          <Button variant="outlined" startIcon={<LocationOn />} fullWidth>Cómo llegar</Button>
          <Button variant="outlined" fullWidth>Contactar con el guru</Button>
          <Button variant="outlined" fullWidth>Modificar reserva</Button>
          <Button variant="outlined" color="error" fullWidth>Cancelar reserva</Button>
        </ButtonsContainer>
        <ConfirmedBadge>
          <CheckCircle fontSize="small" />
          <Typography variant="caption">Confirmada</Typography>
        </ConfirmedBadge>
      </StyledCard>
    </Stack>
  );
};

export default OneTourRoutePage;