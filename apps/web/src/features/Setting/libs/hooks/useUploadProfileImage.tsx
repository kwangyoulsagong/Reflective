import { useMutation, useQueryClient } from "@tanstack/react-query";
import postUploadProfileImage from "../../api/postUploadProfileImage";
import { queryKeys } from "../../../../shared/constants/queryKeys";

const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUploadProfileImage,
    onMutate: async (formData) => {
      // 낙관적 업데이트 전에 현재 캐시 데이터 백업
      const previousProfileData = queryClient.getQueryData([
        queryKeys.MyProfileInfo,
      ]);

      // 대략적으로 FormData에서 이미지 파일 추출 (이미지 미리보기 URL 생성)
      const file = formData.get("profileImage") as File;
      const tempImageUrl = file ? URL.createObjectURL(file) : null;

      // 낙관적 업데이트 적용
      if (tempImageUrl) {
        queryClient.setQueryData(
          [queryKeys.MyProfileInfo],
          (oldData: { image_url: string }) => ({
            ...oldData,
            image_url: tempImageUrl,
          })
        );
      }

      // 롤백을 위해 이전 데이터 반환
      return { previousProfileData };
    },
    onError: (_, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousProfileData) {
        queryClient.setQueryData(
          ["MyProfileInfo"],
          context.previousProfileData
        );
      }
    },
    onSettled: () => {
      // 로컬 URL 객체 정리 및 쿼리 무효화로 최신 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: [queryKeys.MyProfileInfo] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.MyProfile] });
    },
  });
};
export default useUploadProfileImage;
