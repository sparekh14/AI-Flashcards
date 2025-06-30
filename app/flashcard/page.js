'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { Box, Container, TextField, Typography, Paper, Button, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ThemeProvider, AppBar, Toolbar } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { Psychology, Quiz, ArrowBack, LibraryBooks } from '@mui/icons-material';
import theme from '../theme';

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return

            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
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

                <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
                    {/* Header Section */}
                    <Box className="hero-section" sx={{ py: 4, px: 4, mb: 6, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                            <Button 
                                variant="outlined" 
                                href="/flashcards"
                                sx={{ 
                                    mr: 3,
                                    color: 'white',
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    '&:hover': {
                                        borderColor: 'white',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    }
                                }}
                                startIcon={<ArrowBack />}
                            >
                                Back to Collections
                            </Button>
                        </Box>
                        
                        <Quiz sx={{ fontSize: 48, color: '#ffd700', mb: 2 }} />
                        <Typography variant="h3" sx={{ mb: 2, color: 'white', fontWeight: 700 }}>
                            {search || 'Study Session'}
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', mx: 'auto' }}>
                            {flashcards.length} flashcards • Click cards to flip and reveal answers
                        </Typography>
                    </Box>

                    {/* Flashcards Grid */}
                    {flashcards.length === 0 ? (
                        <Box className="glass-card" sx={{ p: 8, textAlign: 'center' }}>
                            <LibraryBooks sx={{ fontSize: 80, color: 'rgba(255, 255, 255, 0.5)', mb: 3 }} />
                            <Typography variant="h4" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                Loading Flashcards...
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Please wait while we load your study material
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={4}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card className="flashcard" sx={{ height: 280, cursor: 'pointer' }}>
                                        <CardActionArea onClick={() => handleCardClick(index)} sx={{ height: '100%' }}>
                                            <CardContent sx={{ height: '100%', p: 0 }}>
                                                <Box sx={{
                                                    perspective: '1000px',
                                                    height: '100%',
                                                    '& > div': {
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '100%',
                                                        transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                    },
                                                    '& > div > div': {
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 3,
                                                        boxSizing: 'border-box',
                                                        borderRadius: '20px',
                                                    },
                                                    '& > div > div:nth-of-type(1)': {
                                                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                        color: 'white',
                                                    },
                                                    '& > div > div:nth-of-type(2)': {
                                                        background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                                                        color: 'white',
                                                        transform: 'rotateY(180deg)',
                                                    },
                                                }}>
                                                    <div>
                                                        <div>
                                                            <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontWeight: 600 }}>
                                                                {flashcard.front}
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontWeight: 600 }}>
                                                                {flashcard.back}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>
        </ThemeProvider>
    )
}