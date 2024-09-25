import type React from "react"
import { useRef } from "react"
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  Stack,
} from "@mui/material"
import { Add, Close } from "@mui/icons-material"
import { useField } from "formik"

interface FormikImageFieldProps {
  name: string
  required?: boolean
}

const FormikImageField: React.FC<FormikImageFieldProps> = ({
  name,
  required,
}) => {
  const [{ value: values = [] }, { error }, { setValue }] =
    useField<File[]>(name)
  const fileInputRef = useRef<HTMLInputElement>(null)
  console.log("David error :>> ", error)
  const handleFileUpload = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
      fileInputRef.current.files = null
      fileInputRef.current.click()
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files)
      const newImageArray = [...values, ...newImages]
      setValue(newImageArray, true)
    }
  }

  const handleOnRemoveImg = (index: number) => {
    setValue(
      values.filter((_, i) => i !== index),
      true,
    )
  }

  return (
    <Stack>
      <InputLabel error={!!error} sx={{ mb: -1.5, ml: 2, zIndex: 1 }} shrink>
        Imágenes {required && "*"}
      </InputLabel>

      <ImageList
        cols={3}
        rowHeight={164}
        sx={{
          p: 1,
          borderRadius: 2,
          backgroundColor: ({ palette }) => palette.grey[100],
          maxHeight: 400,
          overflowY: "auto",
          mb: 0,
          "&:hover": {
            backgroundColor: ({ palette }) => palette.grey[200],
          },
        }}
      >
        {values.map((item, index) => (
          <Box key={`${item.name}-${index}`} position="relative" p={0.5}>
            <Button
              sx={{
                minWidth: 0,
                p: 0,
                zIndex: 1,
                position: "absolute",
                top: 0,
                right: 0,
                "& .MuiButton-icon": {
                  ml: "auto",
                  mr: "auto",
                },
                width: "fit-content",
                borderRadius: 1,
              }}
              onClick={() => handleOnRemoveImg(index)}
              startIcon={<Close fontSize="small" />}
            />
            <ImageListItem
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: ({ shadows }) => shadows[3],
              }}
            >
              <img
                src={URL.createObjectURL(item)}
                alt={item.name}
                loading="lazy"
                style={{ borderRadius: 8 }}
              />
            </ImageListItem>
          </Box>
        ))}
        <label htmlFor="raised-button-file">
          <Box sx={{ width: "100%", height: "100%", p: 1 }}>
            <input
              ref={fileInputRef}
              accept=".png, .jpg, .jpeg, .gif"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <IconButton
              sx={{
                borderRadius: 4,
                minHeight: 148,
                width: "100%",
                height: "100%",
                border: ({ palette }) => `1px dashed ${palette.primary.main}`,
                fontSize: 16,
              }}
              color="primary"
              onClick={handleFileUpload}
            >
              <Stack gap={1} alignItems="center">
                <Add />
                {"Add Image(s)"}
              </Stack>
            </IconButton>
          </Box>
        </label>
      </ImageList>
      {error && (
        <FormHelperText sx={{ mt: 0.5, mx: 1.8 }} error>
          {error}
        </FormHelperText>
      )}
    </Stack>
  )
}

export default FormikImageField
