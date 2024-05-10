import { useEffect, useState } from "react";

type FetchQueryProps<ResponseType> = {
  data: ResponseType | Error;
  loading: boolean;
};

export const useFetchQuery = <ResponseType, ArgsType>(
  fetchFunction: (args?: ArgsType) => Promise<ResponseType>,
  args?: ArgsType
): FetchQueryProps<ResponseType> => {
  const [data, setData] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchFunction(args)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        return error as Error;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading };
};

type FetchMutationProps<ResponseType, ArgsType extends any[]> = {
  mutate: (...args: ArgsType) => Promise<ResponseType | Error>;
  loading: boolean;
};

export const useMutation = <ResponseType, ArgsType extends any[]>(
  fetchFunction: (...args: ArgsType) => Promise<ResponseType>
): FetchMutationProps<ResponseType, ArgsType> => {
  const [loading, setLoading] = useState(false);
  const mutate = async (...args: ArgsType) => {
    setLoading(true);
    try {
      const response = await fetchFunction(...args);
      return response;
    } catch (error) {
      return error as Error;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
};
