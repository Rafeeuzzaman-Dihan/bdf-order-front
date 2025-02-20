export const useOrderStore = defineStore("order", () => {
  const orders = ref<any>([]);
  const totalRecords = ref<number>(0);
  const selectedOrder = ref<any>(null);
  const selectedOrderIds = computed(() =>
    selectedOrder?.value?.map((order: any) => order?.id)
  );
  const status = ref<string>("all");
  const state = ref<any>(false);

  watch(status, async () => {
    await fetchOrders(15, 1);
  });

  const fetchOrders = async (
    perPage: number,
    page: number,
    filters: any = null
  ) => {
    state.value = true;
    let url = `order?limit=${perPage}&page=${page}`;
    if (filters?.value?.global?.value) {
      url += `&search=${filters.value.global.value}`;
    }
    if (status.value) {
      if (status.value === "all") {
        url += `&status=`;
      } else {
        url += `&status=${status.value}`;
      }
    }
    const { data, error } = (await getData(url)) as { data: any; error: any };
    if (error && error?.value) {
      console.log(error?.value);
    } else {
      state.value = false;
      orders.value = data?.value?.data || [];
      totalRecords.value = data?.value?.meta?.total;
    }
  };

  return {
    orders,
    state,
    totalRecords,
    selectedOrder,
    selectedOrderIds,
    status,
    fetchOrders,
  };
});
