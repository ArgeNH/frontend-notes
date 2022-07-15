import { Grid, Text } from "@nextui-org/react";

export const Nothing = ({ text }) => {
    return (
        <Grid>
            <Text h1 size={30} css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
                weight="bold"
            >
                {text}
            </Text>
        </Grid>
    )
}
