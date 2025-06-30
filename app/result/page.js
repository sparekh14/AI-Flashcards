'use client'
import {useEffect, useState} from 'react'
import{useRouter} from 'next/navigation'
import getStripe from '@/utils/get-stripe'
import { useSearchParams } from 'next/navigation'
import { Box, CircularProgress, Container, Typography, Button, AppBar, Toolbar, ThemeProvider, Card, CardContent } from '@mui/material'
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs'
import { CheckCircle, Error, Psychology, Home, CreditCard } from '@mui/icons-material'
import theme from '../theme'

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if(!session_id) return

            try {
                const res = await fetch(`/api/pro_checkout?session_id=${session_id}`)
                const sessionData = await res.json()
                
                if(res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            }
            catch(error) {
                setError("An error occurred")
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    if(loading) {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
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
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            minHeight: '60vh' 
                        }}>
                            <CircularProgress 
                                size={60} 
                                sx={{ 
                                    color: 'white',
                                    mb: 3
                                }} 
                            />
                            <Typography 
                                variant='h5' 
                                sx={{ 
                                    color: 'white',
                                    fontWeight: 600
                                }}
                            >
                                Processing your payment...
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        )
    }

    if(error) {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
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
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            minHeight: '60vh' 
                        }}>
                            <Card sx={{ 
                                maxWidth: 500, 
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                p: 4
                            }}>
                                <CardContent>
                                    <Error sx={{ fontSize: 64, color: '#f56565', mb: 2 }} />
                                    <Typography variant='h4' sx={{ mb: 2, fontWeight: 700, color: '#2d3748' }}>
                                        Something went wrong
                                    </Typography>
                                    <Typography variant='body1' sx={{ mb: 4, color: '#4a5568' }}>
                                        {error}
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        href="/"
                                        startIcon={<Home />}
                                        sx={{
                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                                            }
                                        }}
                                    >
                                        Back to Home
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
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
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        minHeight: '60vh' 
                    }}>
                        {session.payment_status === "paid" ? (
                            <Card sx={{ 
                                maxWidth: 600, 
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                p: 4
                            }}>
                                <CardContent>
                                    <CheckCircle sx={{ fontSize: 80, color: '#48bb78', mb: 3 }} />
                                    <Typography variant='h3' sx={{ mb: 2, fontWeight: 800, color: '#2d3748' }}>
                                        Payment Successful!
                                    </Typography>
                                    <Typography variant='h6' sx={{ mb: 3, color: '#4a5568' }}>
                                        Thank you for your purchase
                                    </Typography>
                                    <Box sx={{ 
                                        background: 'rgba(102, 126, 234, 0.1)', 
                                        borderRadius: 2, 
                                        p: 3, 
                                        mb: 3,
                                        border: '1px solid rgba(102, 126, 234, 0.2)'
                                    }}>
                                        <Typography variant='body2' sx={{ fontWeight: 600, color: '#4a5568', mb: 1 }}>
                                            Session ID:
                                        </Typography>
                                        <Typography 
                                            variant='body2' 
                                            sx={{ 
                                                fontFamily: 'monospace', 
                                                color: '#2d3748',
                                                wordBreak: 'break-all',
                                                overflowWrap: 'anywhere',
                                                lineHeight: 1.4
                                            }}
                                        >
                                            {session.id}
                                        </Typography>
                                    </Box>
                                    <Typography variant='body1' sx={{ mb: 4, color: '#4a5568', lineHeight: 1.6 }}>
                                        We have received your payment. You will receive an email confirmation shortly with your order details.
                                        You can now start creating unlimited flashcards!
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <Button 
                                            variant="contained" 
                                            href="/generate"
                                            size="large"
                                            sx={{
                                                background: 'linear-gradient(45deg, #48bb78, #38a169)',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #38a169, #2f855a)',
                                                }
                                            }}
                                        >
                                            Start Creating Flashcards
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            href="/"
                                            size="large"
                                            startIcon={<Home />}
                                            sx={{
                                                borderColor: '#667eea',
                                                color: '#667eea',
                                                '&:hover': {
                                                    borderColor: '#5a67d8',
                                                    background: 'rgba(102, 126, 234, 0.1)'
                                                }
                                            }}
                                        >
                                            Back to Home
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card sx={{ 
                                maxWidth: 600, 
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                p: 4
                            }}>
                                <CardContent>
                                    <CreditCard sx={{ fontSize: 80, color: '#f56565', mb: 3 }} />
                                    <Typography variant='h3' sx={{ mb: 2, fontWeight: 800, color: '#2d3748' }}>
                                        Payment Failed
                                    </Typography>
                                    <Typography variant='h6' sx={{ mb: 3, color: '#4a5568' }}>
                                        Something went wrong with your payment
                                    </Typography>
                                    <Box sx={{ 
                                        background: 'rgba(245, 101, 101, 0.1)', 
                                        borderRadius: 2, 
                                        p: 3, 
                                        mb: 3,
                                        border: '1px solid rgba(245, 101, 101, 0.2)'
                                    }}>
                                        <Typography variant='body2' sx={{ fontWeight: 600, color: '#4a5568', mb: 1 }}>
                                            Session ID:
                                        </Typography>
                                        <Typography 
                                            variant='body2' 
                                            sx={{ 
                                                fontFamily: 'monospace', 
                                                color: '#2d3748',
                                                wordBreak: 'break-all',
                                                overflowWrap: 'anywhere',
                                                lineHeight: 1.4
                                            }}
                                        >
                                            {session.id}
                                        </Typography>
                                    </Box>
                                    <Typography variant='body1' sx={{ mb: 4, color: '#4a5568', lineHeight: 1.6 }}>
                                        Your payment was not successful. Please try again or contact support if the issue persists.
                                        No charges have been made to your account.
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <Button 
                                            variant="contained" 
                                            href="/#pricing"
                                            size="large"
                                            sx={{
                                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                                                }
                                            }}
                                        >
                                            Try Again
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            href="/"
                                            size="large"
                                            startIcon={<Home />}
                                            sx={{
                                                borderColor: '#667eea',
                                                color: '#667eea',
                                                '&:hover': {
                                                    borderColor: '#5a67d8',
                                                    background: 'rgba(102, 126, 234, 0.1)'
                                                }
                                            }}
                                        >
                                            Back to Home
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        )}
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default ResultPage