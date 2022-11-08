import { Issue, Label } from '../interfaces';
import { githubAPI } from '../api/githubAPI';
import { QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { State } from '../interfaces/issue';
import { useState, useEffect } from 'react';

const getIssuesInfinite = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issue[]> => {
   const [, , args] = queryKey;
   const { state, labels } = args as Props;
   const params = new URLSearchParams();

   if (state) params.append('state', state);

   if (labels.length > 0) {
      const labelsString = labels.join(',');
      params.append('labels', labelsString);
   };

   params.append('page', `${pageParam}`);
   params.append('per_page', '5');

   const { data } = await githubAPI.get<Issue[]>('/issues', { params });
   return data;
}


interface Props {
   state: State | undefined;
   labels: string[];
   page?: number;
}

interface QueryProps {
   pageParam?: number;
   queryKey: (string | Props)[];
}

export const useIssuesInfinite = ({ state, labels }: Props) => {

   const [page, setPage] = useState(1);

   const issuesInfiniteQuery = useInfiniteQuery(
      ['issues', 'infinite', { state, labels, page: 1 }],
      (data) => getIssuesInfinite(data),
      {
         getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return;
            return pages.length + 1;
         }
      }
   )
   return {
      issuesInfiniteQuery
   }
} 