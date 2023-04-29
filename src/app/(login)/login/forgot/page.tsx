"use client";

import { api } from "@/libs/api";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useState, FormEvent } from "react";

const Page = () =>{
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState (false);
    const [ emailField, setEmailFild] = useState('');
   

    const handleSubmit = async (event: FormEvent <HTMLFormElement>) =>{
        event.preventDefault();

        if(!emailField ){
            setError('Preencha o seu e-mail');
            return;
        }
        setError('');
        setInfo('');
        setLoading(true);
        const result = await api.forgotPassword(emailField);
        setLoading(false);
        if(result.error){
            setError(result.error);
        }else{
            setInfo("Enviamos para seu e-mail o link de recuperar senha.")
        }

    }
    return (
       <>
       <Typography component = "p" sx={{ textAlign: 'center', mt: 2, color: '#555'}}>Esqueceu a senha!</Typography>

        <Box component= "form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
             label= "Digite seu e-mail"
             name= "email"
            //  required
             fullWidth
             autoFocus
             sx={{ mb: 2 }}
             onChange={e => setEmailFild(e.target.value)}
             value={emailField}
             disabled={loading}
             />
            
            <Button
                type= "submit"
                variant= "contained"
                fullWidth
                disabled={loading}
                
            >{loading ? 'Carregando...' : 'Recuperar a senha'} </Button>

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