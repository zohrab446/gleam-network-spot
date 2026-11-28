import { type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Building2, Briefcase, Mail, ShieldCheck, Users, ClipboardList, Compass } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { canAccessCompany } from '@/lib/career';
export function useCompanyAccess() {
  const { user } = useAuth();
  return useQuery({queryKey:['career-roles',user?.id], enabled: Boolean(user), queryFn: async () => {
    if (!user) return false;
    const { data,error } = await supabase.from('user_roles').select('role').eq('user_id',user.id);
    if (error) throw new Error('Yetkiler yüklenemedi.');
    return canAccessCompany((data ?? []).map((r) => r.role));
  }});
}
export function CareerLayout({children, company = false}: {children:ReactNode;company?:boolean}) {
  const access = useCompanyAccess();
  return <AppShell dashboard><div className="min-w-0 space-y-6">
    <nav aria-label="Kariyer menüsü" className="flex flex-wrap gap-2 border-b border-border pb-4">
      {([{to:'/kariyer',label:'Kariyerim',icon:Compass},{to:'/is-ilanlari',label:'İş İlanları',icon:Briefcase},{to:'/davetler',label:'Davetler',icon:Mail}] as const).map(({to,label,icon:Icon}) => <Button asChild key={to} variant="ghost" size="sm"><Link to={to} activeProps={{className:'bg-primary-soft text-primary'}}><Icon/>{label}</Link></Button>)}
      {access.data && ([{to:'/sirket',label:'Şirket Paneli',icon:Building2},{to:'/adaylar',label:'Aday Eşleştirme',icon:Users},{to:'/sirket-sinavlar',label:'Sınav Yönetimi',icon:ClipboardList}] as const).map(({to,label,icon:Icon}) => <Button asChild key={to} variant="ghost" size="sm"><Link to={to} activeOptions={{exact:true}} activeProps={{className:'bg-primary-soft text-primary'}}><Icon/>{label}</Link></Button>)}
    </nav>
    {company && access.isPending ? <p role="status">Yetkiler kontrol ediliyor…</p> : company && !access.data ? <section className="py-16 text-center"><ShieldCheck className="mx-auto size-10 text-muted-foreground"/><h1 className="mt-4 text-2xl">Şirket erişimi gerekli</h1><p className="mt-2 text-muted-foreground">{access.isError ? 'Yetkiler yüklenemedi. Lütfen tekrar dene.' : 'Bu alan yalnızca şirket ve admin hesaplarına açıktır.'}</p>{access.isError && <Button className="mt-4" onClick={() => void access.refetch()}>Tekrar dene</Button>}</section> : children}
  </div></AppShell>;
}
export function DemoNotice() { return <p role="note" className="border-l-4 border-warning bg-secondary px-4 py-3 text-sm leading-6"><strong>Örnek çalışma alanı.</strong> İlanlar, adaylar, davetler ve değerlendirmeler gerçek değildir. İşlemler yalnızca bu oturumda tutulur; başvuru, davet veya kişisel bilgi gönderilmez.</p>; }
export function Section({title,children,action}: {title:string;children:ReactNode;action?:ReactNode}) { return <section className="min-w-0 border-t border-border pt-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg">{title}</h2>{action}</div>{children}</section>; }
export function Stat({value,label}: {value:string|number;label:string}) {return <div className="min-w-0 rounded-lg border border-border bg-card p-4"><p className="text-2xl font-extrabold text-primary">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>;}
