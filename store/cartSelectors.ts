import { RootState } from "./store";

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((total: number, item: any) => {
    const basePrice = Number(item.price || item.base_price || 0);

    const optionsPrice =
      item.options?.reduce(
        (sum: number, opt: any) =>
          sum + Number(opt.price_modifier || 0),
        0,
      ) || 0;

    return total + (basePrice + optionsPrice) * (item.quantity || 1);
  }, 0);
