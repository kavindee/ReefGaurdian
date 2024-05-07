import React, { useState, useEffect, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@mui/material/colors';
import Clear from '@mui/icons-material/Clear';
import axios from 'axios';
import bgImage from '../images/Assets/healthBck.png';
import cardBackground from '../images/Assets/healdInfo.png'
import {CardActions } from '@mui/material';
import Layout from "../components/Layout";

import { useNavigate } from 'react-router-dom';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(common.white),
  backgroundColor: common.white,
  '&:hover': {
    backgroundColor: '#ffffff7a',
  },
}));





  
const Health = () => {

  const clearCard = () => {
    setRecommendation('');
    setSolutions([]);
    setDescription1('');
    setHyperlink1('');
  };
  
  const [selectedFile1, setSelectedFile1] = useState();
  const [preview1, setPreview1] = useState();
  const [data1, setData1] = useState();
  const [image1, setImage1] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [recommendation, setRecommendation] = useState();
  const [recommendation1, setRecommendation1] = useState();
  const [solutions, setSolutions] = useState();
  const [description1, setDescription1] = useState();
  const [hyperlink1, setHyperlink1] = useState();
  // const [harm, setHarm] = useState();
  
  const navigate1 = useNavigate();
  
  // Define illegal coral names list
  //const harmful =useMemo(() => ["Bleached", "Cyanobacteria"]);

  useEffect(() => {
    if (!selectedFile1) {
      setPreview1(undefined);
      return;
    }
    const objectUrl1 = URL.createObjectURL(selectedFile1);
    setPreview1(objectUrl1);
    return () => URL.revokeObjectURL(objectUrl1);
  }, [selectedFile1]);

  useEffect(() => {
    const sendFile = async () => {
      if (image1) {
        let formData1 = new FormData();
        formData1.append("file", selectedFile1);
        try {
          const res1 = await axios.post('http://127.0.0.1:5000/predicthealth', formData1);
          console.log("Backend response:", res1.data);
          if (res1.status === 200) {
            console.log("Backend response:", res1.data);
            setData1(res1.data);
            // Example of setting these when you get your prediction data

            if (res1.data.predicted_class === 'Bleached') {
              setDescription1([
                
                "Water Level: Keep stable for circulation.",
                "Water Quality:",
                  <li>pH: Maintain between 8.1 and 8.4.</li>,
                <li>Temperature: Stable at 75°F to 82°F (24°C to 28°C).</li>,
                "Maintain Stable Parameters: Test and adjust ammonia, nitrite, nitrate, phosphate, calcium, alkalinity, and magnesium levels.",
                "Proper Lighting: Avoid excessive exposure.",
                "Adaptation: Gradually introduce new corals.",
                "Water Flow: Ensure adequate circulation.",
                "Regular Maintenance: Perform routine cleaning and water changes."
              ]);
              setHyperlink1("https://oceanservice.noaa.gov/facts/coral_bleach.html");
              setRecommendation(<b>To prevent coral bleaching:</b>);
              setRecommendation1("Solution for bleached corals:");
              setSolutions  ([
                <b>Identify Cause:</b>, "Determine why corals bleached, such as temperature stress or pollution.",
                <b>Water Quality:</b>, "Maintain stable parameters through water changes and filtration.",
                <b>Temperature Control:</b>, "Use chillers or fans to lower water temperature if high.",
                <b>Reduce Light:</b>, "Dim or shorten lighting duration to ease stress on corals.",
                <b>Nutritional Support:</b>, "Feed corals phytoplankton or zooplankton to compensate for lost algae.",
                <b>Regeneration:</b>, "Monitor for recovery signs, propagate healthy corals if possible.",
                <b>Coral Dips:</b>, "Use dips cautiously to remove debris, pests, aiding recovery.",
                <b>Professional Help:</b>, "Seek expert advice for tailored solutions if uncertain.",
                
              ]);
            } 
            else if (res1.data.predicted_class === 'Coral_healthy') {
              setRecommendation("Recommendation");
              setDescription1(["Healthy coral reefs are vital ecosystems teeming with life and vital for marine biodiversity. Corals, made up of polyps and symbiotic algae, rely on specific environmental conditions to thrive. They benefit marine life by providing habitats, protect coastlines, and support human economies. Stress factors like temperature changes and pollution can cause coral bleaching, leading to significant ecological impacts. Protecting coral health involves reducing emissions, managing fisheries, controlling pollution, and supporting restoration efforts, which are essential for the health of the oceans and human communities dependent on them."]);
              setHyperlink1("https://en.wikipedia.org/wiki/Euphyllia_ancora#:~:text=Euphyllia%20ancora%20(reclassified%20in%202017,coral%2C%20or%20bubble%20honeycomb%20coral."); // Replace with your actual link
            }
            else if (res1.data.predicted_class === 'Cyanobacteria') {
              setRecommendation(<b>To prevent cyanobacteria:</b>);
              setRecommendation1("Solution for cyanobacteria:");
              setDescription1([
                
                "Water Level: Maintain a consistent level for proper circulation.",
                "Water Quality:",
                "  - pH: Keep it between 8.1 and 8.4.",
                "  - Nitrate and Phosphate: Keep levels low with regular water changes.",
                "  - Ammonia and Nitrite: Ensure undetectable levels.",
                "Temperature: Maintain stability between 75°F to 82°F (24°C to 28°C).",
                "Additionally,",
                "  - Maintain good filtration",
                "  - Water flow",
                "  - Avoid overfeeding to minimize nutrient buildup."
              ]);
              setHyperlink1("https://en.wikipedia.org/wiki/Bubble-tip_anemone#:~:text=Bubble%2Dtip%20anemone%20(Entacmaea%20quadricolor,anemone%20in%20the%20family%20Actiniidae.");
              setSolutions([
                <b>Identify Cause:</b> ,"Excess nutrients like nitrates and phosphates fuel cyanobacteria growth.",
                <b>Improve Water Quality:</b>, "Dilute nutrients with regular water changes and proper filtration.",
                <b>Manual Removal:</b> ,"Gently remove cyanobacteria from corals to reduce visual impact.",
                <b>Chemical Treatment:</b>, "Use algaecide with caution and follow directions carefully.",
                <b>Balance Microbiome:</b>, "Introduce beneficial bacteria to inhibit cyanobacteria growth.",
                <b>Monitor and Maintain:</b>, "Regularly check water parameters and maintain cleanliness.",
                <b>Preventive Measures:</b>, "Maintain proper stocking levels and avoid overfeeding.",
                
              ]);
            }
            else {
              // For other predicted classes, set the default values
              setRecommendation();
              setDescription1("try again");
              setHyperlink1("https://en.wikipedia.org/wiki/Coral");
              // setHarm("none");
              
            }
            
            // Check if the predicted class is illegal
            // if (harmful.includes(res1.data.predicted_class)) {
            //   setHarm("Harmful");
            // } else {
            //   setHarm("Safe");
            // }
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsLoading1(false);
        }
      }
    };

    if (preview1) {
      setIsLoading1(true);
      sendFile();
    }
  }, [preview1, image1, selectedFile1]);

  const onSelectFile1 = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile1(undefined);
      setImage1(false);
      setData1(undefined);
      return;
    }
    setSelectedFile1(files[0]);
    setData1(undefined);
    setImage1(true);
  };

  const clearData1 = () => {
    setData1(null);
    setImage1(false);
    setSelectedFile1(null);
    setPreview1(null);
  };

  const handleHistoryButtonClick1 = () => {
    // Add your code to handle the history button click
    navigate1('/healthhistory'); 
  };
  
  let confidence1 = data1 ? (parseFloat(data1.confidence) ).toFixed(2) : 0;

  return (
    <Layout>
    <React.Fragment>
      
      
      <Button color="inherit" onClick={handleHistoryButtonClick1} sx={{ marginLeft:'10px',textAlign: 'left' }}>
        History
      </Button>

      <Container maxWidth={false} disableGutters sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: "93vh",
        marginTop: "8px",
      }}>
        <Grid container justifyContent="center" alignItems="start" spacing={2} sx={{ padding: '0em 1em 0 1em' }}>
          <Grid item xs={12} md={6}>
            <Card sx={{
              margin: 'auto',
              maxWidth: 550,
              height: 'auto',
              backgroundColor: image1 ? 'white' : 'transparent', 
              boxShadow: '0px 100px 70px 0px rgb(0 0 0 / 30%) !important',
              borderRadius: '15px',
              ...(image1 ? {} : { height: 'auto' }),
            }}>
              {image1 && <CardActionArea>
                <CardMedia sx={{ margin: '10px auto', maxWidth: 200, backgroundColor: 'transparent', boxShadow: '0px 100px 70px 0px rgb(0 0 0 / 30%) !important', borderRadius: '15px' }}
                  component="img"
                  height="200"
                  width="200"
                  image={preview1}
                  alt="Uploaded image"
                />
              </CardActionArea>}
              {!image1 && <CardContent>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image of a coral reef image to process"}
                  onChange={onSelectFile1}
                />
              </CardContent>}
              {data1 && <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'medium', color: '#333' }}>
                      {data1.predicted_class}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {"Confidence: " + confidence1}%
                    </Typography>
                  </Box>
                <Card sx={{ margin: '0px auto', maxWidth: 600, backgroundColor: 'transparent', boxShadow: '0px 100px 70px 0px rgb(0 0 0 / 30%) !important', borderRadius: '15px' }}>
                  <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" component="div" sx={{ color: '#000000a6', fontSize: '14px', textDecoration: 'underline', marginBottom: '10px' }}>
                        <span style={{ color: 'green' }}>{recommendation}</span>
                      </Typography>
                      {/* <Card sx={{ margin: '10px ', padding: '6px', width: 70, height: '15px', backgroundColor: harm === 'Harmful' ? '#fcbdbd' : '#b2f7d0', boxShadow: '0px 100px 70px 0px rgb(0 0 0 / 30%) !important', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography variant="body1" component="div" sx={{ color: '#000000a6', fontSize: '12px' }}>
                        {harm}
                      </Typography>
                    </Card> */}
                    </div>
                    {description1 && description1.length > 0 && description1.map((description1, index) => (
                    <Typography variant="body2" color="text.secondary" key={index} sx={{  fontSize: '12px' }}>
                      {description1}
                    </Typography>
                  ))}
                    <Typography variant="body2" sx={{ color: '#000000a6', marginTop: '10px', fontSize: '12px' }}>
                      Learn more at <a href={hyperlink1} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>this link</a>.
                    </Typography>
                  </CardContent>
                </Card>
              </CardContent>}
              {isLoading1 && <CardContent>
                <CircularProgress color="secondary" />
                <Typography variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>

        
      
      {/* New card Grid item */}
      <Grid item xs={12} md={6}>
              <Card sx={{
                      margin: 'auto',
                      maxWidth: 900,
                      height: 'auto', // Set to 'auto' to grow with the content
                      borderRadius: '15px',
                      color: 'white', // Adjust text color for better readability against the background
                      backgroundSize: 'cover',
                      overflow: 'auto', // Add scrollbar if content overflows
                    }}>
                {/* New Card's Content Here */}
                <CardContent>
                  <Typography variant="h5" component="div" color="text.primary">
                    {recommendation1}
                  </Typography>
                  {solutions && solutions.length > 0 && solutions.map((solution, index) => (
                    <Typography variant="body2" color="text.secondary" key={index}>
                      {solution}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', padding: '16px' }}>
            <Button variant="contained" color="primary" onClick={clearCard}>
              Clear
            </Button>
            <Button variant="contained" color="primary" sx={{ marginLeft: '8px' }} onClick={() => { /* handler function for Ask Audions */ }}>
              Ask Audions
            </Button>
          </CardActions>
                </Card>                                    
            </Grid>
            


          {data1 && <Grid item sx={{ maxWidth: "416px",marginLeft:'700px', marginTop:'-30px', width: "100%" }}>
            <ColorButton variant="contained" onClick={clearData1} startIcon={<Clear fontSize="large" />}>
              Clear
            </ColorButton>
          </Grid>}
        </Grid>
      </Container>
    </React.Fragment>
    </Layout>
  );
};

export default Health;
