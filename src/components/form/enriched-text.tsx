"use client"
import { Box, FormHelperText, InputLabel, Stack } from "@mui/material"
import { EditorContent, useEditor, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import UnderLineExtension from "@tiptap/extension-underline"
import LinkExtension from "@tiptap/extension-link"
import TextStyleExtension from "@tiptap/extension-text-style"
import TextColorExtension from "@tiptap/extension-color"
import HighLightExtension from "@tiptap/extension-highlight"
import PlaceholderExtension from "@tiptap/extension-placeholder"
import FocusExtension from "@tiptap/extension-focus"
import EnrichedTextToolbar from "./enriched-text-toolbar"
import { useField } from "formik"

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
  PlaceholderExtension.configure({
    placeholder: "Write something...",
  }),
  FocusExtension.configure({
    mode: "deepest",
  }),
]

export const checkingEditorFilled = (value: Editor | null) => {
  if (value instanceof Editor) {
    const hasText = !!value.getText().replaceAll("\n", "")
    const hasFiles = !!value
      .getJSON()
      .content?.find(node =>
        ["image", "customFileTipTap"].includes(node.type || ""),
      )
    return hasFiles || hasText
  }
  return false
}

const EnrichedText = ({ label, name }: { name: string; label: string }) => {
  const [{ value }, { error }, { setValue, setError }] = useField<string>(name)

  const editor = useEditor({
    extensions: tipTapExtensions,
    autofocus: true,
    content: value || "",
    onUpdate: () => {
      if (error) setError(undefined)
    },
    onBlur: ({ editor }) => {
      setValue(editor.getHTML(), true)
    },
    onFocus: () => {},
  })

  return (
    <Stack width="100%">
      <InputLabel
        shrink
        sx={{
          color: ({ palette }) => (error ? palette.error.main : undefined),
          ml: 2,
          mb: -0.5,
        }}
      >
        {label}
      </InputLabel>
      <Stack
        border={({ palette }) =>
          `1px solid ${error ? palette.error.main : palette.grey[400]}`
        }
        borderRadius="0.5rem"
        bgcolor="white"
        sx={{
          "&:hover": error
            ? {}
            : {
                border: ({ palette }) => `1px solid ${palette.grey[500]}`,
              },
          outline: "none",
          "& h6": { fontSize: "0.83em !important", fontWeight: 300 },
          "& h5": { fontSize: "1em !important", fontWeight: 600 },
          "& h4": { fontSize: "1.17em !important", fontWeight: 600 },
          "& h3": { fontSize: "1.5em !important", fontWeight: 600 },
          "& h2": { fontSize: "2em !important", fontWeight: 600 },
          "& h1": { fontSize: "2.5em !important", fontWeight: 600 },
        }}
        position="relative"
      >
        <EnrichedTextToolbar error={!!error} editor={editor} />
        <Box
          px={1}
          maxHeight={400}
          overflow="auto"
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
            "& .has-focus": {
              outline: ({ palette }) =>
                `1px dashed ${error ? palette.error.main : palette.grey[400]}`,
              borderRadius: "0.2rem",
            },
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </Stack>
      {!!error && <FormHelperText error>{error}</FormHelperText>}
    </Stack>
  )
}

export default EnrichedText
