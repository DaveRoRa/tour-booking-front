import { Box, Stack } from "@mui/material"
import type { Editor} from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import UnderLineExtension from "@tiptap/extension-underline"
import LinkExtension from "@tiptap/extension-link"
import TextStyleExtension from "@tiptap/extension-text-style"
import TextColorExtension from "@tiptap/extension-color"
import HighLightExtension from "@tiptap/extension-highlight"

export const tipTapExtensions = [
  StarterKit,
  UnderLineExtension,
  LinkExtension.configure({
    linkOnPaste: true,
    openOnClick: false,
  }),
  TextStyleExtension,
  TextColorExtension,
  HighLightExtension.configure({
    multicolor: true,
  }),
]

const EnrichedTextReadOnly = ({ content }: { content: string | Editor }) => {
  const editor = useEditor({
    extensions: tipTapExtensions,
    content,
    editable: false,
  })

  return (
    <Stack>
      <Stack
        borderRadius="0.5rem"
        bgcolor="white"
        sx={{
          "& h6": { fontSize: "0.83em !important", fontWeight: 300 },
          "& h5": { fontSize: "1em !important", fontWeight: 600 },
          "& h4": { fontSize: "1.17em !important", fontWeight: 600 },
          "& h3": { fontSize: "1.5em !important", fontWeight: 600 },
          "& h2": { fontSize: "2em !important", fontWeight: 600 },
          "& h1": { fontSize: "2.5em !important", fontWeight: 600 },
        }}
      >
        <Box
          px={1}
          sx={{
            "& .ProseMirror:focus-visible": {
              outline: "none",
            },
            "& a": {
              textDecoration: "none",
              transition: "all 200ms ease-in-out",
              "&:hover": {
                color: ({ palette }) => palette.primary.light,
              },
              "&:visited": {
                color: ({ palette }) => palette.primary.dark,
              },
            },
            "& blockquote": {
              pl: 2,
              borderLeft: ({ palette }) => `5px solid ${palette.grey[200]}`,
            },
            "& .tiptap .is-editor-empty:first-child::before": {
              color: "#adb5bd",
              content: "attr(data-placeholder)",
              float: "left",
              height: 0,
              pointerEvents: "none",
            },
            "& hr.ProseMirror-selectednode": {
              borderTop: "1px solid #68cef8",
            },
          }}
        >
          <EditorContent style={{ outline: "none" }} editor={editor} />
        </Box>
      </Stack>
    </Stack>
  )
}

export default EnrichedTextReadOnly
