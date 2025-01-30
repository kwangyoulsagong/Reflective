import React, { useState } from "react";
import { Edit } from "lucide-react";
interface IntroductionCardProps {
  introduction: string;
  setIntroduction: (intro: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const IntroductionCard = ({
  introduction,
  setIntroduction,
  isEditing,
  setIsEditing,
}: IntroductionCardProps) => {
  const [draft, setDraft] = useState<string>(introduction);

  const handleSave = () => {
    setIntroduction(draft);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      {isEditing ? (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full h-32 p-2 border rounded-md"
          />
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
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
            onClick={() => setIsEditing(true)}
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
