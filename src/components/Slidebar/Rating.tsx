import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating() {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating name="read-only" value={5} readOnly />
    </Box>
  );
}
