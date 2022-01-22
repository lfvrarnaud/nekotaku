import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useHistory } from "react-router";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import "../assets/CSS/slider.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SliderPrincipal({ id }) {
  const [mostPopulary, setMostPopulary] = useState();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const history = useHistory();
  const showMangaPages = (id) => {
    const url = `/manga/${id}`;
    history.push(url);
  };

  const getCard = () => {
    fetch("https://kitsu.io/api/edge/trending/manga")
      .then((resp) => resp.json())
      .then((data) => {
        setMostPopulary(data.data);
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

  if (!mostPopulary) {
    return null;
  }

  return (
    <>
      <Box
        className="mostPopulary most-not-margin"
        sx={{
          maxWidth: 390,
          flexGrow: 1,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "5px",
          marginBottom: "80px",
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "transparent",
          }}
        >
          <Typography color="secondary" className="title">
            {mostPopulary[activeStep].attributes.canonicalTitle}
          </Typography>
        </Paper>

        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          interval={5000}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {mostPopulary.map(({ attributes, id }, index) => (
            <div key={attributes.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  id={id}
                  sx={{
                    height: 550,
                    display: "block",
                    maxWidth: 390,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={attributes.posterImage.medium}
                  alt={attributes.canonicalTitle}
                  onClick={() => showMangaPages(id)}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>

        <MobileStepper
          sx={{ bgcolor: "transparent" }}
          className="carousel"
          color="secondary"
          variant="dots"
          steps={10}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              color="secondary"
              size="small"
              onClick={handleNext}
              disabled={activeStep === 9}
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
    </>
  );
}

export default SliderPrincipal;
