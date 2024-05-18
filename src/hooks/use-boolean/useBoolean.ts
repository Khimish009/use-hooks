import React from "react";

export const useBoolean = (initialValue = false) => {
    const [value, setValue] = React.useState(initialValue);

    const toggle = () => setValue((prev) => !prev)

    return { value, toggle };
}

