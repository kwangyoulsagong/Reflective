"use client"
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { ActionType, initialState, postReducer } from "../_reducers/postReducer";
import usePostMutation from "../_hooks/api/usePostMutation";

export default function AddPost() {
    const [state,dispatch]=useReducer(postReducer,initialState)
    const router=useRouter()

    //제목 상태 업데이트
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionType.SET_TITLE, payload: e.target.value });
    };

    //콘텐츠 상태 업데이트
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({ type: ActionType.SET_CONTENT, payload: e.target.value });
    };

    //제출
    const handleSubmit = () => {

        const postBody = {
            postId: state.postId,
            nickname:localStorage.getItem("nickname"),
            title: state.title,
            content: state.content
        };
        // 제출 로직 구현
        mutation.mutate(postBody)
    };
    // usePostMutation 훅을 사용하여 mutation 함수 정의
    const mutation=usePostMutation()
    // 모달 닫기
    const handlePrevious=()=>{
        router.back()
    }
    return (
        <div className="fixed flex justify-center items-center inset-0 bg-gray-400 bg-opacity-75">
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">게시물 작성</h2>
                <label className="mb-2 text-sm font-medium text-gray-700">
                    제목
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        placeholder="게시물 제목 자성..."
                        value={state.title}
                        onChange={handleTitleChange}
                    />
                </label>
                <label className="mb-2 text-sm font-medium text-gray-700">
                    콘텐츠
                    <textarea
                        className="w-full p-2 mt-1 border border-gray-300 rounded h-32"
                        placeholder="게시물 콘텐츠 작성..."
                        value={state.content}
                        onChange={handleContentChange}
                    ></textarea>
                </label>
                <button className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600" onClick={handleSubmit}>
                    작성
                </button>
                <button className="bg-red-500 text-white p-2 rounded mt-2 hover:bg-red-600" onClick={handlePrevious}>
                    취소
                </button>
            </div>
        </div>
    );
}
