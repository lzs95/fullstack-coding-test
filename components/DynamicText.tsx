import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Text } from "@chakra-ui/react";

const DynamicText = forwardRef((props, ref) => {
  const [value, setValue] = useState("Random Text");
  const changeValue = (newValue) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => ({
    changeValue,
  }));

  return (
    <Text fontSize="50px" color="black" mb={3} maxWidth="100%">
      <p>{value}</p>
    </Text>
  );
});

export default DynamicText;
