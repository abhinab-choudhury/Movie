import * as React from 'react';
import Stack from '@mui/material/Stack';
import SignUpCard from './../components/SignUpCard';

export default function SignInPage() {
  return (
    <div>
      <Stack
        direction="column"
        component="main"
        sx={{
          justifyContent: 'center',
          height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
          marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
          minHeight: '100%',
          px: 2,
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: -1,
            inset: 0
          }
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 4, sm: 8 },
            p: { xs: 2, sm: 4 },
            mx: 'auto',
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          <SignUpCard sx={{ width: { xs: '100%', sm: '450px' } }} />
        </Stack>
      </Stack>
    </div>
  );
}
