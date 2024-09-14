import type { LinkProps as RouterLinkProps } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"
import { createTheme } from "@mui/material"
import { forwardRef } from "react"

export const customTheme = createTheme({
  palette: {
    success: { main: "#18CC86" },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: forwardRef<
          HTMLAnchorElement,
          Omit<RouterLinkProps, "to"> & { href: string }
        >(({ href, ...props }, ref) => {
          return <RouterLink ref={ref} to={href} {...props} />
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "0.5rem",
          boxShadow:
            "0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)",
          margin: 0,
          ":hover": {
            boxShadow:
              "0 0px 1px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2)",
          },
          ":active": {
            boxShadow: "0 0px 1px hsla(0, 0%, 0%, 0.4)",
            transform: "translateY(1px)",
          },
        },
      },
      defaultProps: {
        LinkComponent: forwardRef<
          HTMLAnchorElement,
          Omit<RouterLinkProps, "to"> & { href: string }
        >(({ href, ...props }, ref) => {
          return <RouterLink ref={ref} to={href} {...props} />
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          maxHeight: 300,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          margin: 3,
          borderRadius: "0.5rem",
          color: theme.palette.grey[700],
          padding: "4px 10px",
          minHeight: 0,
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          margin: "5px 10px",
          borderRadius: "0.5rem",
          p: 0,
        },
      },
      defaultProps: {
        LinkComponent: forwardRef<
          HTMLAnchorElement,
          Omit<RouterLinkProps, "to"> & { href: string }
        >(({ href, ...props }, ref) => {
          return <RouterLink ref={ref} to={href} {...props} />
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        variant: "outlined",
        inputProps: {
          style: {
            padding: 10,
          },
        },
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
    },
    MuiTablePagination: {
      styleOverrides: {
        input: {
          fontSize: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: ({ theme }) => ({
          color: theme.palette.grey[700],
          fontSize: 12,
          whiteSpace: "nowrap",
          padding: "8px 16px",
          fontWeight: 600,
        }),
        body: ({ theme }) => ({
          padding: "8px 16px",
          color: theme.palette.grey[700],
        }),
      },
    },
  },
})
