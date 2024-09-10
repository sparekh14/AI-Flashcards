'use client'
import {useEffect, useState} from 'react'
import{useRouter} from 'next/navigation'
import getStripe from '@/utils/get-stripe'
import { useSearchParams } from 'next/navigation'
import { Box, CircularProgress, Container, Typography, Button, AppBar, Toolbar } from '@mui/material'
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs'

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
            <Container maxWidth = "100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant='h6'> </Typography>
            </Container>
        )
    }

    if(error) {
        return (
            <Container maxWidth = "100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant='h6'>{error}</Typography>
            </Container>
        )
    }

    return (
        <Container container maxWidth = "100vw">
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

            {session.payment_status === "paid" ? (
                <>
                    <Typography variant='h4'>Thank you for purchasing</Typography>
                    <Box sx={{ mt: 22 }}>
                        <Typography variant='h6'>Session ID: {session.id}</Typography>
                        <Typography variant='body1'>
                            We have received your payment. You will receive an email shortly with the order details.
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant='h4' sx={{ mt: 4, textAlign: 'center'}}>Payment failed</Typography>
                    <Box sx={{ mt: 22, textAlign: 'center' }}>
                        <Typography variant='h6'>Session ID: {session.id}</Typography>
                        <Typography variant='body1'>
                            Your payment was not successful. Please try again.
                        </Typography>
                    </Box> 
                </>
            )}
        </Container>
    )
}

export default ResultPage