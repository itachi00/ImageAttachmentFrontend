import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, CardMedia, CircularProgress, Container } from '@mui/material';

function App() {
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    // Send notification to WhatsApp number
    const sendNotification = async () => {
        setLoading(true);
        try {
            const response = await fetch('/send-notification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ whatsappNumber })
            });
            if (response.ok) {
                alert('Notification sent. Please upload an image within 15 minutes.');
            } else {
                alert('Failed to send notification.');
            }
        } catch (error) {
            console.error('Error sending notification:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch recent 5 images uploaded by the WhatsApp ID
    const fetchImages = async () => {
        try {
            const response = await fetch(`/whatsapp/images/${whatsappNumber}`);
            const data = await response.json();
            setImages(data.urls || []);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    return (
        <Container>
            <h1>WhatsApp Image Upload</h1>
            <TextField
                label="WhatsApp Number"
                variant="outlined"
                fullWidth
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={sendNotification}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Send Notification'}
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={fetchImages}
                style={{ marginLeft: '20px' }}
            >
                Fetch Uploaded Images
            </Button>

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                {images.map((url, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={url}
                                alt={`Image ${index + 1}`}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default App;
