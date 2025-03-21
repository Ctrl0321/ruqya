'use client';
import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#2D3748',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 60,
    height: 3,
    backgroundColor: '#4CAF50',
  },
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 800, 
            color: '#1E293B',
            mb: 2 
          }}
        >
          About Us
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 500, 
            color: '#4CAF50',
            mb: 3 
          }}
        >
          Welcome to Prophetic Ruqyah
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: '1.1rem', 
            maxWidth: '800px', 
            mx: 'auto',
            color: '#4A5568'
          }}
        >
          At Prophetic Ruqyah, we are dedicated to restoring spiritual balance and nurturing the heart, mind, and soul through authentic Islamic healing practices. Rooted in the timeless wisdom of the Prophetic traditions, our mission is to bring light, healing, and tranquility to those seeking solace in today's challenging world.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Our Story Section */}
        <Grid item xs={12} md={6}>
          <ContentPaper>
            <SectionTitle variant="h4">Our Story</SectionTitle>
            <Typography paragraph sx={{ color: '#4A5568' }}>
              Prophetic Ruqyah was founded with a deep commitment to the rich heritage of Islamic spiritual healing. Inspired by the teachings of the Prophet Muhammad (peace be upon him), our journey began with the aim of reviving the ancient art of Ruqyah—a practice that combines Quranic recitations, supplications, and spiritual guidance.
            </Typography>
            <Typography paragraph sx={{ color: '#4A5568' }}>
              We believe that true healing comes from a strong connection with faith, sincere prayer, and the compassionate support of a community.
            </Typography>
          </ContentPaper>
        </Grid>

        {/* Our Mission Section */}
        <Grid item xs={12} md={6}>
          <ContentPaper>
            <SectionTitle variant="h4">Our Mission</SectionTitle>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#2D3748', fontWeight: 600 }}>
                  Authentic Healing
                </Typography>
                <Typography sx={{ color: '#4A5568' }}>
                  We provide genuine Ruqyah sessions that adhere to the principles and practices taught by the Prophet (peace be upon him).
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h6" sx={{ color: '#2D3748', fontWeight: 600 }}>
                  Spiritual Empowerment
                </Typography>
                <Typography sx={{ color: '#4A5568' }}>
                  Our goal is to empower individuals with the knowledge and spiritual tools needed to overcome challenges, heal emotional wounds, and maintain inner peace.
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h6" sx={{ color: '#2D3748', fontWeight: 600 }}>
                  Compassionate Guidance
                </Typography>
                <Typography sx={{ color: '#4A5568' }}>
                  We offer a supportive environment where every person is respected and cared for, ensuring that your spiritual journey is nurtured with kindness and expertise.
                </Typography>
              </Box>
            </Box>
          </ContentPaper>
        </Grid>

        {/* What We Offer Section */}
        <Grid item xs={12}>
          <ContentPaper>
            <SectionTitle variant="h4">What We Offer</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  backgroundColor: '#F7FAFC',
                  borderRadius: 2,
                  height: '100%'
                }}>
                  <Box sx={{ fontSize: '3rem', color: '#4CAF50', mb: 2 }}>🔊</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2D3748' }}>
                    Personalized Ruqyah Sessions
                  </Typography>
                  <Typography sx={{ color: '#4A5568' }}>
                    Whether you are facing spiritual distress or seeking protection, our experienced spiritual healers tailor sessions to meet your unique needs.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  backgroundColor: '#F7FAFC',
                  borderRadius: 2,
                  height: '100%'
                }}>
                  <Box sx={{ fontSize: '3rem', color: '#4CAF50', mb: 2 }}>📚</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2D3748' }}>
                    Educational Resources
                  </Typography>
                  <Typography sx={{ color: '#4A5568' }}>
                    Our website is a repository of articles, guides, and multimedia content that explore the science and spirituality of Ruqyah, helping you understand its profound benefits.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  backgroundColor: '#F7FAFC',
                  borderRadius: 2,
                  height: '100%'
                }}>
                  <Box sx={{ fontSize: '3rem', color: '#4CAF50', mb: 2 }}>👥</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2D3748' }}>
                    Community Support
                  </Typography>
                  <Typography sx={{ color: '#4A5568' }}>
                    Connect with like-minded individuals and experts who share your path towards spiritual growth and healing.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </ContentPaper>
        </Grid>

        {/* Our Approach Section */}
        <Grid item xs={12} md={6}>
          <ContentPaper>
            <SectionTitle variant="h4">Our Approach</SectionTitle>
            <Typography paragraph sx={{ color: '#4A5568' }}>
              We combine the art of Prophetic Ruqyah with modern insights to create a healing experience that is both authentic and relevant. Our approach is always grounded in Islamic teachings and aimed at fostering a deep connection with the Divine.
            </Typography>
            <Typography paragraph sx={{ color: '#4A5568' }}>
              We ensure that all practices are conducted in a respectful, confidential, and supportive environment.
            </Typography>
          </ContentPaper>
        </Grid>

        {/* Our Commitment Section */}
        <Grid item xs={12} md={6}>
          <ContentPaper>
            <SectionTitle variant="h4">Our Commitment</SectionTitle>
            <Typography paragraph sx={{ color: '#4A5568' }}>
              At Prophetic Ruqyah, your well-being is our priority. We are committed to:
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography paragraph sx={{ display: 'flex', alignItems: 'center', color: '#4A5568' }}>
                <Box component="span" sx={{ color: '#4CAF50', mr: 1, fontWeight: 'bold' }}>•</Box> 
                Upholding the highest ethical standards in all our practices.
              </Typography>
              <Typography paragraph sx={{ display: 'flex', alignItems: 'center', color: '#4A5568' }}>
                <Box component="span" sx={{ color: '#4CAF50', mr: 1, fontWeight: 'bold' }}>•</Box> 
                Providing continuous support and guidance throughout your spiritual journey.
              </Typography>
              <Typography paragraph sx={{ display: 'flex', alignItems: 'center', color: '#4A5568' }}>
                <Box component="span" sx={{ color: '#4CAF50', mr: 1, fontWeight: 'bold' }}>•</Box> 
                Being a reliable source of wisdom, healing, and hope in an ever-changing world.
              </Typography>
            </Box>
          </ContentPaper>
        </Grid>
      </Grid>

      {/* Final CTA */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: 4, 
        p: 5, 
        backgroundColor: '#EDF2F7',
        borderRadius: 3
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#2D3748' }}>
          Join us on a journey towards spiritual renewal, inner peace, and a deeper connection with your faith.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
