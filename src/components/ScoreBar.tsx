
interface Props {
    progress: number;
}

export const ScoreBar = ({ progress }: Props) => {
  return (
    <div className="scorebar-container">
        <div className="scorebar-team-a" style={{ width: `${progress}%`}}></div>
    </div>
  )
}
