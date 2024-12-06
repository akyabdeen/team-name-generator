export default function Landing({ handleClick }) {
    return (
        <div className="page">
            <div className="landing-card">
                <div className="left-side">
                    <h1>Team Name Generator</h1>
                    <button onClick={handleClick} className="btn">Start Generating</button>
                </div>
                <div className="right-side">
                    <div className="description">
                        A simple tool to generate names for your team for any occasion!
                    </div>
                </div>
            </div>
        </div>
    );
}
