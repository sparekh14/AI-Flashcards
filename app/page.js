'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import Head from "next/head";

export default function Home() {
  const handleProCheckout = async () => {
    const checkoutSession = await fetch('/api/pro_checkout', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
    })

    const checkoutSessionJSON = await checkoutSession.json()

    if(checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJSON.id
    })

    if(error) {
      console.warn(error.message);
    }
  }

  const handleBasicCheckout = async () => {
    const checkoutSession = await fetch('/api/basic_checkout', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
    })

    const checkoutSessionJSON = await checkoutSession.json()

    if(checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJSON.id
    })

    if(error) {
      console.warn(error.message);
    }
  }

  return (    
    <Container maxWidth = "100vw">
        <Head>
          <title>AI Flashcards</title>
          <meta name='description' content='Create flashcards for all your needs' />
        </Head>

        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' style={{ flexGrow: 1 }}>
              <Button color="inherit" href="/">
                <Typography>AI Flashcards</Typography>
              </Button>
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box sx={{ my: 4, textAlign: 'center'}}>
          <Typography variant='h2'>Welcome to AI Flashcards</Typography>
          <Typography variant='h5'>
            {' '}
            The easiest way to make flashcards from your text
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/generate">Get Started</Button>
        </Box>

        <Box sx = {{my: 6, textAlign: 'center'}}>
          <Typography variant='h4' gutterBottom>Features</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx = {{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
                <Typography variant = 'h5' gutterBottom>Easy Text Input</Typography>
                <Typography>
                  {' '}
                  Simply input your text and let our software do the rest. Creating flashcards has never been easier
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx = {{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
                <Typography variant='h5' gutterBottom>Smart Flashcards</Typography>
                <Typography>
                  {' '}
                  Our AI intelligently breaks down your text into concise flashcards, perfect for studying
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx = {{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
                <Typography variant='h5' gutterBottom>Accessible Anywhere</Typography>
                <Typography>
                  {' '}
                  Access your flashcards from any device, at any time. Study on the go with ease.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx = {{my: 6, textAlign: 'center'}}>
          <Typography variant='h4' gutterBottom>Pricing</Typography>
          <Grid container spacing={4}> 
            <Grid item xs={12} md={6}>
              <Box sx = {{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
                <Typography variant = 'h5'>Basic</Typography>
                <Typography variant = 'h6' gutterBottom>$5/month</Typography>
                <Typography>
                  {' '}
                  Access to basic flashcard features and limited storage
                </Typography>
                <Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={handleBasicCheckout}>Choose Basic</Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
            <Box sx = {{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
              <Typography variant = 'h5'>Pro</Typography>
              <Typography variant = 'h6' gutterBottom>$10/month</Typography>
                <Typography>
                  {' '}
                  Unlimited flashcards and storage, with priority support
                </Typography>
                <Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={handleProCheckout}>Choose Pro</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
    </Container>
  )
}