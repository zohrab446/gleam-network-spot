import { createFileRoute } from '@tanstack/react-router';
import { JobDetail } from '@/components/career/JobPages';
import { JOBS } from '@/lib/career';
export const Route = createFileRoute('/_authenticated/is-ilanlari_/$jobId')({
  head: ({params}) => { const job=JOBS.find((j)=>j.id===params.jobId);const title=(job?.title ?? 'İlan bulunamadı')+' — CodeQuest';const description=job?.description ?? 'CodeQuest iş ilanı ayrıntıları.';return {meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]};},
  component: JobDetailPage,
});
function JobDetailPage() {const {jobId}=Route.useParams();return <JobDetail jobId={jobId}/>;}
