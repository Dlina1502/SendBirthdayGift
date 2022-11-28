import { Box, Button, styled, Typography, Link } from "@mui/material";
import { Container } from "@mui/system";
import Image from 'next/image'
import DataGridDemo from './dataGridPage'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Home() {

    const CustomBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        },
    }));

    const Title = styled(Typography)(({ theme }) => ({
        fontSize: "64px",
        color: "#000d46",
        fontWeight: "bold",
        margin: theme.spacing(4, 0, 4, 0),
        [theme.breakpoints.down("sm")]: {
            fontSize: "40px",
        },
    }));

    const scrollToBottom = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
    };

    return (
        <Box sx={{ backgroundColor: "#c7d2fe", minHeight: "100vh" }}>
            <Container>
                <CustomBox>
                    <Box sx={{ flex: "1" }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "18px",
                                color: "#687690",
                                fontWeight: "500",
                                mt: 10,
                                mb: 4,
                            }}
                        >
                            Welcome to Searching Gift Ideas
                        </Typography>
                        <Title variant="h1">
                            Find the right gift for your work team.
                        </Title>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                        >
                            Know the preferences of all your employees to send the right gift on their birthday!
                        </Typography>
                        <Button
                            variant="contained"
                            style={{ background: "#000d46" }}
                            endIcon={<ExpandMoreIcon />}
                            onClick={scrollToBottom}
                        > Start </Button>
                    </Box>

                    <Box sx={{ flex: "1.25" }}>
                        <img href="https://imgbb.com/" src="https://i.ibb.co/84QMymk/giftbox.png" alt="giftBox" border="0" />
                    </Box>
                </CustomBox>
            </Container>
        </Box>
    );
}
