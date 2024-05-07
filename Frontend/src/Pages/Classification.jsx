import React, { useState, useEffect, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@mui/material/colors';
import Clear from '@mui/icons-material/Clear';
import axios from 'axios';
import bgImage from './bck.jpeg';
import Layout from "../components/Layout";

import { useNavigate } from 'react-router-dom';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(common.white),
  backgroundColor: common.white,
  '&:hover': {
    backgroundColor: '#ffffff7a',
  },
}));




  
const Classification = () => {
  
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scientificName, setScientificName] = useState();
  const [description, setDescription] = useState();
  const [hyperlink, setHyperlink] = useState();
  const [legality, setLegality] = useState();
  
  const navigate = useNavigate();
  
  // Define illegal coral names list
  const illegalCoralNames =useMemo(() => ["Acropora abrotanoides", "Acropora clathrata", "Acropora cytherea", "Acropora gemmifera", "Acropora gemmifera", "Acropora hyacinthus", "Acropora loripes", "Acropora millepora", "Acropora nasuta", "Acropora pharaonis", "Acropora pulchra", "Cyphastrea agassizii", "Cyphastrea ocellina", "Cyphastrea serailia", "Diploastrea heliopora", "Echinopora lamellosa", "Echinopora forskali", "Favia favus", "Favia pallida", "Faviidae (Family)", "Goniopora stokesi", "Goniastrea aspera", "Goniastrea retiformis", "Heliofungia actiniformis", "Hydnophora microconos", "Leptastrea purpurea", "Lobophyllia corymbosa", "Lobophyllia hemprichii", "Lobophyllia dentata", "Merulina ampliata", "Merulina scabricula", "Montipora digitata", "Montipora foliosa", "Montipora monasteriata", "Montipora patula", "Montipora verrucosa", "Mycedium elephantotus", "Pachyseris gemma", "Pachyseris speciosa", "Pavona cactus", "Pavona decussata", "Platygyra daedalea", "Platygyra ryukyuensis", "Platygyra lamellina", "Pocillopora damicornis", "Pocillopora verrucosa", "Psammocora stellata", "Porites cylindrica", "Pyrites lutea", "Porites rus", "Porites nigrescens", "Siderastrea stellata", "Turbinaria peltata", "Turbinaria frondens", "Plerogyra sinuosa", "Plerogyra flexuosa", "Coscinaraea columna", "Coscinaraea wellsi", "Coscinaraea mcneilli", "Pseudosiderastrea tayami", "Euphyllia ancorab", "Euphyllia divisa", "Euphyllia paradivisa","Hammer_coral", "Euphyllia cristata", "Euphyllia paraglabrescens", "Euphyllia glabrescens", "Alveopora daedalea", "Tubastraea coccinea", "Tubastraea micrantha", "Scolymia vitiensis", "Catalaphyllia jardinei", "Catalaphyllia californiensis", "Balanophyllia elegans", "Echinopora horrida", "Leptoseris yabei", "Leptoseris hawaiiensis", "Alveopora excelsa", "Oxypora glabra", "Oxypora lacera", "Oxypora valdivae", "Duncanopsammia axifuga", "Duncanopsammia tredreae","Trumpet_coral", "Cynarina lacrymalis", "Black Coral (Antipatharia)", "Red Coral (Corallium rubrum)", "Precious Corals (Corallium species)", "Staghorn Coral (Acropora species)", "Table Corals (Acropora hyacinthus)", "Porites Corals", "Montipora Corals", "Faviidae Corals", "Pocillopora Corals", "Dendrophyllia Corals", "Millepora Corals", "Soft Corals (Sinularia and Sarcophyton)"]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    const sendFile = async () => {
      if (image) {
        let formData = new FormData();
        formData.append("file", selectedFile);
        try {
          const res = await axios.post('http://127.0.0.1:5000/predict', formData);
          console.log("Backend response:", res.data);
          if (res.status === 200) {
            console.log("Backend response:", res.data);
            setData(res.data);
            // Example of setting these when you get your prediction data

            if (res.data.predicted_class === 'Zoanthid') {
              setScientificName("Zoanthus sociatus (Scientific Name)");
              setDescription("Zoanthids are a diverse group of colonial cnidarians belonging to the order Zoantharia. They are commonly found in tropical and subtropical oceans worldwide, often forming colorful colonies on rocks, coral reefs, and other substrates. Zoanthids come in a wide range of colors and patterns, making them highly sought after by aquarium enthusiasts. They are known for their ability to thrive in a variety of environmental conditions and their rapid growth rate, making them popular additions to reef aquariums.");
              setHyperlink("https://en.wikipedia.org/wiki/Zoanthus_sociatus#:~:text=Zoanthus%20sociatus%2C%20commonly%20known%20as,from%20Caribbean%20to%20southeastern%20Brazil."); // Replace with your actual link
            } 
            else if (res.data.predicted_class === 'Hammer_coral') {
              setScientificName("Euphyllia ancora (Scientific Name)");
              setDescription("Hammer Coral, scientifically known as Euphyllia ancora, is a species of large polyp stony coral native to the Indo-Pacific region. It belongs to the family Euphylliidae. This coral is characterized by its hammer or anchor-shaped tentacles, which give it its common name. It typically has brown or greenish-brown coloration but can also display fluorescent hues under certain lighting conditions. Hammer corals are popular in reef aquariums due to their unique appearance and relative ease of care.");
              setHyperlink("https://en.wikipedia.org/wiki/Euphyllia_ancora#:~:text=Euphyllia%20ancora%20(reclassified%20in%202017,coral%2C%20or%20bubble%20honeycomb%20coral."); // Replace with your actual link
            }
            else if (res.data.predicted_class === 'Red_bubble_tip_anemone') {
              setScientificName("Entacmaea quadricolor (Scientific Name)");
              setDescription("The Red Bubble Tip Anemone, scientifically known as Entacmaea quadricolor, is a species of sea anemone belonging to the family Actiniidae. It is found in shallow waters of the Indo-Pacific region, typically inhabiting coral reefs and rocky substrates. This anemone is named for its distinctive reddish-brown or maroon-colored tentacles with bulbous tips. It forms symbiotic relationships with various species of clownfish, providing them with shelter and protection in exchange for food scraps and nutrients. Red Bubble Tip Anemones are popular in marine aquariums but require stable water conditions and appropriate lighting.");
              setHyperlink("https://en.wikipedia.org/wiki/Bubble-tip_anemone#:~:text=Bubble%2Dtip%20anemone%20(Entacmaea%20quadricolor,anemone%20in%20the%20family%20Actiniidae."); // Replace with your actual link
            }
            else if (res.data.predicted_class === 'Trumpet_coral') {
              setScientificName("Caulastraea furcata (Scientific Name)");
              setDescription("Trumpet Coral, scientifically known as Caulastrea curvata, is a species of stony coral belonging to the family Merulinidae. It is native to the Indo-Pacific region, where it is commonly found in shallow reef environments. Trumpet corals have elongated, tubular polyps that resemble the shape of a trumpet, hence their common name. They come in a variety of colors, including green, brown, and various shades of orange and red. Trumpet corals are relatively hardy and easy to care for, making them popular choices for beginner reef aquarium enthusiasts.");
              setHyperlink("https://en.wikipedia.org/wiki/Caulastraea_furcata#:~:text=Caulastraea%20furcata%2C%20also%20known%20as,coral%20in%20the%20family%20Merulinidae."); // Replace with your actual link
            } else {
              // For other predicted classes, set the default values
              setScientificName();
              setDescription("try again");
              setHyperlink("https://en.wikipedia.org/wiki/Coral");
              setLegality("none");
              
            }
            
            // Check if the predicted class is illegal
            if (illegalCoralNames.includes(res.data.predicted_class)) {
              setLegality("Illegal");
            } else {
              setLegality("Legal");
            }
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (preview) {
      setIsLoading(true);
      sendFile();
    }
  }, [preview, image, selectedFile]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleHistoryButtonClick = () => {
    // Add your code to handle the history button click
    navigate('/history'); 
  };
  
  let confidence = data ? (parseFloat(data.confidence) ).toFixed(2) : 0;

  return (
    <Layout>
    <React.Fragment>
      
      
      <Button color="inherit" onClick={handleHistoryButtonClick} sx={{ marginLeft:'10px',textAlign: 'left' }}>
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
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: '0em 1em 0 1em' }}>
          <Grid item xs={12}>
            <Card sx={{
              margin: 'auto',
              maxWidth: 550,
              height: 'auto',
              backgroundColor: image ? 'white' : 'transparent', 
              boxShadow: '0px 100px 70px 0px rgb(0 0 0 / 30%) !important',
              borderRadius: '15px',
              ...(image ? {} : { height: 'auto' }),
            }}>
              {image && <CardActionArea>
                <CardMedia sx={{ margin: '10px auto', maxWidth: 200, backgroundColor: 'transparent', boxShadow: '0px 100px 70px 0px rgb(0 0 0 / 30%) !important', borderRadius: '15px' }}
                  component="img"
                  height="200"
                  width="200"
                  image={preview}
                  alt="Uploaded image"
                />
              </CardActionArea>}
              {!image && <CardContent>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image of a coral reef image to process"}
                  onChange={onSelectFile}
                />
              </CardContent>}
              {data && <CardContent>
                <TableContainer component="div" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                  <Table sx={{ backgroundColor: 'transparent' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#000000a6', fontWeight: 'bold', fontSize: '12px'  }}>Predicted class</TableCell>
                        <TableCell align="right" sx={{ color: '#000000a6', fontWeight: 'bolder', fontSize: '12px' }}>Confidence</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" sx={{ color: 'black', fontWeight: 'bolder', fontSize: '14px' }}>
                          {data.predicted_class}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'black', fontWeight: 'bolder', fontSize: '14px' }}>
                          {confidence}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Card sx={{ margin: '0px auto', maxWidth: 600, backgroundColor: 'transparent', boxShadow: '0px 100px 70px 0px rgb(0 0 0 / 30%) !important', borderRadius: '15px' }}>
                  <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" component="div" sx={{ color: '#000000a6', fontSize: '14px', textDecoration: 'underline', marginBottom: '10px' }}>
                        <span style={{ color: 'red' }}>{scientificName}</span>
                      </Typography>
                      <Card sx={{ margin: '10px ', padding: '6px', width: 70, height: '15px', backgroundColor: legality === 'Illegal' ? '#fcbdbd' : '#b2f7d0', boxShadow: '0px 100px 70px 0px rgb(0 0 0 / 30%) !important', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography variant="body1" component="div" sx={{ color: '#000000a6', fontSize: '12px' }}>
                        {legality}
                      </Typography>
                    </Card>
                    </div>
                    <Typography variant="body1" component="div" sx={{ color: '#000000a6', fontSize: '12px', marginBottom: '4px' }}>
                      {description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#000000a6', marginTop: '10px', fontSize: '12px' }}>
                      Learn more at <a href={hyperlink} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>this link</a>.
                    </Typography>
                  </CardContent>
                </Card>
              </CardContent>}
              {isLoading && <CardContent>
                <CircularProgress color="secondary" />
                <Typography variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>
          {data && <Grid item sx={{ maxWidth: "416px",marginLeft:'700px', marginTop:'-30px', width: "100%" }}>
            <ColorButton variant="contained" onClick={clearData} startIcon={<Clear fontSize="large" />}>
              Clear
            </ColorButton>
          </Grid>}
        </Grid>
      </Container>
    </React.Fragment>
    </Layout>
  );
};

export default Classification;
