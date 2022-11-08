import { useState, useCallback, useEffect, useRef } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesInfinite } from '../../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../../interfaces';



export const ListViewInfinite = () => {

   const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
   const [state, setState] = useState<State>();
   const loader = useRef(null);

   const { issuesInfiniteQuery } = useIssuesInfinite({ state, labels: selectedLabels });

   const onLabelChange = (labelName: string) => {
      selectedLabels.includes(labelName)
         ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
         : setSelectedLabels([...selectedLabels, labelName])
   }

   const handleObserver = useCallback((entries: any) => {
      const target = entries[0];
      if (target.isIntersecting) {
         issuesInfiniteQuery.fetchNextPage()
      }
   }, []);

   useEffect(() => {
      const option = {
         root: null,
         rootMargin: "20px",
         threshold: 0
      };
      const observer = new IntersectionObserver(handleObserver, option);
      if (loader.current) observer.observe(loader.current);
   }, [handleObserver]);

   return (
      <div className="row mt-5">
         <div className="col-8">
            {
               issuesInfiniteQuery.isLoading
                  ? <LoadingIcon />
                  : <IssueList
                     issues={issuesInfiniteQuery.data?.pages.flat() || []}
                     state={state}
                     onStateChange={(newState) => setState(newState)}
                  />
            }
            <div className='d-flex justify-content-center'>
               <button
                  className='btn btn-outline-primary mt-2'
                  disabled={!issuesInfiniteQuery.hasNextPage}
                  onClick={() => issuesInfiniteQuery.fetchNextPage()}
                  ref={loader}
               >
                  Load More...
               </button>
               {/* <div className='mt-5' ref={loader} /> */}
            </div>
         </div>
         <div className="col-4">
            <LabelPicker
               selectedLabels={selectedLabels}
               onChange={onLabelChange}
            />
         </div>
      </div>
   )
}
