import React, {useState} from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TextField} from "@mui/material";

function App() {

    const [data, setData] = useState({data: []});
    const [isLoading, setIsLoading] = useState(false);

    const searchCocktail = async (cocktail : string) => {
        setIsLoading(true);
        try{
            const response = await fetch(`https://api.api-ninjas.com/v1/cocktail?name=${cocktail}`)
            const newData = await response.json();
            setData(newData);
            console.log(data);
            console.log(cocktail);
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="App">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Welcome Tipsy Bartender !
                    </Typography>
                    <hr/>
                    <Typography sx={{ fontSize: 16 }} component="div">
                        Please search your favorites cocktails here.
                    </Typography>
                    <TextField fullWidth id="outlined-basic" size={"small"} label="Cocktail" variant="outlined" />
                </CardContent>
                <CardActions>
                    <LoadingButton variant={"contained"} onClick={() => searchCocktail("vodka")}>
                        Search!
                    </LoadingButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default App;
