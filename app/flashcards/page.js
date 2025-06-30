'use client'
import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc, deleteDoc, writeBatch, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { Container, Grid, Card, CardActionArea, CardContent, Typography, AppBar, Toolbar, Button, Box, ThemeProvider, Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { Psychology, LibraryBooks, Add, FolderOpen, MoreVert, Edit, Delete, School } from '@mui/icons-material';
import theme from '../theme';

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [selectedCollection, setSelectedCollection] = useState(null)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [newCollectionName, setNewCollectionName] = useState('')
    const [editingCollection, setEditingCollection] = useState(null)
    const [deletingCollection, setDeletingCollection] = useState(null)
    const router = useRouter()
    
    useEffect(() => {
        async function getFlashcards() {
            if (!user) return

            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            }
            else {
                await setDoc(docRef, {flashcards: []})
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    const handleMenuOpen = (event, flashcard) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
        setSelectedCollection(flashcard)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setSelectedCollection(null)
    }

    const handleEditClick = () => {
        if (selectedCollection) {
            setEditingCollection(selectedCollection)
            setNewCollectionName(selectedCollection.name)
            setEditDialogOpen(true)
        }
        handleMenuClose()
    }

    const handleDeleteClick = () => {
        if (selectedCollection) {
            setDeletingCollection(selectedCollection)
            setDeleteDialogOpen(true)
        }
        handleMenuClose()
    }

    const handleEditSave = async () => {
        if (!newCollectionName.trim()) {
            alert('Please enter a collection name')
            return
        }

        if (!editingCollection) {
            alert('No collection selected')
            setEditDialogOpen(false)
            return
        }

        if (newCollectionName === editingCollection.name) {
            setEditDialogOpen(false)
            setEditingCollection(null)
            return
        }

        // Check if new name already exists
        if (flashcards.find(f => f.name === newCollectionName && f.name !== editingCollection.name)) {
            alert('A collection with this name already exists')
            return
        }

        try {
            const batch = writeBatch(db)
            const userDocRef = doc(collection(db, 'users'), user.id)
            
            // Update the flashcards array with new name
            const updatedFlashcards = flashcards.map(f => 
                f.name === editingCollection.name ? { name: newCollectionName } : f
            )
            batch.set(userDocRef, { flashcards: updatedFlashcards }, { merge: true })

            // Get all documents from old collection
            const oldCollectionRef = collection(userDocRef, editingCollection.name)
            const oldDocs = await getDocs(oldCollectionRef)
            
            // Copy documents to new collection
            const newCollectionRef = collection(userDocRef, newCollectionName)
            oldDocs.forEach(docSnap => {
                const newDocRef = doc(newCollectionRef)
                batch.set(newDocRef, docSnap.data())
            })

            // Delete old collection documents
            oldDocs.forEach(docSnap => {
                batch.delete(docSnap.ref)
            })

            await batch.commit()
            
            // Update local state
            setFlashcards(updatedFlashcards)
            setEditDialogOpen(false)
            setEditingCollection(null)
        } catch (error) {
            console.error('Error updating collection:', error)
            alert('Failed to update collection. Please try again.')
        }
    }

    const handleDeleteConfirm = async () => {
        if (!deletingCollection) {
            alert('No collection selected')
            setDeleteDialogOpen(false)
            return
        }

        try {
            const batch = writeBatch(db)
            const userDocRef = doc(collection(db, 'users'), user.id)
            
            // Remove collection from flashcards array
            const updatedFlashcards = flashcards.filter(f => f.name !== deletingCollection.name)
            batch.set(userDocRef, { flashcards: updatedFlashcards }, { merge: true })

            // Delete all documents in the collection
            const collectionRef = collection(userDocRef, deletingCollection.name)
            const docs = await getDocs(collectionRef)
            docs.forEach(docSnap => {
                batch.delete(docSnap.ref)
            })

            await batch.commit()
            
            // Update local state
            setFlashcards(updatedFlashcards)
            setDeleteDialogOpen(false)
            setDeletingCollection(null)
        } catch (error) {
            console.error('Error deleting collection:', error)
            alert('Failed to delete collection. Please try again.')
        }
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
                        <LibraryBooks sx={{ fontSize: 48, color: '#ffd700', mb: 2 }} />
                        <Typography variant="h3" sx={{ mb: 2, color: 'white', fontWeight: 700 }}>
                            Your Flashcard Collections
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', mx: 'auto', mb: 4 }}>
                            Access all your saved flashcard collections and continue your learning journey
                        </Typography>
                        
                        <Button 
                            variant="contained" 
                            href="/generate"
                            size="large"
                            sx={{ 
                                py: 2, 
                                px: 4,
                                fontSize: '1.1rem',
                                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #ff5252, #26a69a)',
                                }
                            }}
                            startIcon={<Add />}
                        >
                            Create New Collection
                        </Button>
                    </Box>

                    {/* Collections Grid */}
                    {flashcards.length === 0 ? (
                        <Box className="glass-card" sx={{ p: 8, textAlign: 'center' }}>
                            <FolderOpen sx={{ fontSize: 80, color: 'rgba(255, 255, 255, 0.5)', mb: 3 }} />
                            <Typography variant="h4" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                No Collections Yet
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}>
                                Create your first flashcard collection to get started with AI-powered learning
                            </Typography>
                            <Button 
                                variant="contained" 
                                href="/generate"
                                size="large"
                                sx={{ 
                                    py: 2, 
                                    px: 6,
                                    fontSize: '1.2rem',
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                                    }
                                }}
                                startIcon={<Add />}
                            >
                                Generate Your First Flashcards
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={4}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card 
                                        className="feature-card" 
                                        sx={{ 
                                            height: 220,
                                            background: 'rgba(255, 255, 255, 0.15)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                                            }
                                        }}
                                    >
                                        {/* Menu Button */}
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                color: 'white',
                                                background: 'rgba(0, 0, 0, 0.2)',
                                                '&:hover': {
                                                    background: 'rgba(0, 0, 0, 0.4)',
                                                },
                                                zIndex: 2,
                                            }}
                                            onClick={(e) => handleMenuOpen(e, flashcard)}
                                        >
                                            <MoreVert />
                                        </IconButton>

                                        <CardActionArea 
                                            onClick={() => handleCardClick(flashcard.name)}
                                            sx={{ height: '100%', p: 3 }}
                                        >
                                            <CardContent sx={{ 
                                                height: '100%', 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                justifyContent: 'center', 
                                                alignItems: 'center', 
                                                textAlign: 'center',
                                                pt: 4 // Add top padding to account for menu button
                                            }}>
                                                <LibraryBooks sx={{ fontSize: 48, color: '#4ecdc4', mb: 2 }} />
                                                <Typography 
                                                    variant="h5" 
                                                    sx={{ 
                                                        color: 'white', 
                                                        fontWeight: 600,
                                                        wordBreak: 'break-word',
                                                        hyphens: 'auto',
                                                        lineHeight: 1.3,
                                                        mb: 1,
                                                        maxHeight: '3.9em', // Allow for 3 lines
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                    title={flashcard.name} // Show full name on hover
                                                >
                                                    {flashcard.name}
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    sx={{ 
                                                        color: 'rgba(255, 255, 255, 0.7)', 
                                                        fontWeight: 500,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.5
                                                    }}
                                                >
                                                    <School fontSize="small" />
                                                    Click to study
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>

                {/* Context Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }
                    }}
                >
                    <MenuItem onClick={() => handleCardClick(selectedCollection?.name)} sx={{ gap: 1 }}>
                        <School fontSize="small" />
                        Study Collection
                    </MenuItem>
                    <MenuItem onClick={handleEditClick} sx={{ gap: 1 }}>
                        <Edit fontSize="small" />
                        Rename Collection
                    </MenuItem>
                    <MenuItem onClick={handleDeleteClick} sx={{ gap: 1, color: '#f56565' }}>
                        <Delete fontSize="small" />
                        Delete Collection
                    </MenuItem>
                </Menu>

                {/* Edit Dialog */}
                <Dialog 
                    open={editDialogOpen} 
                    onClose={() => {
                        setEditDialogOpen(false)
                        setEditingCollection(null)
                    }}
                    PaperProps={{
                        sx: {
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }
                    }}
                >
                    <DialogTitle sx={{ fontWeight: 600 }}>Rename Collection</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ mb: 2 }}>
                            Enter a new name for your collection &quot;{editingCollection?.name || 'Unknown Collection'}&quot;
                        </DialogContentText>
                        <TextField
                            autoFocus
                            fullWidth
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            variant="outlined"
                            sx={{ mt: 1 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setEditDialogOpen(false)
                            setEditingCollection(null)
                        }}>Cancel</Button>
                        <Button 
                            onClick={handleEditSave} 
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                                }
                            }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog 
                    open={deleteDialogOpen} 
                    onClose={() => {
                        setDeleteDialogOpen(false)
                        setDeletingCollection(null)
                    }}
                    PaperProps={{
                        sx: {
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }
                    }}
                >
                    <DialogTitle sx={{ fontWeight: 600, color: '#f56565' }}>Delete Collection</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the collection &quot;{deletingCollection?.name || 'Unknown Collection'}&quot;? 
                            This action cannot be undone and all flashcards in this collection will be permanently deleted.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setDeleteDialogOpen(false)
                            setDeletingCollection(null)
                        }}>Cancel</Button>
                        <Button 
                            onClick={handleDeleteConfirm} 
                            variant="contained"
                            sx={{
                                background: '#f56565',
                                '&:hover': {
                                    background: '#e53e3e',
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    )
}