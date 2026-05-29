
document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('[data-menu-toggle]');
  const nav=document.querySelector('[data-nav]');
  if(toggle&&nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'));}

  const themeToggleButton = document.querySelector('[data-theme-toggle]');
  const storedTheme = localStorage.getItem('theme-preference');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = isDark => {
    document.documentElement.classList.toggle('theme-dark', isDark);
    document.documentElement.classList.toggle('theme-light', !isDark);
  };

  const updateThemeToggleLabel = isDark => {
    if (!themeToggleButton) return;
    const icon = isDark ? '☀️' : '🌙';
    themeToggleButton.textContent = `${icon} ${isDark ? 'Mode clair' : 'Mode sombre'}`;
    themeToggleButton.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
  };

  const getCurrentThemeIsDark = () => document.documentElement.classList.contains('theme-dark');

  const applyThemeByPreference = preference => {
    if (preference === 'dark') {
      applyTheme(true);
    } else if (preference === 'light') {
      applyTheme(false);
    } else {
      applyTheme(darkQuery.matches);
    }
    updateThemeToggleLabel(getCurrentThemeIsDark());
  };

  applyThemeByPreference(storedTheme);

  const handleSystemThemeChange = event => {
    const preference = localStorage.getItem('theme-preference');
    if (preference !== 'dark' && preference !== 'light') {
      applyTheme(event.matches);
      updateThemeToggleLabel(event.matches);
    }
  };

  if (darkQuery.addEventListener) {
    darkQuery.addEventListener('change', handleSystemThemeChange);
  } else if (darkQuery.addListener) {
    darkQuery.addListener(handleSystemThemeChange);
  }

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const newIsDark = !getCurrentThemeIsDark();
      applyTheme(newIsDark);
      localStorage.setItem('theme-preference', newIsDark ? 'dark' : 'light');
      updateThemeToggleLabel(newIsDark);
    });
  }

  const filterButtons=document.querySelectorAll('[data-filter]');
  const evidenceBlocks=document.querySelectorAll('[data-project]');
  if(filterButtons.length&&evidenceBlocks.length){
    filterButtons.forEach(button=>button.addEventListener('click',()=>{
      const value=button.dataset.filter;
      filterButtons.forEach(btn=>btn.classList.toggle('active',btn===button));
      evidenceBlocks.forEach(block=>{
        const show=value==='all'||block.dataset.project===value;
        block.classList.toggle('hide',!show);
      });
    }));
  }

  const links=document.querySelectorAll('[data-section-link]');
  const sections=Array.from(document.querySelectorAll('[data-section]'));
  if(links.length&&sections.length){
    const onScroll=()=>{
      const pos=window.scrollY+140;
      let current=sections[0].id;
      sections.forEach(section=>{ if(section.offsetTop<=pos) current=section.id; });
      links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));
    };
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
  }
});
