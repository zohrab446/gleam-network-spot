import { createFileRoute } from '@tanstack/react-router';
import { InvitationsPage } from '@/components/career/InvitationsPage';
export const Route = createFileRoute('/_authenticated/davetler')({
  head: () => ({meta:[{title:'Şirket Davetleri — CodeQuest'},{name:'description',content:'Mülakat, uygulamalı sınav ve kariyer fırsatlarını yönet.'},{property:'og:title',content:'Şirket Davetleri — CodeQuest'},{property:'og:description',content:'Mülakat, uygulamalı sınav ve kariyer fırsatlarını yönet.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),
  component: InvitationsPage,
});
