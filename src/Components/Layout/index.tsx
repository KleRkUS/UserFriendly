import { 
    Grid,
    GridProps,
    styled,
    Theme,
    Typography,
    TypographyProps
} from '@mui/material';
import React from 'react';

interface IProps {
    children: JSX.Element;
}

const SGrid = styled(Grid)<GridProps>(({ theme }: { theme: Theme }) => ({
    height: theme.spacing(11),
    paddingLeft: theme.spacing(9),
    backgroundColor: theme.palette.grey[600]
}))

const STypography = styled(Typography)<TypographyProps>(({ theme }: { theme: Theme }) => ({
    fontFamily: 'Mak'
}));

export const Layout = ({ children }: IProps): JSX.Element => {
    return(
        <>
            <SGrid
                container
                justifyContent="flex-start"
                alignItems="center"
            >
                <STypography variant="h1" color="white">
                    ECO+
                </STypography>
            </SGrid>
            {children}
        </>
    )
}
