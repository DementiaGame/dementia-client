import React from "react";

const AnswerResultModal = ({ visible, correct, remainingLives }) => {
  if (!visible) return null;

  return (
    <div className={`answer-result-modal ${correct ? "correct" : "incorrect"}`}>
      <div className="modal-content">
        {correct ? (
          <>
            <div className="modal-icon">✔️</div>
            <div className="modal-body">
              <h2>정답이에요! 😍</h2>
            </div>
          </>
        ) : (
          <>
            <div className="modal-icon">❌</div>
            <div className="modal-body">
              <h2>오답이에요.</h2>
              <p>
                {remainingLives > 1
                  ? `2번의 기회가 남았어요.`
                  : `1번의 기회가 남았어요.`}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnswerResultModal;
