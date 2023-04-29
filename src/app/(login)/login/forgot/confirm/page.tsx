"use client";

import { api } from "@/libs/api";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useState, FormEvent } from "react";

const Page = () =>{
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState (false);
    const [passwordField, setPasswordField] = useState('');
    const [passwordField2, setPasswordField2] = useState('');
   

    const handleSubmit = async (event: FormEvent <HTMLFormElement>) =>{
        event.preventDefault();

        if(!passwordField || !passwordField2){
            setError('Digite sua nova senha.');
            return;
        }
        if(passwordField !== passwordField2){
            setError('A senha estar diferente.');
            return;
        }

        setError('');
        setInfo('');
        setLoading(true);
        const result = await api.redefinePassword(passwordField,'123');
        setLoading(false);
        if(result.error){
            setError(result.error);
        }else{
            setInfo("Senha já redefinida, faça o login agora.");
            setPasswordField('');
            setPasswordField2('');
        }

    }
    return (
       <>
       <Typography component = "p" sx={{ textAlign: 'center', mt: 2, color: '#555'}}>Olá **USUARIO**, defina sua nova senha.</Typography>

        <Box component= "form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
             label= "Digite sua nova senha"
             name="password"
             type="password"
             fullWidth
             autoFocus
             sx={{ mb: 2 }}
             onChange={e => setPasswordField(e.target.value)}
             value={passwordField}
             disabled={loading}
             />
              <TextField
             label= "Confirme sua nova senha"
             name="password2"
             type="password"
             fullWidth
             autoFocus
             sx={{ mb: 2 }}
             onChange={e => setPasswordField2(e.target.value)}
             value={passwordField2}
             disabled={loading}
             />
            
            <Button
                type= "submit"
                variant= "contained"
                fullWidth
                disabled={loading}
                
            >{loading ? 'Carregando...' : 'Definir nova senha'} </Button>

            {error &&
            <Alert variant="filled" severity="error" sx={{mt: 3}}>{error}</Alert>
           } 
           {info &&
            <Alert variant="filled" severity="success" sx={{mt: 3}}>{info}</Alert>
           }   
           
        </Box>
       </>
    );
}

export default Page;