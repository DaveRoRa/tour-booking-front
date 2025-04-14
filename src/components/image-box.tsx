import type { StackProps } from "@mui/material"
import { Stack } from "@mui/material"

type ImageBoxProps = {
  height: number | string
  src: string
  alt: string
  width?: number | string
  sx?: StackProps["sx"]
  finishLoading?: () => void
}

const ImageBox = ({
  alt,
  height,
  src,
  width,
  sx,
  finishLoading,
}: ImageBoxProps) => {
  return (
    <Stack
      width="fit-content"
      height={height}
      overflow="hidden"
      borderRadius={2}
      flexShrink={0}
      sx={sx}
    >
      <img
        style={{
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: width ? width : "fit-content",
          objectFit: "cover",
          borderRadius: 8,
        }}
        src={src}
        alt={alt}
        onLoad={finishLoading}
      />
    </Stack>
  )
}

export default ImageBox
