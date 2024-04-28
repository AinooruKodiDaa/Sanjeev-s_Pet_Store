import { useMemo } from "react";
import { v4 as uuid } from "uuid";

export const useUniqueId = (prefix: string) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uniqueId = useMemo(() => `${prefix}-${uuid()}`, []);

  return uniqueId;
};

export default useUniqueId;