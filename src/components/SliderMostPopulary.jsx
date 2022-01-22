import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { fetchMangas } from "../service/service_api";
import "../assets/CSS/sliderstandard.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const ITEMS_PER_PAGE = 18;

function SliderMostPopulary() {
  const [fanReco, setFanReco] = useState();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const getCard = () => {
    fetchMangas(ITEMS_PER_PAGE).then((data) => {
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
    getCard(ITEMS_PER_PAGE);
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
    <Box className="mostPopulary" sx={{ maxWidth: "75%", flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      />

      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {fanReco.map((attributesArray, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div className="carousel-container">
                <div className="carousel-card">
                  <Box
                    component="img"
                    sx={{
                      height: 250,
                      display: "block",
                      maxWidth: 200,
                      overflow: "hidden",
                      width: "100%",
                      marginRight: "30px",
                    }}
                    src={attributesArray[0].attributes.posterImage.medium}
                    alt={attributesArray[0].attributes.canonicalTitle}
                  />
                  <Typography className="carousel-title">
                    {attributesArray[0].attributes.canonicalTitle}
                  </Typography>
                </div>
                <div className="carousel-card">
                  <Box
                    component="img"
                    sx={{
                      height: 250,
                      display: "block",
                      maxWidth: 200,
                      overflow: "hidden",
                      width: "100%",
                      marginRight: "30px",
                    }}
                    src={attributesArray[1].attributes.posterImage.medium}
                    alt={attributesArray[1].attributes.canonicalTitle}
                  />
                  <Typography className="carousel-title">
                    {attributesArray[1].attributes.canonicalTitle}
                  </Typography>
                </div>
                <div className="carousel-card">
                  <Box
                    component="img"
                    sx={{
                      height: 250,
                      display: "block",
                      maxWidth: 200,
                      overflow: "hidden",
                      width: "100%",
                      marginRight: "30px",
                    }}
                    src={attributesArray[2].attributes.posterImage.medium}
                    alt={attributesArray[2].attributes.canonicalTitle}
                  />
                  <Typography className="carousel-title">
                    {attributesArray[2].attributes.canonicalTitle}
                  </Typography>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>

      <MobileStepper
        className="carousel"
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
    </Box>
  );
}

export default SliderMostPopulary;
