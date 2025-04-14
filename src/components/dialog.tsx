import { Close } from "@mui/icons-material"
import {
  type DialogProps,
  Dialog as MuiDialog,
  DialogTitle,
  IconButton,
} from "@mui/material"

type Props = {
  open: boolean
  keepMounted?: boolean
  onClose?: () => void
  title: React.ReactNode
  children: React.ReactNode
  titleActions?: React.ReactNode
  maxWidth?: DialogProps["maxWidth"]
  fullWidth?: boolean
}

const Dialog = ({
  open,
  onClose,
  title,
  children,
  fullWidth,
  keepMounted,
  maxWidth,
}: Props) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      keepMounted={keepMounted}
      maxWidth={maxWidth}
    >
      <DialogTitle sx={{ position: "relative" }}>
        {title}
        <IconButton size="small" onClick={onClose} sx={{ position: "absolute", top: 15, right: 10 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      {children}
    </MuiDialog>
  )
}

export default Dialog
