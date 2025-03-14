import { FaGithub, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-6 mt-12 border-t border-gray-200">
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-3">
          <a
            href="mailto:sgky0511@naver.com"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Email"
          >
            <FaEnvelope className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/kwangyoulsagong"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
        <p className="text-sm text-gray-600">
          &copy; 2025 Kwangyoul Sagong. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          <a href="mailto:sgky0511@naver.com" className="hover:underline">
            sgky0511@naver.com
          </a>
        </p>
      </div>
    </footer>
  );
};
