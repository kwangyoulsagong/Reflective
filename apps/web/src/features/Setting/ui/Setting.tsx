import { CircleImage } from "../../../shared/CircleImage/CircleImage";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useState, useEffect, ReactElement } from "react";
import useGetProfileInfo from "../libs/hooks/useGetProfileInfo";

const Setting = () => {
  const { data, isLoading, isError } = useGetProfileInfo();
  const [profileState, setProfileState] = useState({
    image_url: "",
    email: "",
    nickname: "",
    phone_number: "",
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setProfileState({
        image_url: data.image_url || "",
        email: data.email || "",
        nickname: data.nickname || "",
        phone_number: data.phone_number || "",
      });
    }
  }, [data, isLoading, isError]);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfileState({
        ...profileState,
        [field]: e.target.value,
      });
    };

  const handleProfileUpdate = () => {
    const body = {
      image_url: profileState.image_url,
      email: profileState.email,
      nickname: profileState.nickname,
      phone_number: profileState.phone_number,
    };
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>프로필 정보를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <article className="flex flex-col justify-center items-center w-[400px] h-[600px] border border-gray-300 gap-10">
      <CircleImage image={profileState.image_url} />
      <Input
        value={profileState.email}
        placeholder="이메일"
        onChange={handleChange("email")}
        className="mt-5"
      />
      <Input
        value={profileState.nickname}
        placeholder="닉네임"
        onChange={handleChange("nickname")}
      />
      <Input
        value={profileState.phone_number}
        placeholder="전화번호"
        onChange={handleChange("phone_number")}
      />
      <Button variant="auth" onClick={handleProfileUpdate}>
        프로필 수정
      </Button>
    </article>
  );
};

export default Setting;
