import { useEffect, useState } from "react";

const useNumber = () => {
  const [formatter, setFormatter] = useState<(value: number) => string>(
    () => () => ""
  );

  useEffect(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    setFormatter(() => formatter.format);
  }, []);

  return formatter;
};

export default useNumber;
