import { Container, Typography } from "@material-ui/core";

import { Carousel } from "../components-index";

import "./banner.scss";

function Banner() {
  return (
    <div className="banner">
      <Container className="banner-content">
        <div className="tagline">
          <Typography variant="h2" className="header">
            CrypTick
          </Typography>
          <Typography variant="subtitle2" className="subtitle">
            All Your Favorite Cryptocurrencies at One Place
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
