(function () {
  const e = React.createElement;

  const sections = [
    { id: 'personal-information', label: 'Personal information' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'interests', label: 'Interests' }
  ];

  const personalInfoLeft = [
    { label: 'Email address', value: 'sanapathisla01@gmail.com' },
    { label: 'Phone number', value: '+91 7537599943' }
  ];

  const personalInfoRight = [
    { label: 'Address', value: 'Hyderabad, Telangana, India' },
    { label: 'Web', value: 'linkedin.com/in/naresh-sanapathi1997' }
  ];

  const summary =
    'Highly motivated Full Stack Developer with practical experience in enterprise applications, API development, and modern front-end engineering. Adept at converting complex business workflows into reliable digital solutions with clean architecture, performance focus, and strong team collaboration.';

  const experience = [
    {
      role: 'Full Stack Developer',
      period: '2022 - Present',
      org: 'Cepial Software Pvt. Ltd.',
      points: [
        'Developed and maintained workforce modules used by cross-functional teams.',
        'Built React-based interfaces with reusable UI patterns and API integrations.',
        'Optimized performance and release quality through testing and code improvements.'
      ]
    }
  ];

  const education = [
    {
      degree: 'BSC (Computer Science)',
      school: 'AMAL Degree College, Anakapalle',
      period: '2015 - 2018'
    }
  ];

  function InfoBlock(item) {
    return e(
      'div',
      { className: 'info-block', key: item.label },
      e('h4', null, item.label),
      e('p', null, item.value)
    );
  }

  function SectionCard(id, title, children) {
    return e(
      'section',
      { id: id, className: 'section-card' },
      e('h3', { className: 'content-title' }, title),
      children
    );
  }


  function scrollToSection(container, sectionId) {
    const target = document.getElementById(sectionId);
    if (!target || !container) {
      return;
    }

    const top = Math.max(target.offsetTop - container.offsetTop - 22, 0);
    container.scrollTo({ top, behavior: 'smooth' });
  }

  function App() {
    const [activeSection, setActiveSection] = React.useState('personal-information');
    const contentRef = React.useRef(null);

    const onMenuClick = (event, sectionId) => {
      event.preventDefault();
      setActiveSection(sectionId);
      scrollToSection(contentRef.current, sectionId);
    };

    React.useEffect(() => {
      const container = contentRef.current;
      if (!container) {
        return undefined;
      }

      const onScroll = () => {
        const marker = 220;
        let current = sections[0].id;
        let distance = Number.POSITIVE_INFINITY;

        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
          current = sections[sections.length - 1].id;
          setActiveSection((prev) => (prev === current ? prev : current));
          return;
        }

        sections.forEach((item) => {
          const el = document.getElementById(item.id);
          if (!el) {
            return;
          }

          const rect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const top = rect.top - containerRect.top;
          const bottom = rect.bottom - containerRect.top;

          if (bottom <= 0) {
            return;
          }

          const nextDistance = Math.abs(top - marker);
          if (nextDistance < distance) {
            distance = nextDistance;
            current = item.id;
          }
        });

        setActiveSection((prev) => (prev === current ? prev : current));
      };

      onScroll();
      container.addEventListener('scroll', onScroll, { passive: true });
      return () => container.removeEventListener('scroll', onScroll);
    }, []);

    return e(
      'main',
      { className: 'layout' },
      e(
        'aside',
        { className: 'sidebar' },
        e(
          'div',
          { className: 'profile-top' },
          e('img', {
            src: './profile-avatar.svg',
            alt: 'Naresh Sanapathi profile image',
            className: 'avatar'
          })
        ),
        e(
          'nav',
          { className: 'menu' },
          sections.map((item) =>
            e(
              'a',
              {
                href: '#' + item.id,
                className: activeSection === item.id ? 'menu-item active' : 'menu-item',
                key: item.id,
                onClick: (event) => onMenuClick(event, item.id)
              },
              item.label
            )
          )
        ),
        e(
          'div',
          { className: 'sidebar-actions' },
          e('button', { type: 'button', 'aria-label': 'email' }, '✉'),
          e('button', { type: 'button', 'aria-label': 'share' }, '⤴')
        )
      ),

      e(
        'section',
        { className: 'content', ref: contentRef },
        e(
          'header',
          { className: 'hero' },
          e('h1', null, 'Naresh Sanapathi')
        ),

        e(
          'section',
          { className: 'content-body' },
          SectionCard(
            'personal-information',
            'Personal information',
            e(
              'div',
              { className: 'info-grid' },
              e('div', null, personalInfoLeft.map(InfoBlock)),
              e('div', null, personalInfoRight.map(InfoBlock))
            )
          ),

          SectionCard(
            'profile-summary',
            'Profile Summary',
            e('p', { className: 'summary' }, summary)
          ),

          SectionCard(
            'experience',
            'Experience',
            experience.map((job) =>
              e(
                'article',
                { className: 'entry', key: job.role },
                e('div', { className: 'entry-head' }, e('h4', null, job.role), e('span', null, job.period)),
                e('p', { className: 'entry-sub' }, job.org),
                e('ul', null, job.points.map((p) => e('li', { key: p }, p)))
              )
            )
          ),

          SectionCard(
            'education',
            'Education',
            education.map((ed) =>
              e(
                'article',
                { className: 'entry', key: ed.degree },
                e('div', { className: 'entry-head' }, e('h4', null, ed.degree), e('span', null, ed.period)),
                e('p', { className: 'entry-sub' }, ed.school)
              )
            )
          ),

          e(
            'section',
            { className: 'content-card', id: 'achievements' },
            e('p', { className: 'kicker' }, 'Achievements'),
            e('p', { className: 'summary' }, 'Delivered high-impact business modules with strong quality and user adoption.')
          ),
          e(
            'section',
            { className: 'content-card', id: 'interests' },
            e('p', { className: 'kicker' }, 'Interests'),
            e('p', { className: 'summary' }, 'Web architecture, UI design systems, performance optimization, and product problem solving.')
          )
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(e(App));
})();
