import { createContext, useContext, useState, ReactNode } from "react";

// 테마 관리를 위한 Context 타입 정의
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// 초기 값으로 사용될 객체 생성
const initialThemeContext: ThemeContextType = {
  theme: "bg-gray-100", // 초기 테마 설정
  setTheme: (theme: string) => {}, // 테마 변경 함수, 초기에는 빈 함수로 설정
};

// Context 생성
const ThemeContext = createContext<ThemeContextType>(initialThemeContext);

// Context를 사용하기 위한 커스텀 훅
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// ThemeProvider 컴포넌트 정의
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("bg-gray-100");

  // 테마 변경 함수
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
