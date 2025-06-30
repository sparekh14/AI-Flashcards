'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, ThemeProvider } from "@mui/material";
import { AutoAwesome, Psychology, Devices, Speed, Star, Rocket } from '@mui/icons-material';
import Head from "next/head";
import theme from './theme';

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
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Head>
          <title>AI Flashcards - Smart Learning Made Simple</title>
          <meta name='description' content='Transform any text into intelligent flashcards with AI. Study smarter, not harder.' />
        </Head>

        <AppBar position='static' elevation={0}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Psychology sx={{ mr: 1, color: 'white', fontSize: 28 }} />
              <Button color="inherit" href="/" sx={{ textTransform: 'none' }}>
                <Typography variant='h6' sx={{ fontWeight: 700, color: 'white' }}>
                  AI Flashcards
                </Typography>
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SignedOut>
                <Button 
                  variant="outlined" 
                  href="/sign-in" 
                  sx={{ 
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  href="/sign-up"
                  sx={{
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ff5252, #26a69a)',
                    }
                  }}
                >
                  Sign Up
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
          {/* Hero Section */}
          <Box className="hero-section" sx={{ py: 10, px: 6, mb: 10, textAlign: 'center' }}>
            <Box className="floating">
              <AutoAwesome sx={{ fontSize: 64, color: '#ffd700', mb: 3 }} />
            </Box>
            <Typography 
              variant='h1' 
              className="gradient-text"
              sx={{ mb: 3, fontWeight: 800 }}
            >
              AI-Powered Flashcards
            </Typography>
            <Typography 
              variant='h5' 
              sx={{ 
                mb: 5, 
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Transform any text into intelligent flashcards with GPT-4. 
              Study smarter, retain more, and achieve your learning goals faster.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                href="/generate"
                className="pulse-button"
                sx={{ 
                  py: 2, 
                  px: 5,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff5252, #26a69a)',
                    transform: 'translateY(-3px)',
                  }
                }}
                startIcon={<Rocket />}
              >
                Start Creating
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                href="#features"
                sx={{ 
                  py: 2, 
                  px: 5,
                  fontSize: '1.2rem',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>

          {/* Features Section */}
          <Box id="features" sx={{ mb: 10 }}>
            <Typography 
              variant='h3' 
              sx={{ 
                textAlign: 'center', 
                mb: 8, 
                color: 'white',
                fontWeight: 700
              }}
            >
              Intelligent Learning Features
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box className="feature-card" sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                  <Speed sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
                  <Typography variant='h5' sx={{ mb: 2, fontWeight: 600, color: 'white' }}>
                    Lightning Fast AI
                  </Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                    Generate 12 optimized flashcards in seconds using OpenAI's GPT-4. 
                    No more manual card creation.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box className="feature-card" sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                  <Psychology sx={{ fontSize: 48, color: '#4ecdc4', mb: 2 }} />
                  <Typography variant='h5' sx={{ mb: 2, fontWeight: 600, color: 'white' }}>
                    Smart Content Analysis
                  </Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                    AI intelligently identifies key concepts and creates perfect 
                    question-answer pairs for optimal learning.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box className="feature-card" sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                  <Devices sx={{ fontSize: 48, color: '#ff6b6b', mb: 2 }} />
                  <Typography variant='h5' sx={{ mb: 2, fontWeight: 600, color: 'white' }}>
                    Study Anywhere
                  </Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                    Beautiful, responsive design works perfectly on any device. 
                    Study at home, on the go, or anywhere.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Pricing Section */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant='h3' 
              sx={{ 
                textAlign: 'center', 
                mb: 8, 
                color: 'white',
                fontWeight: 700
              }}
            >
              Choose Your Learning Journey
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={5}>
                <Box className="pricing-card" sx={{ p: 6, textAlign: 'center', height: '100%' }}>
                  <Typography variant='h4' sx={{ mb: 2, fontWeight: 700, color: 'white' }}>
                    Basic
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant='h2' sx={{ fontWeight: 800, color: '#667eea' }}>
                      $5
                    </Typography>
                    <Typography variant='h6' sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      per month
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                    Perfect for students getting started with AI-powered learning. 
                    Essential features with limited storage.
                  </Typography>
                  <Button 
                    variant='contained' 
                    size="large"
                    fullWidth
                    onClick={handleBasicCheckout}
                    sx={{ 
                      py: 2,
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Box className="pricing-card featured" sx={{ p: 6, textAlign: 'center', height: '100%', position: 'relative' }}>
                  <Box sx={{ position: 'absolute', top: -12, right: 20 }}>
                    <Star sx={{ color: '#ffd700', fontSize: 32 }} />
                  </Box>
                  <Typography variant='h4' sx={{ mb: 2, fontWeight: 700, color: 'white' }}>
                    Pro
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant='h2' sx={{ fontWeight: 800, color: '#ff6b6b' }}>
                      $10
                    </Typography>
                    <Typography variant='h6' sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      per month
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                    Unlimited flashcards, priority support, and exclusive features. 
                    Perfect for serious learners and professionals.
                  </Typography>
                  <Button 
                    variant='contained' 
                    size="large"
                    fullWidth
                    onClick={handleProCheckout}
                    sx={{ 
                      py: 2,
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #ff5252, #26a69a)',
                      }
                    }}
                  >
                    Go Pro
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}