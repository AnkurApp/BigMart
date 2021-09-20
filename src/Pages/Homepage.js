import { Box } from "@material-ui/core";
import Footer from "../Components/footer";

import Navbar from "../Components/Navbar";
import SellCard from "../Components/sellproductCard";

export default function HomePage() {
  return (
    <Box>
      <Navbar />
      {/* <Footer /> */}
      <SellCard />
    </Box>
  );
}
