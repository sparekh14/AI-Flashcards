'use client';
import { SignUp } from "@clerk/clerk-react";
import { AppBar, Button, Container, Toolbar, Typography, Box } from "@mui/material";
import Link from "next/link";

export default function SignUpPage () {
    return (
        <Container maxWidth="100vw">
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' style={{ flexGrow: 1 }}>
                    <Button color="inherit" href="/">
                        <Typography>AI Flashcards</Typography>
                    </Button>
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>Login</Link>
                    </Button>

                    <Button color="inherit">
                        <Link href="/sign-up" passHref >Sign Up</Link> 
                    </Button>
                </Toolbar>
            </AppBar>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ my: 4 }}>
                <SignUp />
            </Box>
        </Container>
    )
}