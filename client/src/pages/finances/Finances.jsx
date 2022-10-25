import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import Income from "./income/Income";
import Expense from "./expense/Expense";

const Finances = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);

  const [selected, setSelected] = useState(0);

  const handleChange = (e, newValue) => {
    setSelected(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs
          value={selected}
          onChange={handleChange}
          aria-label='basic tabs example'
          centered
        >
          <Tab
            icon={<SavingsOutlinedIcon />}
            iconPosition='top'
            label='Income'
          />
          <Tab
            icon={<PaidOutlinedIcon />}
            iconPosition='top'
            label='Expenses'
          />
        </Tabs>
      </Box>
      {selected === 0 && <Income/>}
      {selected === 1 && <Expense/>}
    </Box>
  );
};

export default Finances;
