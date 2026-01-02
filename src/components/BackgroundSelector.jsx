export default function BackgroundSelector({ value, onChange }) {
  return (
    <select
      className="bg-selector"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="platform">Platform</option>
      <option value="Scifi">Cyber</option>
      <option value="space">Space Core</option>
      <option value="lab">AI Lab</option>
    </select>
  );
}
