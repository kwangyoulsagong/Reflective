import React, { useState } from "react";
import { Edit } from "lucide-react";

const IntroductionCard = () => {
  const [introduction, setIntroduction] = useState<string>(
    "안녕하세요! 여기에 자기소개를 작성해주세요."
  );
  const [isEditingIntro, setIsEditingIntro] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(introduction);

  const handleSave = () => {
    setIntroduction(draft);
    setIsEditingIntro(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      {isEditingIntro ? (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full h-32 p-2 border rounded-md"
          />
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={() => setIsEditingIntro(false)}
              className="px-3 py-1 bg-gray-200 rounded-md"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded-md"
            >
              저장
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-700">{introduction}</p>
          <button
            onClick={() => setIsEditingIntro(true)}
            className="mt-2 flex items-center text-blue-500"
          >
            <Edit size={16} className="mr-1" />
            편집
          </button>
        </>
      )}
    </div>
  );
};

export default IntroductionCard;
