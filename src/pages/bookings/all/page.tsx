import { Container, Stack, Tab, Tabs } from "@mui/material"
import { useState } from "react"

const AllBookingsPage = () => {
  const [] = useState()
  return (
    <Container maxWidth="lg">
      <Stack>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="one"
            label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
            wrapped
          />
          <Tab value="two" label="Item Two" />
          <Tab value="three" label="Item Three" />
        </Tabs>
      </Stack>
    </Container>
  )
}

export default AllBookingsPage
