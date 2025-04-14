import type { ReactNode } from "react"
import { useState } from "react"
import {
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import type { Editor } from "@tiptap/react"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS"
import FormatClearIcon from "@mui/icons-material/FormatClear"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay"
import LinkOffIcon from "@mui/icons-material/LinkOff"
import LinkIcon from "@mui/icons-material/Link"
import InvertColorsRoundedIcon from "@mui/icons-material/InvertColorsRounded"
import InvertColorsOffRoundedIcon from "@mui/icons-material/InvertColorsOffRounded"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded"
import RttOutlinedIcon from "@mui/icons-material/RttOutlined"
import FormatColorFillRoundedIcon from "@mui/icons-material/FormatColorFillRounded"
import FormatSizeIcon from "@mui/icons-material/FormatSize"
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL"
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined"
import LowPriorityIcon from "@mui/icons-material/LowPriority"
import HistoryIcon from "@mui/icons-material/History"
import Dialog from "../dialog"
import FormikTextInput from "../form/text-input"
import type { FormikHelpers } from "formik"
import { Formik } from "formik"
import * as Yup from "yup"

type ToolbarIconOptionProp = {
  editor: Editor | null
}

const toolbarBgColor = ({ palette }: { palette: any }) => palette.grey[100]

const ToolbarIconOption = ({
  title,
  icon,
  onClick,
  disabled,
  active,
}: {
  title: string
  icon: ReactNode
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: any) => void
  disabled?: boolean
  active?: boolean
}) => {
  return (
    <Tooltip title={title}>
      <div>
        <IconButton
          sx={
            active
              ? {
                  bgcolor: ({ palette }) => palette.grey[300],
                  "&:hover": { bgcolor: ({ palette }) => palette.grey[300] },
                }
              : {}
          }
          disabled={disabled}
          onClick={onClick}
          size="small"
        >
          {icon}
        </IconButton>
      </div>
    </Tooltip>
  )
}

const FormatMenu = ({
  icon,
  title,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Tooltip title={title}>
        <IconButton size="small" onClick={e => setAnchorEl(e.currentTarget)}>
          {icon}
        </IconButton>
      </Tooltip>
      <Menu
        id="color-menu"
        MenuListProps={{
          "aria-labelledby": title,
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  )
}

const FormatBold = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      disabled={
        !editor?.can().chain().focus().toggleBold().run() || !editor?.isEditable
      }
      title="Bold"
      icon={<FormatBoldIcon />}
      onClick={() => editor?.chain().focus().toggleBold().run()}
      active={editor?.isActive("bold")}
    />
  )
}
const FormatItalic = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().toggleItalic().run()}
      disabled={
        !editor?.can().chain().focus().toggleItalic().run() ||
        !editor?.isEditable
      }
      title="Italic"
      active={editor?.isActive("italic")}
      icon={<FormatItalicIcon />}
    />
  )
}
const FormatUnderLine = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
      disabled={
        !editor?.can().chain().focus().toggleUnderline().run() ||
        !editor?.isEditable
      }
      title="UnderLine"
      active={editor?.isActive("underline")}
      icon={<FormatUnderlinedIcon />}
    />
  )
}
const FormatStrikethrough = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().toggleStrike().run()}
      disabled={
        !editor?.can().chain().focus().toggleStrike().run() ||
        !editor?.isEditable
      }
      title="Strike through"
      active={editor?.isActive("strike")}
      icon={<StrikethroughSIcon />}
    />
  )
}

const FormatClearMarks = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().unsetAllMarks().run()}
      disabled={!editor?.isEditable}
      title="Clear marks"
      icon={<FormatClearIcon />}
    />
  )
}

const FormatQuote = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      disabled={!editor?.can().toggleBlockquote() || !editor?.isEditable}
      active={editor?.isActive("blockquote")}
      title="Quote"
      icon={<FormatQuoteIcon />}
    />
  )
}

