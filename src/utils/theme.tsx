import type { LinkProps as RouterLinkProps } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"
import { createTheme } from "@mui/material"
import { forwardRef } from "react"

/* 
const LinkBehaviour = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => {
  return <NextLink href={props.href || ''} ref={ref} {...props} />;
});
 */

export const customTheme = createTheme({
  palette: {
    success: { main: "#18CC86" },
    primary: { main: "#ff5a5f" },
    secondary: { main: "#008489" },
  },
  typography: ({ grey }) => ({
    allVariants: {
      fontFamily: '"Nunito", "Helvetica Neue", Helvetica, Arial, sans-serif',
    },
    body1: {
      color: grey[600],
      fontSize: 14,
    },
  }),
  shadows: [
    "none",
    "0px 0px 1px -2px rgba(0,0,0,0.75)",
    "0px 0px 2px -2px rgba(0,0,0,0.75)",
    "0px 0px 3px -2px rgba(0,0,0,0.75)",
    "0px 0px 4px -2px rgba(0,0,0,0.75)",
    "0px 0px 5px -2px rgba(0,0,0,0.75)",
    "0px 0px 6px -2px rgba(0,0,0,0.75)",
    "0px 0px 7px -2px rgba(0,0,0,0.75)",
    "0px 0px 8px -2px rgba(0,0,0,0.75)",
    "0px 0px 9px -2px rgba(0,0,0,0.75)",
    "0px 0px 10px -2px rgba(0,0,0,0.75)",
    "0px 0px 11px -2px rgba(0,0,0,0.75)",
    "0px 0px 12px -2px rgba(0,0,0,0.75)",
    "0px 0px 13px -2px rgba(0,0,0,0.75)",
    "0px 0px 14px -2px rgba(0,0,0,0.75)",
    "0px 0px 15px -2px rgba(0,0,0,0.75)",
    "0px 0px 16px -2px rgba(0,0,0,0.75)",
    "0px 0px 17px -2px rgba(0,0,0,0.75)",
    "0px 0px 18px -2px rgba(0,0,0,0.75)",
    "0px 0px 19px -2px rgba(0,0,0,0.75)",
    "0px 0px 20px -2px rgba(0,0,0,0.75)",
    "0px 0px 21px -2px rgba(0,0,0,0.75)",
    "0px 0px 22px -2px rgba(0,0,0,0.75)",
    "0px 0px 23px -2px rgba(0,0,0,0.75)",
    "0px 0px 24px -2px rgba(0,0,0,0.75)",
  ],
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
          color: theme.palette.secondary.main,
        }),
      },
      defaultProps: {
        component: forwardRef<
          HTMLAnchorElement,
          Omit<RouterLinkProps, "to" | "color"> & { href: string }
        >(({ href, ...props }, ref) => {
          return <RouterLink ref={ref} to={href} {...props} />
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.05)", borderRadius: 8 },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: ({ theme, ownerState }) => ({
          "&:hover": {
            backgroundColor:
              ownerState.color === "inherit" || !ownerState.color
                ? theme.palette.primary.main
                : theme.palette[ownerState.color].main,
            boxShadow: "0 0.5rem 1rem 0 rgba(0,0,0,0.1)",
          },
        }),
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 8,
          fontSize: 18,
          fontWeight: 700,
        },
      },
      defaultProps: {
        variant: "contained",
        LinkComponent: forwardRef<
          HTMLAnchorElement,
          Omit<RouterLinkProps, "to"> & { href: string }
        >(({ href, ...props }, ref) => {
          return <RouterLink ref={ref} to={href} {...props} />
        }),
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          margin: 3,
          borderRadius: 8,
          color: theme.palette.grey[700],
          padding: "8px 16px",
          minHeight: 0,
        }),
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontSize: "12px !important",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: { minWidth: "48px !important" },
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
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          "& label": {
            display: "flex",
            "&.Mui-focused": { color: theme.palette.grey[700] },
            "&.Mui-error": { color: theme.palette.error.main },
          },
          "& fieldset": { border: "none" },
          "& .MuiInputBase-root": {
            backgroundColor: theme.palette.grey[100],
            "&:hover": { backgroundColor: theme.palette.grey[200] },
          },

          "& .Mui-focused fieldset": {
            border: `2px solid ${theme.palette.grey[700]}`,
          },
          "& .Mui-focused.Mui-error fieldset": {
            border: `2px solid ${theme.palette.error.main}`,
          },
          "& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.grey[700],
          },
          "& .Mui-focused.Mui-error fieldset.MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
        }),
      },
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: "white",
          boxShadow: theme.shadows[4],
          color: theme.palette.grey[600],
        }),
        arrow: ({ theme }) => ({
          color: "white",
          "&::before": {
            boxShadow: theme.shadows[4],
          },
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          padding: "0px 9px !important",
        },
      },
    },
  },
})
