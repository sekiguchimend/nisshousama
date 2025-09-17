'use client';

// 店舗台帳データ管理用カスタムフック
// React Queryを使用してデータの状態管理を行う

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { storeLedgerService } from '@/services/store-ledger-service';
import { CourseFee, StoreLedgerTab } from '@/types';
import { calculateCourseFeeShares } from '@/lib/utils';

// クエリキー定数
const QUERY_KEYS = {
  STORE_BASIC_INFO: 'store-basic-info',
  BASIC_TAGS: 'basic-tags',
  GM_DIVISIONS: 'gm-divisions',
  COURSE_FEES: 'course-fees',
  STAFF_COMPOSITIONS: 'staff-compositions',
  SALES_DATA: 'sales-data',
} as const;

// 店舗一覧取得フック
export function useStoreBasicInfo() {
  return useQuery({
    queryKey: [QUERY_KEYS.STORE_BASIC_INFO],
    queryFn: () => storeLedgerService.getStoreBasicInfo(),
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
  });
}

// 選択された店舗の基本情報取得フック
export function useStoreBasicInfoByName(storeName: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.STORE_BASIC_INFO, 'by-name', storeName],
    queryFn: () => storeLedgerService.getStoreBasicInfoByName(storeName),
    enabled: !!storeName,
    staleTime: 5 * 60 * 1000,
  });
}

// 基本タグ取得フック
export function useBasicTags() {
  return useQuery({
    queryKey: [QUERY_KEYS.BASIC_TAGS],
    queryFn: () => storeLedgerService.getBasicTags(),
    staleTime: 5 * 60 * 1000,
  });
}

// 選択された店舗の基本タグ取得フック
export function useBasicTagByStoreName(storeName: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.BASIC_TAGS, 'by-store', storeName],
    queryFn: () => storeLedgerService.getBasicTagByStoreName(storeName),
    enabled: !!storeName,
    staleTime: 5 * 60 * 1000,
  });
}

// GM区分取得フック
export function useGMDivisionsByStoreId(storeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GM_DIVISIONS, 'by-store', storeId],
    queryFn: () => storeLedgerService.getGMDivisionsByStoreId(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
  });
}

// コース料金取得フック
export function useCourseFeesByStoreId(storeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.COURSE_FEES, 'by-store', storeId],
    queryFn: () => storeLedgerService.getCourseFeesByStoreId(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
  });
}

// 人事構成取得フック
export function useStaffCompositionsByStoreId(storeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.STAFF_COMPOSITIONS, 'by-store', storeId],
    queryFn: () => storeLedgerService.getStaffCompositionsByStoreId(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
  });
}

// 売上データ取得フック
export function useSalesDataByStoreId(storeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.SALES_DATA, 'by-store', storeId],
    queryFn: () => storeLedgerService.getSalesDataByStoreId(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
  });
}

// コース料金作成ミューテーション
export function useCreateCourseFee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseFee: Omit<CourseFee, 'id'>) => 
      storeLedgerService.createCourseFee(courseFee),
    onSuccess: () => {
      // コース料金のキャッシュを無効化
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COURSE_FEES]
      });
    },
  });
}

// コース料金更新ミューテーション
export function useUpdateCourseFee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CourseFee> }) =>
      storeLedgerService.updateCourseFee(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COURSE_FEES]
      });
    },
  });
}

// コース料金削除ミューテーション
export function useDeleteCourseFee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => storeLedgerService.deleteCourseFee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.COURSE_FEES]
      });
    },
  });
}

