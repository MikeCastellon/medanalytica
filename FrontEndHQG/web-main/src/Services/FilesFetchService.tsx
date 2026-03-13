import axios, { CancelTokenSource } from "axios"
import { csv, DSVRowArray } from "d3"


export function getEcg(id: string, cancelTokenSource?: CancelTokenSource) {
  return async (): Promise<DSVRowArray<string>> => {
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/v1/files/ecg/${id}`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      cancelToken: cancelTokenSource?.token

    });

    return csv(res.data)
  }


}