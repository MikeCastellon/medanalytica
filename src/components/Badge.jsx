export default function Badge({ status }) {
  const map = {
    normal:   ['b-g',  'Normal'],
    warning:  ['b-a',  'Review'],
    critical: ['b-r',  'Critical'],
    pending:  ['b-gr', 'Pending'],
    high:     ['b-r',  'High'],
    low:      ['b-a',  'Low'],
    complete: ['b-bl', 'Complete'],
  };
  const [cls, label] = map[status] || map.normal;
  return <span className={`badge ${cls}`}>{label}</span>;
}
