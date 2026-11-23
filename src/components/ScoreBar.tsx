
interface Props {
    progress: number;
}

export const ScoreBar = ({ progress }: Props) => {
  return (
    <div className="scorebar-wrapper">
      <span className="scorebar-label scorebar-label-a">A</span>

      <div className="scorebar-container">
        <div className="scorebar-team-a" style={{ width: `${progress}%`}}></div>
        <div className="scorebar-center"></div>
      </div>

      <span className="scorebar-label scorebar-label-b">B</span>
    </div>
  )
}
