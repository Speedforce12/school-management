import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { deleteUser } from "../../action/user";
import { useValue } from "../../context/AuthContext";

const UserActions = ({params}) => {
  const {state:{ currentUser }, dispatch} = useValue()
  return (
    <Box>
      <Tooltip title='View user details'>
        <IconButton
          onClick={() => dispatch({ type: "UPDATE_USER", payload: params.row })}
        >
          <Preview color="info"/>
        </IconButton>
      </Tooltip>
      <Tooltip title='Edit this user'>
        <IconButton>
          <Edit color="success"/>
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete this user'>
        <IconButton
          onClick={() => deleteUser(params.row, currentUser, dispatch)}
        >
          <Delete color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UserActions;
