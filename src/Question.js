import { useState } from "react"
import questions from "./questions.json"
import ReactMarkdown from "react-markdown";
import logo from "./logo.png";

function Shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function Question() {
    const [score, updateScore] = useState(0)
    const [currIndex, updateIndex] = useState(-1)
    const [squestions] = useState(Shuffle(Object.keys(questions)))

    if (score > 5) {
        return (
            <div className="start">
                <img alt="logo" src={logo} /><br />
                <span>
                    Jullie hebben genoeg goede antwoorden lopen delen<br />
                    Om de locatie vrij te spelen<br />
                    Je vindt het cadeau....<br /><br />
                    Onder Indira's foto<br /><br />

                    Groetjes van de Sint en Cyberpiet
                </span>
            </div>
        )
    }

    if (currIndex < 0) {

        let images = []
        Object.values(questions).forEach(answers => answers.forEach(([a, img], i) => images.push(<img alt={a} src={img} />)));
        Shuffle(images);

        return (
            <div className="start">
                <img alt="logo" src={logo} /><br />
                <span>
                    Cyberpiet had weer eens wat tijd<br />
                    En bedacht zich een kleinigheid<br />
                    Maar om zijn cadeautje te verkrijgen<br />
                    Moet je eerst genoeg goede antwoorden aaneenrijgen...
                </span>
                <div onClick={() => updateIndex(0)}>
                    {images.slice(0, 9)}
                </div>
            </div>
        )
    }

    function Answer(a) {
        if (questions[question][0][0] === a) {
            updateScore(score + 1)
        } else {
            updateScore(score - 1)
        }
        updateIndex((currIndex + 1) % squestions.length);
    }

    let question = squestions[currIndex];
    let answers = Shuffle(questions[question].slice(0));

    let tracker = []
    let imgUrl = score > 0 ?
        "https://image.similarpng.com/very-thumbnail/2020/06/Gift-box-white-illustration-transparent-PNG.png" :
        "https://static.wikia.nocookie.net/minecraft/images/a/a3/Charcoalnewtexture.png"
        ;

    for (let i = 0; i < Math.abs(score); i++) {
        let stl = { bottom: i * 45 + "px" };
        tracker.push(<img alt={"score_" + i} src={imgUrl} style={stl} />)
    }

    return (
        <div className="main">
            <div className="quiz">
                <h1><ReactMarkdown>{question}</ReactMarkdown></h1>
            </div>

            <div className="answers">
                {
                    answers.map(([a, img], i) =>
                        <button onClick={() => Answer(a)} key={a}>
                            <img alt={a} src={img} />
                            <ReactMarkdown>{a}</ReactMarkdown>
                        </button>)
                }
            </div>
            
            <div className="tracker">
                <h3>Score<br />{score}</h3>
                <div className="tracker-imgs">
                    {tracker}
                </div>
            </div>
        </div>
    )
}

export default Question