// 店舗台帳メイン管理フック
export function useStoreLedger(initialStore?: string) {
  const [selectedStore, setSelectedStore] = useState<string>(initialStore || '');
  const [activeTab, setActiveTab] = useState<StoreLedgerTab>('basic');
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editForms, setEditForms] = useState<Record<string, CourseFee>>({});

  // 選択された店舗の情報取得
  const { data: selectedStoreInfo } = useStoreBasicInfoByName(selectedStore);
  const selectedStoreId = selectedStoreInfo?.id || '';

  // 各種データ取得
  const basicTagQuery = useBasicTagByStoreName(selectedStore);
  const gmDivisionsQuery = useGMDivisionsByStoreId(selectedStoreId);
  const courseFeesQuery = useCourseFeesByStoreId(selectedStoreId);
  const staffCompositionsQuery = useStaffCompositionsByStoreId(selectedStoreId);
  const salesDataQuery = useSalesDataByStoreId(selectedStoreId);

  // ミューテーション
  const createCourseFee = useCreateCourseFee();
  const updateCourseFee = useUpdateCourseFee();
  const deleteCourseFee = useDeleteCourseFee();

  // コース料金操作ハンドラー
  const handleDeleteCourseFee = async (id: string) => {
    try {
      await deleteCourseFee.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete course fee:', error);
    }
  };

  const handleAddCourseFee = async () => {
    if (!selectedStoreId) return;

    const newCourseFee: Omit<CourseFee, 'id'> = {
      storeId: selectedStoreId,
      courseName: '新規コース',
      gmDivision: 'ガールズ',
      courseType: 'Standard',
      type: 'A',
      duration: 60,
      price: 15000,
      hostessShare: {
        free: { percentage: 40, amount: 6000 },
        panel: { percentage: 45, amount: 6750 },
        nomination: { percentage: 50, amount: 7500 }
      },
      storeShare: {
        free: { amount: 9000 },
        panel: { amount: 8250 },
        nomination: { amount: 7500 }
      },
      isActive: true
    };

    try {
      await createCourseFee.mutateAsync(newCourseFee);
    } catch (error) {
      console.error('Failed to add course fee:', error);
    }
  };

  const handleEditCourseFee = (id: string) => {
    const courseToEdit = courseFeesQuery.data?.find(course => course.id === id);
    if (courseToEdit) {
      setEditForms(prev => ({ ...prev, [id]: courseToEdit }));
      setEditingCourseId(id);
    }
  };

  const handleSaveCourseFee = async (updatedCourse: CourseFee) => {
    // 取分を再計算
    const calculatedShares = calculateCourseFeeShares(
      updatedCourse.price,
      updatedCourse.hostessShare.free.percentage,
      updatedCourse.hostessShare.panel.percentage,
      updatedCourse.hostessShare.nomination.percentage
    );

    const courseToSave = {
      ...updatedCourse,
      hostessShare: calculatedShares.hostessShare,
      storeShare: calculatedShares.storeShare
    };

    try {
      await updateCourseFee.mutateAsync({
        id: updatedCourse.id,
        updates: courseToSave
      });
      
      setEditForms(prev => {
        const newForms = { ...prev };
        delete newForms[updatedCourse.id];
        return newForms;
      });
      setEditingCourseId(null);
    } catch (error) {
      console.error('Failed to save course fee:', error);
    }
  };

  const handleCancelEdit = () => {
    if (editingCourseId) {
      setEditForms(prev => {
        const newForms = { ...prev };
        delete newForms[editingCourseId];
        return newForms;
      });
    }
    setEditingCourseId(null);
  };

  return {
    // 状態
    selectedStore,
    setSelectedStore,
    activeTab,
    setActiveTab,
    selectedStoreInfo,
    selectedStoreId,
    editingCourseId,
    editForms,
    setEditForms,

    // データ
    basicTag: basicTagQuery.data,
    gmDivisions: gmDivisionsQuery.data || [],
    courseFees: courseFeesQuery.data || [],
    staffCompositions: staffCompositionsQuery.data || [],
    salesData: salesDataQuery.data || [],

    // ローディング状態
    isLoading: {
      basicTag: basicTagQuery.isLoading,
      gmDivisions: gmDivisionsQuery.isLoading,
      courseFees: courseFeesQuery.isLoading,
      staffCompositions: staffCompositionsQuery.isLoading,
      salesData: salesDataQuery.isLoading,
    },

    // エラー状態
    errors: {
      basicTag: basicTagQuery.error,
      gmDivisions: gmDivisionsQuery.error,
      courseFees: courseFeesQuery.error,
      staffCompositions: staffCompositionsQuery.error,
      salesData: salesDataQuery.error,
    },

    // ミューテーション状態
    isMutating: {
      creating: createCourseFee.isPending,
      updating: updateCourseFee.isPending,
      deleting: deleteCourseFee.isPending,
    },

    // 操作ハンドラー
    handleDeleteCourseFee,
    handleAddCourseFee,
    handleEditCourseFee,
    handleSaveCourseFee,
    handleCancelEdit,
  };
}
