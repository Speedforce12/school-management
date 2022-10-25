import { Lock } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Container } from "@mui/material";
import { useValue } from "../../context/AuthContext";

const AccessMessage = () => {
  const { dispatch } = useValue();
  return (
    <Container sx={{ py: 10 }}>
      <Alert severity='error' variant='outlined'>
        <AlertTitle>Forbidden Access</AlertTitle>
        Please Login in or Register to access this page
        <Button
          variant='outlined'
          sx={{ ml: 2 }}
          startIcon={<Lock />}
          onClick={() => dispatch({ type: "OPEN_LOGIN" })}
        >
          Login
        </Button>
      </Alert>
    </Container>
  );
};

export default AccessMessage;
