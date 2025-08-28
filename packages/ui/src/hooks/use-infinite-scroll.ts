import React, { useCallback, useEffect } from "react";

/**
 * useInfiniteScroll 훅의 props입니다.
 */
interface UseInfiniteScrollProps {
  /**
   * 무한 스크롤의 현재 상태입니다.
   * "LoadingFirstPage": 첫 페이지를 로딩 중입니다.
   * "CanLoadMore": 추가로 로드할 수 있는 아이템이 있습니다.
   * "LoadingMore": 추가 아이템을 로딩 중입니다.
   * "Exhausted": 모든 아이템을 로드했습니다.
   */
  status: "LoadingFirstPage" | "CanLoadMore" | "LoadingMore" | "Exhausted";
  /**
   * 추가 아이템을 로드하는 함수입니다.
   */
  loadMore: (numItems: number) => void;
  /**
   * 한 번에 로드할 아이템의 개수입니다.
   */
  loadSize: number;
  /**
   * IntersectionObserver의 활성화 여부입니다.
   * @default true
   */
  observerEnabled?: boolean;
}

/**
 * 무한 스크롤을 구현하기 위한 커스텀 훅입니다.
 * IntersectionObserver API를 사용하여 사용자가 목록의 상단으로 스크롤했는지 감지합니다.
 *
 * @param props - 훅의 props입니다.
 * @returns 최상단 엘리먼트를 위한 ref, 수동으로 추가 아이템을 로드하는 함수, 그리고 다양한 로딩 상태 플래그를 포함하는 객체를 반환합니다.
 */
export const useInfiniteScroll = ({
  status,
  loadMore,
  loadSize,
  observerEnabled = true,
}: UseInfiniteScrollProps) => {
  // 추가 아이템 로드를 트리거하는 최상단 엘리먼트의 ref입니다.
  const topElementRef = React.useRef<HTMLDivElement>(null);

  /**
   * status가 "CanLoadMore"일 경우 추가 아이템을 로드하는 콜백 함수입니다.
   */
  const handleLoadMore = useCallback(() => {
    if (status === "CanLoadMore") {
      loadMore(loadSize);
    }
  }, [status, loadMore, loadSize]);

  useEffect(() => {
    const topElement = topElementRef.current;
    // 최상단 엘리먼트가 존재하고 observer가 활성화된 경우에만 observer를 설정합니다.
    if (!(topElement && observerEnabled)) {
      return;
    }

    // 최상단 엘리먼트를 감시하는 IntersectionObserver를 생성합니다.
    const observer = new IntersectionObserver(
      ([entries]) => {
        // 최상단 엘리먼트가 뷰포트와 교차하면 추가 아이템을 로드합니다.
        if (entries?.isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 } // 엘리먼트의 10%가 보일 때 트리거됩니다.
    );
    observer.observe(topElement);

    // 컴포넌트가 언마운트될 때 observer의 연결을 끊습니다.
    return () => {
      observer.disconnect();
    };
  }, [handleLoadMore, observerEnabled]);

  return {
    topElementRef,
    handleLoadMore,
    canLoadMore: status === "CanLoadMore",
    isLoadingMore: status === "LoadingMore",
    isExhausted: status === "Exhausted",
    isLoadingFirstPage: status === "LoadingFirstPage",
  };
};
