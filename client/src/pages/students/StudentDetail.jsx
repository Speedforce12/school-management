import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItemText,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";

const AvatarStyled = styled(Avatar)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: "0",
  borderRadius: "50%",
  overflow: "hidden",
  lineHeight: "1",
  width: "64px",
  height: "64px",
  fontSize: "14px",
  userSelect: "none",
  fontWeight: "600",
  marginRight: "16px",
  position: "relative",
});

const ButtonStyled = styled(Button)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: "0px",
  cursor: " pointer",
  verticalAlign: "middle",
  appearance: "none",
  fontWeight: "600",
  fontSize: "0.875rem",
  userSelect: "none",
  lineHeight: "1.75",
  minWidth: "64px",
  borderRadius: "8px",
  border: "1px solid rgba(117, 130, 235, 0.5)",
  color: "rgb(117, 130, 235)",
  textTransform: "none",
  padding: "8px 20px",
  margin: " 8px",
});

const ChipStyled = styled(Chip)({
  maxWidth: "100%",
  fontSize: "0.8125rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "24px",
  borderRadius: "16px",
  marginLeft: "8px",
  verticalAlign: "middle",
  color: "green",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
});

const ListStyled = styled(List)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  width: "100%",
  textAlign: "left",
  backgroundClip: "padding-box",
  borderBottom: "1px solid rgba(45, 55, 72, 0.5)",
  padding: "12px 24px",
});

const StudentDetail = () => {
  const [detail, setDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setDetail(JSON.parse(sessionStorage.getItem("info")));
  }, []);

  return (
    <Container
      sx={{
        width: "100%",
        ml: "auto",
        boxSizing: "border-box",
        mr: "auto",
        display: "block",
        padding: "16px 16px",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexFlow: "row wrap",
          mt: "-24px",
          width: "calc(100% + 24px)",
        }}
      >
        <Grid
          item
          sx={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <AvatarStyled
            src={
              "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
            }
          />
          <div>
            <Typography
              variant='h4'
              sx={{
                fontWeight: "700",
                fontSize: "1.5rem",
                lineHeight: "1.375",
                display: "block",
              }}
            >
              {detail?.firstName} {detail?.lastName}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant='subtitle2'
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  lineHeight: "1.57",
                }}
              >
                address:
              </Typography>
              <ChipStyled label={detail.address} size='small' />
            </Box>
          </div>
        </Grid>
        <Grid
          item
          sx={{ flexDirection: "row", boxSizing: "border-box", margin: "-8px" }}
        >
          <ButtonStyled
            variant='outlined'
            endIcon={<ArrowBackOutlined />}
            onClick={() => navigate(-1)}
          >
            Back
          </ButtonStyled>
        </Grid>
      </Grid>
      <Box sx={{ mt: "24px" }}>
        <Grid
          container
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            mt: "-24px",
            ml: "-24px",
            boxSizing: "border-box",
          }}
        >
          <Grid
            item
            sx={{
              flexDirection: "row",
              flexBasis: "100%",
              flexGrow: "0",
              maxWidth: "100%",
            }}
          >
            <Paper
              elevation={2}
              sx={{ overflow: "hidden", mt: "24px", borderRadius: "16px" }}
            >
              <CardHeader
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "32px 24px",
                }}
                title='Basic Info'
              />
              <Divider />
              <List>
                <ListStyled>
                  <ListItemText
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 1 auto",
                      mt: "0px",
                      mb: "0px",
                    }}
                  >
                    <Typography
                      variant='subtitle2'
                      fontWeight='500'
                      lineHeight='1.57'
                      component='h6'
                      fontSize='0.875'
                    >
                      Gender
                    </Typography>
                    <Box>
                      <Typography variant='body2' component='p'>
                        {detail.gender}
                      </Typography>
                    </Box>
                  </ListItemText>
                </ListStyled>
                <ListStyled>
                  <ListItemText
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 1 auto",
                      mt: "0px",
                      mb: "0px",
                    }}
                  >
                    <Typography
                      variant='subtitle2'
                      fontWeight='500'
                      lineHeight='1.57'
                      component='h6'
                      fontSize='0.875'
                    >
                      Parents
                    </Typography>
                    <Box>
                      <Typography variant='body2' component='p'>
                        {detail.parents}
                      </Typography>
                    </Box>
                  </ListItemText>
                </ListStyled>
                <ListStyled>
                  <ListItemText
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 1 auto",
                      mt: "0px",
                      mb: "0px",
                    }}
                  >
                    <Typography
                      variant='subtitle2'
                      fontWeight='500'
                      lineHeight='1.57'
                      component='h6'
                      fontSize='0.875'
                    >
                      Contact
                    </Typography>
                    <Box>
                      <Typography variant='body2' component='p'>
                        {detail.contact}
                      </Typography>
                    </Box>
                  </ListItemText>
                </ListStyled>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentDetail;
