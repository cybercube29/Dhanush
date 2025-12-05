import { Box, Breadcrumbs, Paper, Typography } from '@mui/material';
import { IconChevronRight, IconLayoutDashboard } from '@tabler/icons-react';
import Link from 'next/link';

export default function Breadcrumb({ parentComponent, parentRoute, childComponent }) {

    return (
        <Paper
            elevation={2}
            sx={{
                px: 2,
                py: 1,
                mb: 2,
                borderRadius: 0,
            }}
        >
            <Breadcrumbs
                separator={<IconChevronRight size="1rem" />}
                aria-label="breadcrumb"
            >

                <Link href="/" passHref>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'text.primary',
                            fontSize: '13px',
                            fontWeight: 500,
                            textDecoration: 'none',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        <IconLayoutDashboard size={15} />
                        Dashboard
                    </Box>
                </Link>

                {parentComponent && (
                    <Link href={parentRoute || '#'} passHref>
                        <Box
                            sx={{
                                color: 'text.primary',
                                fontSize: '13px',
                                fontWeight: 500,
                                textDecoration: 'none',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            {parentComponent}
                        </Box>
                    </Link>
                )}

                <Typography
                    color="primary"
                    sx={{
                        fontWeight: 600,
                        fontSize: '13px',
                        textTransform: 'capitalize',
                    }}
                >
                    {childComponent}
                </Typography>
            </Breadcrumbs>
        </Paper>
    );
}