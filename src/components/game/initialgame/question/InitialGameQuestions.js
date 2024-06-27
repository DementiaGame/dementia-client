import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./InitialGameQuestions.css";
import { FaTimes } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import QuestionBoard from "./QuestionBoard";
import Lives from "./Lives";
import RemainingChances from "./RemainingChances";
import AnswerInputs from "./AnswerInputs";
import InputModal from "./InputModal";
import AnswerResultModal from "./AnswerResultModal";

const InitialGameQuestions = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState(location.state?.questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [remainingLives, setRemainingLives] = useState(3);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [answerResultModal, setAnswerResultModal] = useState({
    visible: false,
    correct: null,
  });

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError("This browser does not support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    const cleanTranscript = (text) => text.replace(/\.$/, ""); // 마침표 제거
    if (finalTranscript !== "") {
      setAnswer(cleanTranscript(finalTranscript));
    } else if (interimTranscript !== "") {
      setAnswer(cleanTranscript(interimTranscript));
    }
  }, [interimTranscript, finalTranscript]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          handleSkipQuestion();
          return 30; // 다음 질문을 위한 타이머 재설정
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswer = (givenAnswer) => {
    if (givenAnswer === questions[currentQuestionIndex]?.answerWord) {
      setTotalCorrectAnswers((prev) => prev + 1);
      setAnswerResultModal({ visible: true, correct: true });
      setTimeout(() => {
        setAnswerResultModal({ visible: false, correct: null });
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setAnswer("");
        setTimer(30); // 다음 질문을 위한 타이머 재설정
        setRemainingLives(3); // 다음 질문을 위한 목숨 재설정
      }, 2000);
    } else {
      setRemainingLives((prevLives) => {
        if (prevLives - 1 <= 0) {
          setAnswerResultModal({ visible: true, correct: false });
          setTimeout(() => {
            setAnswerResultModal({ visible: false, correct: null });
            handleSkipQuestion();
          }, 2000);
          return 3; // 다음 질문을 위한 목숨 재설정
        } else {
          setAnswerResultModal({ visible: true, correct: false });
          setTimeout(() => {
            setAnswerResultModal({ visible: false, correct: null });
          }, 2000);
          return prevLives - 1;
        }
      });
    }
  };

  const handleSubmitAnswer = () => {
    handleAnswer(answer);
    closeModal(); // 답 제출 후 모달 닫기
  };

  const handleSkipQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAnswer("");
    setTimer(30); // 다음 질문을 위한 타이머 재설정
    setRemainingLives(3); // 다음 질문을 위한 목숨 재설정
  };

  const handleSpeakClick = () => {
    setModalType("speak");
    setShowModal(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: "ko-KR" });
  };

  const handleWriteClick = () => {
    setModalType("write");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    SpeechRecognition.stopListening();
  };

  const handleRetry = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: "ko-KR" });
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="initial-game-questions">
      <header className="header">
        <h1 className="title">143 초성게임({currentQuestion.topicName})</h1>
        <button className="close-button" onClick={() => navigate("/")}>
          <FaTimes />
        </button>
      </header>
      <main className="main">
        <QuestionBoard
          topicName={currentQuestion.topicName}
          consonantQuiz={currentQuestion?.consonantQuiz}
          timer={timer}
        />
        <Lives totalCorrectAnswers={totalCorrectAnswers} />
        <RemainingChances remainingLives={remainingLives} />
        <AnswerInputs
          onSpeakClick={handleSpeakClick}
          onWriteClick={handleWriteClick}
          onSkipQuestion={handleSkipQuestion}
        />
        {error && <p className="error">Error: {error}</p>}
      </main>
      {showModal && (
        <InputModal
          modalType={modalType}
          answer={answer}
          handleAnswerChange={handleAnswerChange}
          closeModal={closeModal}
          handleSubmitAnswer={handleSubmitAnswer}
          handleRetry={handleRetry} // retry 기능 추가
        />
      )}
      <AnswerResultModal
        visible={answerResultModal.visible}
        correct={answerResultModal.correct}
        remainingLives={remainingLives}
      />
    </div>
  );
};

export default InitialGameQuestions;
