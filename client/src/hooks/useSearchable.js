import { useMemo } from "react";

const useSearchable = (campaigns, searchText, searchProps) => {
    return useMemo(() => {
        const regex = new RegExp(searchText, "i");
        if (campaigns.length) {

            return campaigns.filter((item) =>
            searchProps(item).some((sp) => regex.test(sp))
            );
        }
      }, [campaigns, searchText, searchProps]);
    };

export default useSearchable;