import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../api/githubAPI";
import { Label } from "../interfaces";
import { sleep } from '../helpers/sleep';

// const getLabels = async (): Promise<Label[]> => {
//    const res = await fetch('https://api.github.com/repos/facebook/react/labels');
//    const data = await res.json();
//    return data;
// }

const getLabels = async (): Promise<Label[]> => {

   await sleep(2);

   const { data } = await githubAPI.get<Label[]>('/labels?per_page=100', {
      headers: {
         Authorization: null
      }
   });
   return data;
}

export const useLabels = () => {

   const labelsQuery = useQuery(
      ['labels'],
      getLabels,
      {
         staleTime: 1000 * 60 * 60,
         // refetchOnWindowFocus: true,
         // placeholderData: [{}],
         placeholderData: [
            {
               id: 69105383,
               node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
               url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
               name: "Browser: IE",
               color: "c7def8",
               default: false,
            },
            {
               id: 717031390,
               node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
               url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
               name: "good first issue",
               color: "6ce26a",
               default: true
            }
         ]
      }
   );

   return labelsQuery;
}