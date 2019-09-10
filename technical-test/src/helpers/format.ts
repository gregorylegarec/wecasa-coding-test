/**
 * Return the value of the given amount of cents to actual human readable value.
 * Use the given format.
 */
export const formatPrice = (price: number, format: string = "%i,%d €") => {
  const integerValue = Math.floor(price / 100);
  const decimals = price - integerValue * 100;
  const paddedDecimals = `0${decimals}`.slice(-2);

  return format.replace("%i", `${integerValue}`).replace("%d", paddedDecimals);
};
