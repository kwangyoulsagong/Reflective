import { formatRelativeTime } from "../../utils/times";
import { Post } from "../types/type";

const List = ({
  searchResult,
  goToPostDetail,
}: {
  searchResult: Post[];
  goToPostDetail: (title: string, post_id: string, nickname: string) => void;
}) => {
  return (
    <ul className="divide-y divide-gray-200">
      {searchResult.map((item) => (
        <li
          key={item.post_id}
          className="p-4 hover:bg-gray-50 transition-colors duration-150"
          onClick={() =>
            goToPostDetail(item.title, item.post_id, item.nickname)
          }
        >
          <section className="flex items-start justify-between">
            <article className="space-y-1">
              <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                {item.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                  {item.category || "일반"}
                </span>
                {item.nickname && (
                  <span className="text-gray-500">작성자: {item.nickname}</span>
                )}
                <span className="text-gray-500">
                  {formatRelativeTime(item.created_date)}
                </span>
                {item.like_count !== undefined && (
                  <span className="flex items-center text-gray-500">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item.like_count}
                  </span>
                )}
              </div>
            </article>
          </section>
        </li>
      ))}
    </ul>
  );
};
export default List;
