import { Issue, Label } from '../interfaces';
import { githubAPI } from '../api/githubAPI';
import { useQuery } from '@tanstack/react-query';
import { State } from '../interfaces/issue';
import { useState, useEffect } from 'react';

const getIssues = async (labels: string[] = [], page: number, state?: State): Promise<Issue[]> => {

   const params = new URLSearchParams();
   if (state) params.append('state', state);
   if (labels.length > 0) {
      const labelsString = labels.join(',');
      params.append('labels', labelsString);
   };
   params.append('page', `${page}`);
   params.append('per_page', '5');

   const { data } = await githubAPI.get<Issue[]>('/issues', { params });
   return data;
}

interface Props {
   state?: State,
   labels: string[]
}

export const useIssues = ({ state, labels }: Props) => {

   const [page, setPage] = useState<number>(1);

   useEffect(() => {
      setPage(1)
   }, [state, labels])


   const issuesQuery = useQuery(
      ['issues', { state, labels, page }],
      () => getIssues(labels, page, state)
   );

   return {

      //Properties
      issuesQuery,

      //Getter
      page,

      // Mehhods
      setPage
   };
} 