const FormatBulleted = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().toggleBulletList().run()}
      title="Bullet List"
      disabled={!editor?.isEditable}
      active={editor?.isActive("bulletList")}
      icon={<FormatListBulletedIcon />}
    />
  )
}
const FormatOrdered = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      title="Ordered List"
      disabled={!editor?.isEditable}
      active={editor?.isActive("orderedList")}
      icon={<FormatListNumberedIcon />}
    />
  )
}
const FormatSink = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().sinkListItem("listItem").run()}
      title="Sink list item"
      disabled={!editor?.can().sinkListItem("listItem") || !editor?.isEditable}
      icon={<PlaylistPlayIcon />}
    />
  )
}
const FormatLift = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().liftListItem("listItem").run()}
      title="Lift list item"
      disabled={!editor?.can().liftListItem("listItem") || !editor?.isEditable}
      icon={<PlaylistPlayIcon sx={{ transform: "scaleX(-1)" }} />}
    />
  )
}
const FormatLink = ({ editor }: ToolbarIconOptionProp) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const handleSubmit = (
    values: { link: string },
    helpers: FormikHelpers<{ link: string }>,
  ) => {
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: values.link })
      .run()
    setLinkDialogOpen(false)
    helpers.resetForm()
  }
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ link: "" }}
      validationSchema={Yup.object().shape({
        link: Yup.string()
          .url("Invalid URL")
          .required("This field is required"),
      })}
    >
      {({ submitForm, setFieldValue }) => (
        <>
          <Dialog
            open={linkDialogOpen}
            onClose={() => setLinkDialogOpen(false)}
            title="Insert URL"
            fullWidth
            maxWidth="sm"
          >
            <DialogContent>
              <FormikTextInput name="link" label="Link" required />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={submitForm}>
                Insert
              </Button>
            </DialogActions>
          </Dialog>
          <ToolbarIconOption
            onClick={() => {
              setLinkDialogOpen(true)
              setFieldValue("link", editor?.getAttributes("link").href)
            }}
            title="Insert Link"
            active={editor?.isActive("link")}
            disabled={!editor?.isEditable}
            icon={<LinkIcon />}
          />
        </>
      )}
    </Formik>
  )
}
const FormatUnlink = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().unsetLink().run()}
      title="Link off"
      disabled={!editor?.isActive("link") || !editor?.isEditable}
      icon={<LinkOffIcon />}
    />
  )
}
const FormatHardBreak = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().setHardBreak().run()}
      disabled={!editor?.can().setHardBreak() || !editor?.isEditable}
      title="Hard Break (New Line keeping element type)"
      icon={<LowPriorityIcon />}
    />
  )
}
const FormatHorizontalRule = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().setHorizontalRule().run()}
      disabled={!editor?.isEditable}
      title="Add Horizontal Divider"
      icon={<HorizontalRuleRoundedIcon />}
    />
  )
}

const FormatUnsetTextColor = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().unsetColor().run()}
      title="Unset text color"
      disabled={!editor?.isEditable}
      icon={<InvertColorsOffRoundedIcon />}
    />
  )
}
const FormatUnsetTextHighLight = ({ editor }: ToolbarIconOptionProp & {}) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().unsetHighlight().run()}
      title="Unset text highlight"
      disabled={!editor?.isEditable}
      icon={
        <Stack position="relative">
          <Stack
            direction="row"
            position="absolute"
            top={0}
            left={0}
            height="100%"
            sx={{
              transform: "rotate(-45deg)",
              translate: "150%",
            }}
          >
            <Stack
              width={2}
              height="100%"
              borderRadius="0.5rem"
              bgcolor={({ palette }) => palette.grey[600]}
            />
            <Stack width={2} height="100%" bgcolor={toolbarBgColor} />
          </Stack>
          <FormatColorFillRoundedIcon />
        </Stack>
      }
    />
  )
}

const colorList = [
  "#FF7777",
  "#FC9AF3",
  "#958DF1",
  "#70CFF8",
  "#8FF0D2",
  "#B9F18D",
  "#FFB67A",
  "#F0EA79",
  "#DCDCDC",
  "#778490",
  "#000",
  "#FFF",
]

