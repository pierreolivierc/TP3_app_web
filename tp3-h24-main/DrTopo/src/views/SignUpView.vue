<template>
  <div>
    <CssBaseline />
    <Box
      v-if="showForm"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form @submit.prevent="handleSubmit" ref="form" :class="{ 'needs-validation': submitted }" novalidate>
        <Grid container spacing="2">
          <Grid item xs="12" sm="6">
            <TextField
              v-model="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autofocus
            />
          </Grid>
          <Grid item xs="12" sm="6">
            <TextField
              v-model="lastName"
              required
              fullWidth
              id="lastName"
              label="Last Name"
            />
          </Grid>
          <Grid item xs="12">
            <TextField
              v-model="email"
              required
              fullWidth
              id="email"
              label="Email Address"
            />
          </Grid>
          <Grid item xs="12">
            <TextField
              v-model="password"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
            />
          </Grid>
          <Grid item xs="12">
            <FormControlLabel
              control={<Checkbox v-model="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx="mt: 3, mb: 2">
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
    <Copyright sx="mt: 5" />
  </div>
</template>

<script>
import { ref } from 'vue';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default {
  name: 'SignUpView',
  setup() {
    const showForm = ref(true);
    const submitted = ref(false);
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const allowExtraEmails = ref(false);

    const handleSubmit = () => {
      submitted.value = true;
      if (allowExtraEmails.value) {
        // Handle form submission
        console.log({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
          allowExtraEmails: allowExtraEmails.value,
        });
      } else {
        // Handle form submission without extra emails
        console.log({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
        });
      }
    };

    return {
      showForm,
      submitted,
      firstName,
      lastName,
      email,
      password,
      allowExtraEmails,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
