import joi from "joi";

export const walletSchema = joi.object({
    linkCoinAmount: joi.number().required(),
    realAmount: joi.number().required(),
});
