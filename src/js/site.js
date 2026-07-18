
(function(){
  const year=document.getElementById('year'); if(year) year.textContent=new Date().getFullYear();
  const btn=document.getElementById('check-trust-center');
  const status=document.getElementById('trust-center-status');
  if(btn && status){
    btn.addEventListener('click', async()=>{
      status.textContent='Checking public prototype status…';
      try{ const res=await fetch('/data/status.json',{cache:'no-store'}); const data=await res.json();
        status.textContent=`${data.trust_center_label}: ${data.message}`;
      }catch(e){ status.textContent='Trust Center is not yet connected. Current status: design/prototype phase.'; }
    });
  }
  const form=document.querySelector('[data-partner-form]');
  if(form){ form.addEventListener('submit',(e)=>{e.preventDefault();
    const type=form.querySelector('[name="inquiry_type"]')?.value || 'general inquiry';
    const org=form.querySelector('[name="organization"]')?.value || '';
    const msg=form.querySelector('[name="message"]')?.value || '';
    const body=encodeURIComponent(`BioQCore inquiry type: ${type}\nOrganization: ${org}\n\nMessage:\n${msg}\n\nNo medical records or patient-identifiable information were intended for submission.`);
    window.location.href=`mailto:contact@bioqcore.org?subject=BioQCore ${encodeURIComponent(type)}&body=${body}`;
  });}
})();
