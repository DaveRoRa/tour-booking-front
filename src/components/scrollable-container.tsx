import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Box, IconButton, styled } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

interface ScrollableContainerProps {
  children: (props: { checkScroll: () => void }) => React.ReactNode
}

const ScrollContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: "100%",
  "& .MuiIconButton-root": {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
  },
}))

const ScrollContent = styled(Box)(({ theme }) => ({
  overflowX: "auto",
  whiteSpace: "nowrap",
  maxWidth: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}))

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const mutationObserverRef = useRef<MutationObserver | null>(null)

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1) // -1 for rounding errors
    }
  }

  useEffect(() => {
    checkScroll()

    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(checkScroll)
      mutationObserverRef.current = new MutationObserver(checkScroll)
      mutationObserverRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })
      resizeObserverRef.current.observe(containerRef.current)
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8
      const newScrollLeft =
        containerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount)

      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <ScrollContainer>
      {showLeftArrow && (
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            left: 8,
          }}
          size="small"
        >
          <ChevronLeft />
        </IconButton>
      )}
      <ScrollContent ref={containerRef} onScroll={checkScroll}>
        {children({ checkScroll })}
      </ScrollContent>

      {showRightArrow && (
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            right: 8,
          }}
          size="small"
        >
          <ChevronRight />
        </IconButton>
      )}
    </ScrollContainer>
  )
}

export default ScrollableContainer
