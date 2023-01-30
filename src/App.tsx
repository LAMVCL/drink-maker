import React, { useState} from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardMedia, Container, Grid, TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';

interface Drink{
    idDrink: string;
    strDrink: string;
    strTags: string;
    strDrinkAlternate: any;
}
function App() {

    const [data, setData] = useState({drinks: []} as { drinks: Drink[]; } | any);
    const [isLoading, setIsLoading] = useState(false);
    const [fullSize, setFullSize] = useState(false);
    const [myStyle, setMyStyle] = useState({} as any);

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        let cocktail = e.target.cocktail.value;
        setIsLoading(true);
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
        const newData = await response.json();
        setData(newData);
        setIsLoading(false);
        console.log(newData);
    }

    const toggleFullSize = (idDrink: string) => {
        setMyStyle((prevState: { [x: string]: any; }) => ({
            ...myStyle,
            [idDrink]: !prevState[idDrink]
        }))
        fullSize ? setFullSize(false) : setFullSize(true);
    }

    return (
        <div className="App">
            <div className="main-form">
                <form onSubmit={handleSubmit}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                Welcome Tipsy Bartender !
                            </Typography>
                            <hr/>
                            <Typography sx={{ fontSize: 16 }} mb={1} component="div">
                                Please search your favorites cocktails here.
                            </Typography>
                            <FormControl fullWidth={true}>
                                <TextField  id="outlined-basic"
                                           size={"small"} label="Cocktail" name="cocktail" variant="outlined"
                                />
                            </FormControl>
                            <div className="search-button" >
                                <LoadingButton variant={"contained"} loading={isLoading} type="submit" >
                                    Search!
                                </LoadingButton>
                            </div>

                        </CardContent>
                    </Card>
                </form>
            </div>
            <Container className='container' fixed={true}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                    {data.drinks.map((drink: any) => (
                        <Grid item={true} xs={2} sm={4} md={4} key={drink.idDrink} >
                            <Card sx={{ minWidth: 275 }} key={drink.idDrink}
                                  style={{
                                      height: myStyle[`${drink.idDrink}`]
                                          ? "100%"
                                          : "350px"
                                  }}
                                  onClick={() => toggleFullSize(drink.idDrink)}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={drink.strDrinkThumb}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {drink.strDrink}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Ingredients:
                                        </Typography>
                                        <ul>
                                            {drink.strIngredient1 === null ? '' :
                                                <li>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {drink.strIngredient1} {drink.strMeasure1}
                                                    </Typography>
                                                </li>
                                            }
                                            {drink.strIngredient2 === null ? '' :
                                                <li>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {drink.strIngredient2} {drink.strMeasure2}
                                                    </Typography>
                                                </li>
                                            }
                                            {drink.strIngredient3 === null ? '' :
                                                <li>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {drink.strIngredient3} {drink.strMeasure3}
                                                    </Typography>
                                                </li>
                                            }
                                            {drink.strIngredient4 === null ? '' :
                                                <li>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {drink.strIngredient4} {drink.strMeasure4}
                                                    </Typography>
                                                </li>
                                            }
                                            {drink.strIngredient5 === null ? '' :
                                                <li>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {drink.strIngredient5} {drink.strMeasure5}
                                                    </Typography>
                                                </li>
                                            }
                                            {drink.strIngredient6 === null ? '' :
                                                <li>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {drink.strIngredient6} {drink.strMeasure6}
                                                    </Typography>
                                                </li>
                                            }
                                        </ul>
                                        <Typography variant="body2" color="text.secondary" >
                                            {drink.strInstructions}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        )
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
