import { Container, Grid } from '@nextui-org/react';

export const Layout = ({ children, gap, isJustify = true }) => {
    return (
        <Container responsive display='flex' css={{ maxWidth: '1200px' }}>
            <Grid.Container
                gap={gap}
                justify={isJustify ? 'center' : 'flex-end'}
            >
                {children}
            </Grid.Container>
        </Container>
    )
}