import { tod } from '../lib/utils';

const PAGE_LABELS = {
  dashboard:      'Dashboard',
  'new-patient':  'New Patient',
  settings:       'Rules & Configuration',
  'patient-report': 'Patient Report',
  processing:     'Analyzing Report',
};

export default function Topbar({ page }) {
  return (
    <div className="topbar">
      <div className="tb-bc">
        MedAnalytica &rsaquo; <strong>{PAGE_LABELS[page] || page}</strong>
      </div>
      <div className="tb-r">
        <div className="tb-date">{tod()}</div>
        <div className="s-pill"><div className="s-dot" />System Online</div>
      </div>
    </div>
  );
}
