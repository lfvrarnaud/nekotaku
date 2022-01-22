import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useHistory } from "react-router";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { fetchBestRanking } from "../service/service_api";
import "../assets/CSS/slider.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const ITEMS_PER_PAGE = 18;

function SliderFanReco() {
  const [fanReco, setFanReco] = useState();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const history = useHistory();
  const showMangaPages = (id) => {
    const url = `/manga/${id}`;
    history.push(url);
  };

  const getCard = () => {
    fetchBestRanking(ITEMS_PER_PAGE).then((data) => {
      const result = [];
      const itemPerSlice = 3;

      data.forEach((_, i) => {
        if (i % itemPerSlice === 0) {
          result.push(data.slice(i, i + itemPerSlice));
        }
      });
      setFanReco(result);
    });
  };

  useEffect(() => {
    getCard();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if (!fanReco) {
    return null;
  }

  return (
    <Box
      className="mostPopulary"
      sx={{
        maxWidth: "700px",
        flexGrow: 1,
        borderRadius: "5px",
        marginBottom: "50px",
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 2,
          bgcolor: "background.default",
        }}
      />

      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        interval={40000}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {fanReco.map((attributesArray, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div className="carousel-container">
                <Card
                  className="carousel-card"
                  onClick={() => showMangaPages(attributesArray[0].id)}
                >
                  <div
                    className="carrousel-img"
                    style={{
                      backgroundImage: `url(${attributesArray[0].attributes.posterImage.medium})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                    }}
                  >
                    <div className="carrousel-filter" />
                    <div className="carousel-title-container">
                      <div className="carousel-title">
                        <Typography>
                          {attributesArray[0].attributes.canonicalTitle}
                        </Typography>
                      </div>
                      <div className="carousel-icon-container">
                        <div className="carousel-icon">
                          <StarIcon
                            sx={{ color: "#FFCE49", fontSize: "medium" }}
                          />
                          <p>{attributesArray[0].attributes.averageRating}%</p>
                        </div>
                        <div className="carousel-icon">
                          <FavoriteIcon
                            sx={{ color: "#D5003F", fontSize: "small" }}
                          />
                          <p>
                            {attributesArray[0].attributes.popularityRank}ème
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card
                  className="carousel-card"
                  onClick={() => showMangaPages(attributesArray[1].id)}
                >
                  <div
                    className="carrousel-img"
                    style={{
                      backgroundImage: `url(${attributesArray[1].attributes.posterImage.medium})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                    }}
                  >
                    <div className="carrousel-filter" />
                    <div className="carousel-title-container">
                      <div className="carousel-title">
                        <Typography>
                          {attributesArray[1].attributes.canonicalTitle}
                        </Typography>
                      </div>
                      <div className="carousel-icon-container">
                        <div className="carousel-icon">
                          <StarIcon
                            sx={{ color: "#FFCE49", fontSize: "medium" }}
                          />
                          <p>{attributesArray[1].attributes.averageRating}%</p>
                        </div>
                        <div className="carousel-icon">
                          <FavoriteIcon
                            sx={{ color: "#D5003F", fontSize: "small" }}
                          />
                          <p>
                            {attributesArray[1].attributes.popularityRank}ème
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card
                  className="carousel-card"
                  onClick={() => showMangaPages(attributesArray[2].id)}
                >
                  <div
                    className="carrousel-img"
                    style={{
                      backgroundImage: `url(${attributesArray[2].attributes.posterImage.medium})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                    }}
                  >
                    <div className="carrousel-filter" />
                    <div className="carousel-title-container">
                      <div className="carousel-title">
                        <Typography>
                          {attributesArray[2].attributes.canonicalTitle}
                        </Typography>
                      </div>
                      <div className="carousel-icon-container">
                        <div className="carousel-icon">
                          <StarIcon
                            sx={{ color: "#FFCE49", fontSize: "medium" }}
                          />
                          <p>{attributesArray[2].attributes.averageRating}%</p>
                        </div>
                        <div className="carousel-icon">
                          <FavoriteIcon
                            sx={{ color: "#D5003F", fontSize: "small" }}
                          />
                          <p>
                            {attributesArray[2].attributes.popularityRank}ème
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <div className="carousel-menu">
        <MobileStepper
          sx={{ bgcolor: "transparent" }}
          color="secondary"
          variant="dots"
          steps={6}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              color="secondary"
              size="small"
              onClick={handleNext}
              disabled={activeStep === 5}
            >
              Suivant
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              color="secondary"
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Précédent
            </Button>
          }
        />
      </div>
    </Box>
  );
}

export default SliderFanReco;
