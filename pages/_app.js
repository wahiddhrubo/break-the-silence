import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";
import SideBar from "../components/sidebar.js";
import { BreakTheSilenceContextProvider } from "../context/BreakTheSilenceContext.js";
import Player from "../components/playerComp.js";
import Wrapper from "../components/Wrapper.js";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
      appId={process.env.NEXT_PUBLIC_APP_ID}
    >
      <BreakTheSilenceContextProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </BreakTheSilenceContextProvider>
    </MoralisProvider>
  );
}

export default MyApp;
