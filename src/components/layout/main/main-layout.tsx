import {
  AppBar,
  Container,
  Divider,
  Link,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import type { ReactNode } from "react"
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber"
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import logotipo from "../../../assets/imagotipo-guruwalk.png"
import SearchBarNavBar from "./search-bar-navbar"
import LoginButton from "./login-button"
import ButtonNavbar from "./button-navbar"
import { useAppSelector } from "../../../app/hooks"
import { selectUser } from "../../../app/user-slice"

const TopNavBar = () => {
  const { user } = useAppSelector(selectUser)
  return (
    <Toolbar sx={{ boxShadow: ({ shadows }) => shadows[4] }}>
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Stack direction="row" flex={1} alignItems="center">
          <Stack ml="6px" mr={2}>
            <img
              alt="Logo"
              src={logotipo}
              style={{
                width: 150,
              }}
            />
          </Stack>
          <Divider orientation="vertical" flexItem />
          <SearchBarNavBar />
        </Stack>
        <Stack direction="row" gap={1}>
          <Link
            sx={{
              textDecoration: "none",
              color: ({ palette }) => palette.grey[600],
              fontWeight: 600,
            }}
            display="flex"
            alignItems="center"
            gap={1}
            fontSize={14}
            href="/auth/login"
          >
            <ConfirmationNumberIcon fontSize="small" />
            Reservas
          </Link>
          {user?.type === "super-admin" && (
            <Link
              sx={{
                textDecoration: "none",
                color: ({ palette }) => palette.grey[600],
                fontWeight: 600,
              }}
              display="flex"
              alignItems="center"
              gap={1}
              fontSize={14}
              href="/routes/create"
            >
              <AddBoxOutlinedIcon fontSize="small" />
              Nueva Ruta
            </Link>
          )}
          <LoginButton />
        </Stack>
      </Stack>
    </Toolbar>
  )
}

const BottomNavBar = () => {
  const { user } = useAppSelector(selectUser)
  return (
    <AppBar sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Stack
          mx={1}
          direction="row"
          width="100%"
          justifyContent="space-between"
        >
          <ButtonNavbar href="/" icon={<SearchOutlinedIcon />} label="Buscar" />
          <ButtonNavbar
            icon={<ConfirmationNumberOutlinedIcon />}
            label="Reservas"
          />
          {user?.type === "super-admin" && (
            <ButtonNavbar
              icon={<AddBoxOutlinedIcon />}
              label="Nueva Ruta"
              href="/routes/create"
            />
          )}
          <LoginButton bottomBar />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

const MainLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <>
      <Stack>
        {isXs ? <BottomNavBar /> : <TopNavBar />}
        <Container maxWidth="md">
          <Stack p={2}>{children}</Stack>
        </Container>
      </Stack>
    </>
  )
}

export default MainLayout
