import axios from "axios";


export function axiosFetcher<TData, TVariables, THeaders>(query: string, variables?: TVariables, headers?: THeaders) {
  return async (): Promise<TData> => {
    const dataObject = {
      url: import.meta.env.VITE_GRAPHQL_URL,
      method: "POST",
      headers: {
        ...headers
      },
      data: { query, variables },
    }
    const res = await axios(dataObject);
    // console.log(res.data);

    return res.data.data;
  }
}

// export function axiosFetcherByUrl<TData, THeaders>(url: string, method: string, data?: string, headers?: THeaders) {
//   return async (): Promise<TData> => {
//     const res = await axios({
//       url: url,
//       method: method,
//       headers: { ...headers },
//       data: data,
//     });

//     return res.data.data;
//   }
// }