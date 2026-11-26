"""Run after lovable auth-session --json --self; exercises real storage rules."""
import asyncio
from playwright.async_api import async_playwright
from lovable_playwright_defaults import signed_in_context


async def check_cover_access():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await signed_in_context(browser)
        page = await context.new_page()
        await page.goto("http://localhost:8080/projeler", wait_until="networkidle")
        await page.evaluate("""async () => {
          const {supabase: s} = await import('/src/integrations/supabase/client.ts');
          const {data: {user}} = await s.auth.getUser();
          if (!user) throw Error('A signed-in account is required');
          const blob = await (await fetch('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aY9sAAAAASUVORK5CYII=')).blob();
          const attached = user.id + '/' + crypto.randomUUID() + '.png';
          const orphan = user.id + '/' + crypto.randomUUID() + '.png';
          let projectId;
          try {
            for (const path of [attached, orphan]) {
              const {error} = await s.storage.from('project-covers').upload(path, blob, {contentType: 'image/png'});
              if (error) throw Error(error.message);
            }
            const {data: project, error} = await s.from('user_projects').insert({user_id: user.id, title: '__cover_access_regression__', description: 'Temporary cover access verification', cover: attached}).select('id').single();
            if (error) throw Error(error.message);
            projectId = project.id;
            for (const path of [attached, orphan]) {
              const {data, error} = await s.storage.from('project-covers').createSignedUrl(path, 60);
              if (error || !data?.signedUrl) throw Error('Owners must be able to sign their uploads');
              if (!(await fetch(data.signedUrl)).ok) throw Error('Owner image download failed');
            }
            const shared = await s.rpc('can_view_project_cover', {p_name: attached});
            if (shared.error || shared.data !== true) throw Error('Attached project covers must be shareable');
            const privateUpload = await s.rpc('can_view_project_cover', {p_name: orphan});
            if (privateUpload.error || privateUpload.data !== false) throw Error('Unattached uploads must not be shareable');
            const anonymous = await fetch(s.supabaseUrl + '/storage/v1/object/sign/project-covers/' + attached, {method: 'POST', headers: {apikey: s.supabaseKey, 'Content-Type': 'application/json'}, body: JSON.stringify({expiresIn: 60})});
            const anonymousResult = await anonymous.json();
            if (anonymous.ok && (anonymousResult.signedURL || anonymousResult.signedUrl)) throw Error('Anonymous callers must not sign project covers');
          } finally {
            if (projectId) {
              const {error} = await s.from('user_projects').delete().eq('id', projectId);
              if (error) throw Error('Test project cleanup failed');
            }
            const {error} = await s.storage.from('project-covers').remove([attached, orphan]);
            if (error) throw Error('Test image cleanup failed');
          }
        }""")
        await browser.close()
    print("PASS: owner downloads, attached-only sharing, anonymous denial, cleanup")


if __name__ == "__main__":
    asyncio.run(check_cover_access())