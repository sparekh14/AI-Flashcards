'use client';
import { SignIn } from '@clerk/nextjs';
import { Box, Container, AppBar, Toolbar, Typography, Button, ThemeProvider } from "@mui/material";
import { Psychology } from '@mui/icons-material';
import theme from '../../theme';

export default function SignInPage() {
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
              <Button 
                variant="outlined" 
                href="/sign-up"
                sx={{ 
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="sm" sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 'calc(100vh - 80px)',
          py: 4 
        }}>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <SignIn 
              appearance={{
                elements: {
                  rootBox: 'cl-rootBox',
                  card: 'cl-card',
                  headerTitle: 'cl-headerTitle',
                  headerSubtitle: 'cl-headerSubtitle',
                  formButtonPrimary: 'cl-formButtonPrimary',
                  formFieldInput: 'cl-formFieldInput',
                  socialButtonsBlockButton: 'cl-socialButtonsBlockButton',
                  footerActionLink: 'cl-footerActionLink',
                  dividerLine: 'cl-dividerLine',
                  dividerText: 'cl-dividerText',
                }
              }}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}