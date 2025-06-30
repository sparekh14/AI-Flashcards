'use client'
import { useUser } from "@clerk/nextjs";
import { Box, ThemeProvider, AppBar, Toolbar, Container, TextField, Typography, Paper, Button, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from "@mui/material";
import { collection, doc, setDoc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { db } from "@/firebase";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { Psychology, AutoAwesome, Save, ViewModule, Lightbulb } from '@mui/icons-material';
import theme from '../theme';

export default function Generate() {
    const {isLoading, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [generating, setGenerating] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert('Please enter some text to generate flashcards')
            return
        }
        
        setGenerating(true)
        try {
            const response = await fetch('api/generate', {
                method: 'POST',
                body: text,
            })
            const data = await response.json()
            setFlashcards(data)
        } catch (error) {
            console.error('Error generating flashcards:', error)
            alert('Failed to generate flashcards. Please try again.')
        } finally {
            setGenerating(false)
        }
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name')
            return
        }
        
        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if(docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if(collections.find((f) => f.name === name)) {
                alert("Flashcard collection with the same name already exists")
                return
            }
            else {
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge: true})
            }
        }
        else {
            batch.set(userDocRef, {flashcards: [{name}]})
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
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
                    <Box className="hero-section" sx={{ py: 6, px: 4, mb: 6, textAlign: 'center' }}>
                        <AutoAwesome sx={{ fontSize: 48, color: '#ffd700', mb: 2 }} />
                        <Typography variant="h3" sx={{ mb: 2, color: 'white', fontWeight: 700 }}>
                            Generate AI Flashcards
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', mx: 'auto' }}>
                            Transform your study material into intelligent flashcards with the power of AI
                        </Typography>
                    </Box>

                    {/* Input Section */}
                    <Box className="glass-card" sx={{ p: 4, mb: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Lightbulb sx={{ mr: 2, color: '#ffd700', fontSize: 28 }} />
                            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                                Enter Your Study Material
                            </Typography>
                        </Box>
                        
                        <TextField 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            label="Paste your text, notes, or study material here..." 
                            fullWidth 
                            multiline 
                            rows={6} 
                            variant="outlined" 
                            sx={{ 
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    fontSize: '1.1rem',
                                    lineHeight: 1.6,
                                    '& .MuiOutlinedInput-input::placeholder': {
                                        color: 'rgba(0, 0, 0, 0.4)',
                                        opacity: 1,
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(0, 0, 0, 0.6)',
                                    '&.Mui-focused': {
                                        color: '#667eea',
                                    },
                                },
                            }}
                            placeholder="Example: The mitochondria is the powerhouse of the cell. It produces ATP through cellular respiration and plays a crucial role in energy metabolism. This organelle contains its own DNA and ribosomes, suggesting it evolved from ancient bacteria through endosymbiosis..."
                        />
                        
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button 
                                variant="contained" 
                                onClick={handleSubmit} 
                                disabled={generating || !text.trim()}
                                sx={{ 
                                    py: 2, 
                                    px: 4,
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #ff5252, #26a69a)',
                                    },
                                    '&:disabled': {
                                        background: 'rgba(255, 255, 255, 0.3)',
                                    }
                                }}
                                startIcon={generating ? <CircularProgress size={20} color="inherit" /> : <AutoAwesome />}
                            >
                                {generating ? 'Generating...' : 'Generate Flashcards'}
                            </Button>
                            
                            <Button 
                                variant="outlined" 
                                href="/flashcards"
                                sx={{ 
                                    py: 2, 
                                    px: 4,
                                    fontSize: '1.1rem',
                                    color: 'white',
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    '&:hover': {
                                        borderColor: 'white',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    }
                                }}
                                startIcon={<ViewModule />}
                            >
                                View Saved Collections
                            </Button>
                        </Box>
                    </Box>

                    {/* Flashcards Display */}
                    {flashcards.length > 0 && (
                        <Box>
                            <Typography variant="h4" sx={{ mb: 4, color: 'white', fontWeight: 700, textAlign: 'center' }}>
                                Generated Flashcards ({flashcards.length})
                            </Typography>
                            
                            <Grid container spacing={3} sx={{ mb: 4 }}>
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
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Button 
                                    variant="contained" 
                                    size="large"
                                    onClick={handleOpen}
                                    sx={{ 
                                        py: 2, 
                                        px: 6,
                                        fontSize: '1.2rem',
                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                                        }
                                    }}
                                    startIcon={<Save />}
                                >
                                    Save Flashcards
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {/* Save Dialog */}
                    <Dialog 
                        open={open} 
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 3,
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                            }
                        }}
                    >
                        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
                            Save Flashcard Collection
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{ mb: 3, color: '#666' }}>
                                Give your flashcard collection a memorable name so you can easily find it later.
                            </DialogContentText>
                            <TextField 
                                autoFocus 
                                margin="dense" 
                                label="Collection Name" 
                                type="text" 
                                fullWidth 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    }
                                }}
                                placeholder="e.g., Biology Chapter 5, Spanish Vocabulary..."
                            />
                        </DialogContent>
                        <DialogActions sx={{ p: 3, pt: 1 }}>
                            <Button 
                                onClick={handleClose}
                                sx={{ 
                                    color: '#666',
                                    '&:hover': {
                                        background: 'rgba(0, 0, 0, 0.05)',
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={saveFlashcards}
                                variant="contained"
                                disabled={!name.trim()}
                                sx={{
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                                    }
                                }}
                            >
                                Save Collection
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