const FormatTextColor = ({ editor }: ToolbarIconOptionProp) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout>()
  const [lastColor, setLastColor] = useState(
    () => colorList[colorList.length - 2],
  )

  const selectColor = (color: string) => {
    editor?.chain().focus().setColor(color).run()
    setLastColor(color)
    handleClose()
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const { currentTarget } = event
    setDelayHandler(
      setTimeout(() => {
        setAnchorEl(currentTarget)
      }, 500),
    )
  }
  const handleMouseLeave = () => {
    clearTimeout(delayHandler)
  }

  return (
    <Stack direction="row">
      <ToolbarIconOption
        onClick={() => editor?.chain().focus().setColor(lastColor).run()}
        title="Color Text"
        icon={<InvertColorsRoundedIcon sx={{ color: lastColor }} />}
        disabled={!editor?.isEditable}
      />
      <Tooltip title="Select text color">
        <IconButton
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          size="small"
          sx={{ width: 16 }}
          disabled={!editor?.isEditable}
        >
          <ExpandMoreIcon sx={{ fontSize: 10 }} />
        </IconButton>
      </Tooltip>
      <Menu
        id="text-color-menu"
        MenuListProps={{
          "aria-labelledby": "Select text color",
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <Grid m={1} container width={144}>
          {colorList.map(item => (
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              key={item}
              xs={3}
            >
              <IconButton
                onClick={() => selectColor(item)}
                disabled={!editor?.isEditable}
              >
                <Stack
                  width={15}
                  height={15}
                  sx={{
                    bgcolor: item,
                    boxShadow: ({ shadows }) => shadows[4],
                  }}
                  borderRadius={"0.2rem"}
                />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Menu>
    </Stack>
  )
}

const FormatTextHighlight = ({ editor }: ToolbarIconOptionProp) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout>()
  const [lastColor, setLastColor] = useState(
    () => colorList[colorList.length - 2],
  )

  const selectColor = (color: string) => {
    editor?.chain().focus().setHighlight({ color }).run()
    setLastColor(color)
    handleClose()
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const { currentTarget } = event
    setDelayHandler(
      setTimeout(() => {
        setAnchorEl(currentTarget)
      }, 500),
    )
  }
  const handleMouseLeave = () => {
    clearTimeout(delayHandler)
  }

  return (
    <Stack direction="row">
      <ToolbarIconOption
        onClick={() =>
          editor?.chain().focus().setHighlight({ color: lastColor }).run()
        }
        disabled={!editor?.isEditable}
        title="Color Text"
        icon={<FormatColorFillRoundedIcon sx={{ color: lastColor }} />}
      />
      <Tooltip title="Select text color">
        <IconButton
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          size="small"
          sx={{ width: 16 }}
          disabled={!editor?.isEditable}
        >
          <ExpandMoreIcon sx={{ fontSize: 10 }} />
        </IconButton>
      </Tooltip>
      <Menu
        id="text-color-menu"
        MenuListProps={{
          "aria-labelledby": "Select text color",
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <Grid m={1} container width={144}>
          {colorList.map(item => (
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              key={item}
              xs={3}
            >
              <IconButton
                onClick={() => selectColor(item)}
                disabled={!editor?.isEditable}
              >
                <Stack
                  width={15}
                  height={15}
                  sx={{
                    bgcolor: item,
                    boxShadow: ({ shadows }) => shadows[4],
                  }}
                  borderRadius={"0.2rem"}
                />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Menu>
    </Stack>
  )
}
const FormatHeading = ({ editor }: { editor: Editor | null }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onSelectHeading = (index: 1 | 2 | 3 | 4 | 5 | 6) => {
    editor?.chain().focus().setHeading({ level: index }).run()
    handleClose()
  }

  return (
    <>
      <ToolbarIconOption
        onClick={handleClick}
        active={editor?.isActive("heading")}
        disabled={!editor?.isEditable}
        icon={
          <Stack alignItems="center" direction="row">
            <FormatSizeIcon />
            <ExpandMoreIcon sx={{ fontSize: 10 }} />
          </Stack>
        }
        title="Heading"
      />
      <Menu
        id="header-menu"
        MenuListProps={{
          "aria-labelledby": "Heading",
        }}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        disablePortal
      >
        {([1, 2, 3, 4, 5, 6] as [1, 2, 3, 4, 5, 6]).map(item => (
          <MenuItem
            disabled={!editor?.isEditable}
            onClick={() => onSelectHeading(item)}
            key={item}
          >
            <Typography variant={`h${item}`}>{item}. Heading</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
const FormatParagraph = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().setParagraph().run()}
      active={editor?.isActive("paragraph") && !editor.isActive("listItem")}
      title="Paragraph"
      disabled={!editor?.isEditable}
      icon={<FormatTextdirectionRToLIcon />}
    />
  )
}
const FormatUndo = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().undo().run()}
      disabled={!editor?.can().undo() || !editor?.isEditable}
      title="Undo"
      icon={<HistoryIcon />}
    />
  )
}
const FormatRedo = ({ editor }: ToolbarIconOptionProp) => {
  return (
    <ToolbarIconOption
      onClick={() => editor?.chain().focus().redo().run()}
      disabled={!editor?.can().redo() || !editor?.isEditable}
      title="Redo"
      icon={<HistoryIcon sx={{ transform: "scaleX(-1)" }} />}
    />
  )
}

const EnrichedTextToolbar = ({
  editor,
  error,
}: ToolbarIconOptionProp & {
  error: boolean
}) => {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      borderBottom={({ palette }) =>
        `1px solid ${error ? palette.error.main : palette.grey[300]}`
      }
      py={0.4}
      bgcolor={toolbarBgColor}
      sx={{
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        "&>div": {
          gap: 0.5,
          flexDirection: "row",
          px: 0.5,
        },
      }}
      divider={
        <Divider
          flexItem
          orientation="vertical"
          sx={{ borderStyle: "solid" }}
        />
      }
    >
      <Stack>
        <FormatBold editor={editor} />
        <FormatItalic editor={editor} />
        <FormatUnderLine editor={editor} />
        <FormatStrikethrough editor={editor} />
        <FormatClearMarks editor={editor} />
      </Stack>
      <Stack>
        <FormatMenu title="Color options" icon={<ColorLensIcon />}>
          <Stack sx={{ gap: 0.5, flexDirection: "row", px: 0.5 }} mx={1}>
            <FormatTextColor editor={editor} />
            <FormatUnsetTextColor editor={editor} />
            <FormatTextHighlight editor={editor} />
            <FormatUnsetTextHighLight editor={editor} />
          </Stack>
        </FormatMenu>
      </Stack>
      <Stack>
        <FormatHeading editor={editor} />
        <FormatMenu title="Text Container" icon={<RttOutlinedIcon />}>
          <Stack sx={{ gap: 0.5, flexDirection: "row", px: 0.5 }} mx={1}>
            <FormatParagraph editor={editor} />
            <FormatBulleted editor={editor} />
            <FormatOrdered editor={editor} />
            <FormatSink editor={editor} />
            <FormatLift editor={editor} />
          </Stack>
        </FormatMenu>
      </Stack>
      <Stack>
        <FormatLink editor={editor} />
        <FormatUnlink editor={editor} />
        <FormatQuote editor={editor} />
      </Stack>
      <Stack>
        <FormatMenu title="Insert" icon={<AddCircleOutlineOutlinedIcon />}>
          <Stack sx={{ gap: 0.5, flexDirection: "row", px: 0.5 }} mx={1}>
            <FormatHardBreak editor={editor} />
            <FormatHorizontalRule editor={editor} />
          </Stack>
        </FormatMenu>
      </Stack>
      <Stack>
        <FormatUndo editor={editor} />
        <FormatRedo editor={editor} />
      </Stack>
    </Stack>
  )
}

export default EnrichedTextToolbar
