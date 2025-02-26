import React, { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import useUpdateStatusMessage from "../libs/hooks/useUpdateStatusMessage";

const IntroductionCard = ({ statusMessage }: { statusMessage: string }) => {
  const { mutate } = useUpdateStatusMessage();
  const defaultMessage = "안녕하세요! 여기에 자기소개를 작성해주세요.";

  const [introduction, setIntroduction] = useState<string>(
    statusMessage ?? defaultMessage
  );
  const [isEditingIntro, setIsEditingIntro] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(introduction);

  useEffect(() => {
    setIntroduction(statusMessage ?? defaultMessage);
    setDraft(statusMessage ?? defaultMessage);
  }, [statusMessage]);

  const handleSave = () => {
    setIntroduction(draft);
    mutate({ status_message: draft });
    setIsEditingIntro(false);
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm ">
      {isEditingIntro ? (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full h-32 p-2 border rounded-md"
          />
          <article className="mt-2 flex justify-end space-x-2">
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
          </article>
        </>
      ) : (
        <>
          <p className="text-gray-700  break-words">{introduction}</p>
          <button
            onClick={() => setIsEditingIntro(true)}
            className="mt-2 flex items-center text-blue-500"
          >
            <Edit size={16} className="mr-1" />
            편집
          </button>
        </>
      )}
    </section>
  );
};

export default IntroductionCard;
