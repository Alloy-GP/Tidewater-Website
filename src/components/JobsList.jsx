export default function JobsList() {
  return (
    <section className="tw-section tw-section-linen tw-jobs" id="openings">
      <div className="tw-container">

        <div className="tw-section-head-left">
          <div className="tw-eyebrow">Open Roles</div>
          <h2 className="tw-section-title">See every position <em>we&rsquo;re hiring for.</em></h2>
          <p className="tw-section-lede">Our complete, up-to-date list of openings — with full descriptions, requirements, and an online application — lives on our applicant portal.</p>
        </div>

        <div className="tw-jobs-portal">
          <div className="tw-jobs-portal-main">
            <div className="tw-jobs-portal-eyebrow">Tidewater Applicant Portal</div>
            <h3 className="tw-jobs-portal-title">Browse and apply online.</h3>
            <p className="tw-jobs-portal-body">Search current openings across HOA management, rental management, maintenance, realty, and corporate roles. Apply directly through the portal — most candidates hear back from our hiring team within a few business days.</p>
            <div className="tw-jobs-portal-actions">
              <a
                className="tw-btn tw-btn-primary tw-btn-lg tw-jobs-portal-cta"
                href="https://phx.us-west.paycomonline.net/v4/ats/web.php/portal/08B21B7757F88146DC2C043544A8DCDD/career-page"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse open positions
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{width:'18px',height:'18px'}}>
                  <path d="M7 17 17 7"/><path d="M8 7h9v9"/>
                </svg>
              </a>
              <span className="tw-jobs-portal-host">Hosted on Paycom Career Portal &middot; opens in a new tab</span>
            </div>
          </div>

          <aside className="tw-jobs-portal-side" aria-label="Teams hiring">
            <div className="tw-jobs-portal-side-eyebrow">Teams currently hiring</div>
            <ul className="tw-jobs-portal-teams">
              <li><span className="tw-jobs-portal-dot" aria-hidden="true"></span>HOA &amp; Condo Association Management</li>
              <li><span className="tw-jobs-portal-dot" aria-hidden="true"></span>Rental Property Management</li>
              <li><span className="tw-jobs-portal-dot" aria-hidden="true"></span>Tidewater Property Maintenance</li>
              <li><span className="tw-jobs-portal-dot" aria-hidden="true"></span>Tidewater Realty Group</li>
              <li><span className="tw-jobs-portal-dot" aria-hidden="true"></span>Finance, Accounting &amp; Collections</li>
              <li><span className="tw-jobs-portal-dot" aria-hidden="true"></span>Client Services &amp; Administration</li>
            </ul>
          </aside>
        </div>

        <div className="tw-jobs-foot">
          <p>Don&rsquo;t see a fit on the portal? We&rsquo;re always interested in hearing from experienced HOA managers, accountants, and trades professionals across the Mid-Atlantic.</p>
          <a href="mailto:careers@tidewaterproperty.com" className="tw-btn tw-btn-outline">Send us your r&eacute;sum&eacute;</a>
        </div>

      </div>
    </section>
  );
}
