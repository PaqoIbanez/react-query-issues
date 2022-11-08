import { Issue } from '../interfaces';
import { githubAPI } from '../api/githubAPI';
import { useQuery } from '@tanstack/react-query';

export const getIssueInfo = async (id: number): Promise<Issue> => {
   const { data } = await githubAPI.get<Issue>(`/issues/${id}`);
   return data;
}

export const getIssueComments = async (id: number): Promise<Issue[]> => {
   const { data } = await githubAPI.get<Issue[]>(`/issues/${id}/comments`);
   return data;
}

export const useIssue = (id: number) => {

   const issueQuery = useQuery(
      ['issue', id],
      () => getIssueInfo(id)
   );

   const commentsQuery = useQuery(
      ['issue', id, 'comments'],
      () => getIssueComments(issueQuery.data!.number),
      {
         enabled: issueQuery.data !== undefined
      }
   );

   return {
      issueQuery,
      commentsQuery
   };
} 