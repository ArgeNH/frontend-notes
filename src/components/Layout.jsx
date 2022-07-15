import { Container, Grid } from '@nextui-org/react';

export const Layout = ({ children, gap }) => {
    return (
        <Container responsive display='flex'>
            <Grid.Container gap={gap} justify='center'>
                {children}
            </Grid.Container>
        </Container>
    )
}
