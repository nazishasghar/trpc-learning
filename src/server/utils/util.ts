import { ProcedureResolveOption } from '~/types/procedureReq'

/**
 * Provides utility functions for various operations.
 *
 * @module UtilityFunction
 */
export const useUtilityFunction = () => {
    /**
     * Generates a random token of the specified length.
     *
     * This function creates a random token using UUID and truncates it to the desired length.
     *
     * @param {number} [length=25] - The length of the token to generate. Defaults to 25.
     * @returns {string} The generated random token.
     */
    const generateRandomToken = (length = 25): string => {
        const size = Math.ceil(length / 2)
        return crypto.randomUUID().substring(0, size)
    }

    /**
     * Calculates pagination parameters based on the provided limit and page number.
     *
     * This function determines the number of items to take and the number of items to skip based on pagination input.
     *
     * @param {number | undefined} limit - The number of items to retrieve per page. If undefined, no limit is applied.
     * @param {number | undefined} page - The current page number. If undefined, no skip is applied.
     * @returns {{ take: number | undefined; skip: number | undefined }} An object containing the `take` and `skip` values for pagination.
     */
    const calcPager = (
        limit: number | undefined,
        page: number | undefined,
    ): { take: number | undefined; skip: number | undefined } => {
        const take = limit || undefined
        const skip = !limit || !page ? undefined : limit * (page - 1)

        return {
            take,
            skip,
        }
    }

    /**
     * Wraps a procedure function to handle asynchronous operations.
     *
     * This function returns a new function that executes the provided callback function with the given options.
     *
     * @template TInput - The type of the Zod object schema for input options.
     * @template TOutput - The return type of the callback function.
     * @param {function(ProcedureResolveOption<TInput>): Promise<TOutput>} cb - The callback function that performs the procedure.
     * @returns {function(ProcedureResolveOption<TInput>): Promise<TOutput>} A function that takes options and returns a promise that resolves to the result of the procedure function.
     */
    const procedureFunction =
        <TInput, TOutput = void>(
            cb: (opts: ProcedureResolveOption<TInput>) => Promise<TOutput>,
        ): ((opts: ProcedureResolveOption<TInput>) => Promise<TOutput>) =>
        async (opts: ProcedureResolveOption<TInput>) =>
            await cb(opts)

    /**
     * Asynchronously maps an array to a new array using the provided callback function.
     *
     * @template T - The type of items in the input array.
     * @template K - The type of items in the output array.
     * @param {T[]} array - The array to be mapped.
     * @param {(item: T) => Promise<T>} cb - The asynchronous callback function that maps an item of type T to a Promise of type K.
     *
     * @example
     * const nums = [1, 2, 3];
     * const asyncSquare = async (num) => num * num;
     * asyncMap(nums, asyncSquare).then((squaredNums) => {
     *   console.log(squaredNums); // [1, 4, 9]
     * });
     */
    const asyncMap = async <T>(array: T[], cb: (item: T) => Promise<T>): Promise<T[]> => {
        return Promise.all(array.map(async (item) => await cb(item)))
    }

    return { generateRandomToken, procedureFunction, calcPager, asyncMap }
}
