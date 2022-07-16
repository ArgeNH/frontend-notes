import { Container, Grid } from '@nextui-org/react';

export const Layout = ({ children, gap, isJustify = true }) => {
    return (
        <Container responsive display='flex'>
            <Grid.Container
                gap={gap}
                justify={isJustify ? 'center': 'flex-end'}
            >
                {children}
            </Grid.Container>
        </Container>
    )
}
